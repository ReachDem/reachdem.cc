import { headers } from 'next/headers';

import { ExposureBeacon } from '@/components/analytics/exposure-beacon';
import { RenderBlocks } from '@/components/landing/render-blocks';
import { VARIANT_HEADER, normalizeVariant } from '@/lib/experiments';
import { homeLayout } from '@/lib/home-layout';
import { getPageBySlugSafe } from '@/lib/pages';

import type { Block } from 'payload';

/**
 * La home A/B.
 *
 * Le middleware tranche la variante et l'injecte dans un header ; cette page
 * ne fait que suivre. Le contenu vient du CMS quand il répond (`lp-a` / `lp-b`),
 * sinon de `lib/home-layout.ts` — le Worker Cloudflare n'a pas de Postgres,
 * et sans ce repli la landing servait la pile de placeholders.
 */

export default async function Home() {
  // Le middleware a déjà tranché ; on ne fait que lire. `headers()` est
  // asynchrone depuis Next 15, et le cookie ne serait pas encore lisible ici
  // lors de la toute première visite.
  const variant = normalizeVariant((await headers()).get(VARIANT_HEADER)) ?? 'a';

  // Une page Payload par variante : `lp-a` et `lp-b`. Le slug n'apparaît jamais
  // dans l'URL — le middleware a déjà tranché, la page ne fait que suivre.
  const variantPage = await getPageBySlugSafe(`lp-${variant}`);

  // Le CMS fait foi quand il répond. Sur le Worker Cloudflare il n'y a pas de
  // Postgres : la lecture échoue, et c'est `homeLayout` qui sert la page —
  // sinon la landing retombait sur la pile de placeholders.
  const blocks =
    variantPage?.layout && Array.isArray(variantPage.layout) && variantPage.layout.length > 0
      ? variantPage.layout
      : homeLayout(variant);

  return (
    <main className="bg-surface" data-variant={variant}>
      <ExposureBeacon variant={variant} />
      <RenderBlocks blocks={blocks as Block[]} />
    </main>
  );
}
