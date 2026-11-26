import Link from 'next/link';
import { headers } from 'next/headers';

import { SECTIONS } from './sections';
import { ExposureBeacon } from '@/components/analytics/exposure-beacon';
import { RenderBlocks } from '@/components/landing/render-blocks';
import { VARIANT_HEADER, normalizeVariant } from '@/lib/experiments';
import { getPageBySlugSafe } from '@/lib/pages';

/**
 * Page d'accueil provisoire.
 *
 * Ce n'est pas un design : c'est un plan de travail. Chaque bloc est un
 * emplacement vide qui correspond à un sketch dans `design/sketches/out/`.
 * On remplace les blocs un par un, dans l'ordre, en partant du navbar.
 */

/** hauteur indicative, pour que la pile ressemble aux proportions réelles */
const HEIGHT: Record<string, string> = {
  navbar: 'min-h-[72px]',
  hero: 'min-h-[420px]',
  logos: 'min-h-[160px]',
  probleme: 'min-h-[280px]',
  features: 'min-h-[360px]',
  process: 'min-h-[300px]',
  demo: 'min-h-[380px]',
  testimonial: 'min-h-[320px]',
  chiffres: 'min-h-[220px]',
  academy: 'min-h-[300px]',
  blog: 'min-h-[280px]',
  'pricing-teaser': 'min-h-[320px]',
  faq: 'min-h-[300px]',
  cta: 'min-h-[240px]',
  footer: 'min-h-[260px]',
};

export default async function Home() {
  // Le middleware a déjà tranché ; on ne fait que lire. `headers()` est
  // asynchrone depuis Next 15, et le cookie ne serait pas encore lisible ici
  // lors de la toute première visite.
  const variant = normalizeVariant((await headers()).get(VARIANT_HEADER)) ?? 'a';

  // Une page Payload par variante : `lp-a` et `lp-b`. Le slug n'apparaît jamais
  // dans l'URL — le middleware a déjà tranché, la page ne fait que suivre.
  const variantPage = await getPageBySlugSafe(`lp-${variant}`);

  if (variantPage?.layout && Array.isArray(variantPage.layout) && variantPage.layout.length > 0) {
    return (
      <main className="bg-surface" data-variant={variant}>
        <ExposureBeacon variant={variant} />
        <RenderBlocks blocks={variantPage.layout} />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-14" data-variant={variant}>
      <ExposureBeacon variant={variant} />
      <header className="mb-10 border-b border-neutral-200 pb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          reconstruction en cours
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
          Landing ReachDem — {SECTIONS.length} sections
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Chaque bloc ci-dessous est un emplacement vide, pas encore dessiné. Son sketch animé
          se trouve dans{' '}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[12px]">
            design/sketches/out/
          </code>
          . On remplace les blocs un par un. La{' '}
          <strong className="text-neutral-700">navbar</strong> est livrée (rendue par le layout,
          pas par cette pile) : elle vient du global Payload « Réglages du site » et retombe sur{' '}
          <code>lib/navigation.ts</code> quand la base n’est pas joignable.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {SECTIONS.filter((s) => s.id !== 'navbar').map((s) => (
          <section
            key={s.id}
            id={s.id}
            className={`group flex flex-col justify-between rounded-lg border border-dashed border-neutral-300 bg-neutral-50/60 p-5 transition-colors hover:border-neutral-400 hover:bg-neutral-50 ${HEIGHT[s.id] ?? 'min-h-[240px]'}`}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs tabular-nums text-neutral-400">
                {String(s.n).padStart(2, '0')}
              </span>
              <h2 className="text-base font-semibold text-neutral-800">{s.title}</h2>
            </div>

            <p className="mt-2 text-sm text-neutral-500">{s.note}</p>

            <p className="mt-3 font-mono text-[11px] text-neutral-400">
              sketch : {s.gif}
            </p>
          </section>
        ))}
      </div>

      <footer className="mt-12 flex flex-col gap-3 border-t border-neutral-200 pt-6 font-mono text-[11px] text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
        <span>{SECTIONS.length} emplacements · aucun contenu · aucun style de marque</span>
        <nav aria-label="Liens légaux" className="flex gap-4">
          <Link href="/privacy" className="transition-colors hover:text-neutral-700">
            Confidentialité
          </Link>
          <Link href="/terms" className="transition-colors hover:text-neutral-700">
            Conditions d’utilisation
          </Link>
        </nav>
      </footer>
    </main>
  );
}
