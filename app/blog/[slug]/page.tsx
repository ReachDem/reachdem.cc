import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getPublishedPost } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ slug: string }> }

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' })

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) return { title: 'Article introuvable — ReachDem' }

  const seo = (post as { seo?: { title?: string; description?: string } }).seo
  return {
    title: seo?.title || `${post.title} — ReachDem`,
    description: seo?.description || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) notFound()

  const cover = typeof post.cover === 'object' && post.cover !== null ? post.cover : null
  const author = typeof post.author === 'object' && post.author !== null ? post.author : null
  const categories = Array.isArray(post.categories)
    ? post.categories.filter((c): c is { id: string | number; title: string; slug: string } =>
        typeof c === 'object' && c !== null && 'title' in c,
      )
    : []

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link href="/blog" className="text-sm text-muted-foreground hover:underline">
        ← Tous les articles
      </Link>

      <header className="mt-8">
        {categories.length > 0 ? (
          <div className="mb-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c.id}
                className="rounded-full border px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground"
              >
                {c.title}
              </span>
            ))}
          </div>
        ) : null}

        <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>

        <p className="mt-4 text-sm text-muted-foreground">
          {author?.name || author?.email || 'ReachDem'}
          {post.publishedAt ? ` · ${dateFormatter.format(new Date(post.publishedAt))}` : ''}
          {post.readingMinutes ? ` · ${post.readingMinutes} min de lecture` : ''}
        </p>
      </header>

      {cover?.url ? (
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={cover.url}
            alt={cover.alt ?? post.title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
        {post.content ? <RichText data={post.content} /> : null}
      </div>
    </main>
  )
}
