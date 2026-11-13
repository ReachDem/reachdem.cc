import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'

// Contenu servi par le CMS : pas de rendu statique au build (aucune base requise pour builder).
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog — ReachDem',
  description: 'Ce qui sort, ce qu’on apprend, ce qu’on mesure chez ReachDem.',
  alternates: { canonical: '/blog' },
}

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' })

export default async function BlogIndexPage() {
  const payload = await getPayloadClient()
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 50,
    depth: 1,
    // L'API locale contourne `access` par défaut : on rétablit la règle publique.
    overrideAccess: false,
  })

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="mb-12">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Ce qu’on apprend en chemin</h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Décisions produit, coulisses techniques, mesures réelles. Publié quand c’est utile, pas quand
          le calendrier le dit.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Aucun article publié pour le moment.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => {
            const cover = typeof post.cover === 'object' && post.cover !== null ? post.cover : null
            return (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border transition hover:border-foreground/30"
                >
                  {cover?.url ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                      <Image
                        src={cover.url}
                        alt={cover.alt ?? post.title}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    {post.publishedAt ? (
                      <time
                        dateTime={post.publishedAt}
                        className="text-xs uppercase tracking-wider text-muted-foreground"
                      >
                        {dateFormatter.format(new Date(post.publishedAt))}
                      </time>
                    ) : null}
                    <h2 className="mt-2 text-xl font-semibold tracking-tight group-hover:underline">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
