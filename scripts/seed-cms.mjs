/**
 * Seed du contenu éditorial dans Payload.
 *
 * Source : `lib/pricing-data.ts` et `lib/roadmap-data.ts`, lus directement par
 * Node 24 (type stripping natif — pas besoin de tsx ni d'esbuild).
 *
 * Pourquoi un script plutôt que des curl jetables : le seed doit être rejouable
 * après un reset de la base, et le mapping des champs doit être relu par
 * quelqu'un. Il est idempotent : relancer met à jour, ne duplique pas.
 *
 * Usage :
 *   SEED_EMAIL=... SEED_PASSWORD=... node scripts/seed-cms.mjs
 *   SEED_URL=http://localhost:3000 (défaut)
 */

const BASE = process.env.SEED_URL || 'http://localhost:3000';
const EMAIL = process.env.SEED_EMAIL;
const PASSWORD = process.env.SEED_PASSWORD;

const log = (...a) => console.log('[seed]', ...a);

if (!EMAIL || !PASSWORD) {
  console.error('[seed] SEED_EMAIL et SEED_PASSWORD sont requis');
  process.exit(2);
}

const api = async (path, { method = 'GET', body, token } = {}) => {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'content-type': 'application/json',
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  return { status: res.status, json };
};

// --- Authentification -------------------------------------------------------
const auth = await api('/api/users/login', {
  method: 'POST',
  body: { email: EMAIL, password: PASSWORD },
});
if (!auth.json.token) {
  console.error('[seed] connexion refusée :', auth.json.errors?.[0]?.message ?? auth.status);
  process.exit(1);
}
const token = auth.json.token;
log('connecté en tant que', auth.json.user?.email);

// --- Données sources --------------------------------------------------------
const { pricingPlans } = await import('../lib/pricing-data.ts');
const { roadmapData } = await import('../lib/roadmap-data.ts');
log(`sources : ${pricingPlans.length} plans, ${roadmapData.length} milestones`);

// Une icône est un composant React dans `lib/pricing-data.ts` ; le CMS ne stocke
// qu'un nom, résolu côté front par une table de correspondance.
const iconName = (icon) => {
  if (typeof icon === 'string') return icon;
  return icon?.displayName || icon?.name || null;
};

// --- Upsert génériques ------------------------------------------------------
const upsertByField = async (collection, whereField, value, data) => {
  const q = `/api/${collection}?where[${whereField}][equals]=${encodeURIComponent(value)}&limit=1`;
  const found = await api(q, { token });
  const existing = found.json.docs?.[0];
  if (existing) {
    const r = await api(`/api/${collection}/${existing.id}`, { method: 'PATCH', body: data, token });
    return { action: 'maj', status: r.status, id: existing.id, errors: r.json.errors };
  }
  const r = await api(`/api/${collection}`, { method: 'POST', body: data, token });
  return { action: 'créé', status: r.status, id: r.json.doc?.id, errors: r.json.errors };
};

// --- Plans tarifaires -------------------------------------------------------
let ko = 0;
for (const [i, p] of pricingPlans.entries()) {
  const data = {
    name: p.name,
    price: p.price,
    cadence: p.cadence,
    eyebrow: p.eyebrow,
    summary: p.summary,
    icon: iconName(p.icon),
    accent: p.accent,
    ctaLabel: p.ctaLabel,
    ctaHref: p.ctaHref,
    secondaryLabel: p.secondaryLabel,
    secondaryHref: p.secondaryHref,
    // string[] dans le code, array de { label } dans le CMS
    features: (p.features ?? []).map((label) => ({ label })),
    order: (i + 1) * 10,
  };
  const r = await upsertByField('pricing-plans', 'name', p.name, data);
  if (r.status >= 400) ko++;
  log(`plan ${r.action.padEnd(5)} ${p.name} -> ${r.status}${r.errors ? ' ' + r.errors[0].message : ''}`);
}

// --- Roadmap ----------------------------------------------------------------
// `id` est la clé primaire texte de cette collection : c'est l'identifiant lisible.
for (const [i, m] of roadmapData.entries()) {
  const data = {
    id: m.id,
    phase: m.phase,
    title: m.title,
    description: m.description,
    status: m.status,
    statusLabel: m.statusLabel,
    period: m.period,
    icon: iconName(m.icon),
    accent: m.accent,
    reverse: Boolean(m.reverse),
    highlights: (m.highlights ?? []).map((label) => ({ label })),
    preview: m.preview
      ? {
          title: m.preview.title,
          eyebrow: m.preview.eyebrow,
          metrics: (m.preview.metrics ?? []).map(({ label, value }) => ({ label, value })),
        }
      : undefined,
    order: (i + 1) * 10,
  };
  const r = await upsertByField('roadmap-milestones', 'id', m.id, data);
  if (r.status >= 400) ko++;
  log(`milestone ${r.action.padEnd(5)} ${m.id} -> ${r.status}${r.errors ? ' ' + r.errors[0].message : ''}`);
}

// --- Contrôle final ---------------------------------------------------------
const check = async (c) => (await api(`/api/${c}?limit=0`, { token })).json.totalDocs;
log(`en base : ${await check('pricing-plans')} plans, ${await check('roadmap-milestones')} milestones`);
if (ko) {
  console.error(`[seed] ${ko} enregistrement(s) en échec`);
  process.exit(1);
}
log('terminé');
