import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getCompletedLessonIds } from '@/app/academy/actions'
import { getPayloadClient, getPublishedCourse } from '@/lib/payload'
import { getReachDemUser } from '@/lib/reachdem-auth'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ course: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { course: slug } = await params
  const course = await getPublishedCourse(slug)
  if (!course) return { title: 'Parcours introuvable — ReachDem' }
  return {
    title: `${course.title} — Academy ReachDem`,
    description: course.summary,
    alternates: { canonical: `/academy/${course.slug}` },
  }
}

export default async function CoursePage({ params }: Params) {
  const { course: slug } = await params
  const course = await getPublishedCourse(slug)
  if (!course) notFound()

  const payload = await getPayloadClient()
  const [{ docs: lessons }, user] = await Promise.all([
    payload.find({
      collection: 'lessons',
      where: {
        and: [{ course: { equals: course.id } }, { _status: { equals: 'published' } }],
      },
      sort: 'order',
      limit: 200,
      depth: 0,
      overrideAccess: false,
    }),
    getReachDemUser(),
  ])

  const completed = user ? await getCompletedLessonIds(course.id, user.id) : new Set<string>()
  const doneCount = lessons.filter((lesson) => completed.has(String(lesson.id))).length
  const percent = lessons.length > 0 ? Math.round((doneCount / lessons.length) * 100) : 0
  const cover = typeof course.cover === 'object' && course.cover !== null ? course.cover : null
  const gated = Boolean(course.requiresAccount) && !user

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link href="/academy" className="text-sm text-muted-foreground hover:underline">
        ← Tous les parcours
      </Link>

      <header className="mt-8">
        <h1 className="text-4xl font-semibold tracking-tight">{course.title}</h1>
        <p className="mt-4 text-base text-muted-foreground">{course.summary}</p>
      </header>

      {cover?.url ? (
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={cover.url}
            alt={cover.alt ?? course.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {course.content ? (
        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
          <RichText data={course.content} />
        </div>
      ) : null}

      {user ? (
        <section className="mt-10 rounded-2xl border p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {doneCount} / {lessons.length} leçons terminées
            </span>
            <span className="text-muted-foreground">{percent} %</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-foreground transition-all" style={{ width: `${percent}%` }} />
          </div>
        </section>
      ) : gated ? (
        <p className="mt-10 rounded-xl border p-5 text-sm text-muted-foreground">
          Un compte ReachDem est nécessaire pour suivre ce parcours et enregistrer votre progression.
          Les leçons marquées « aperçu » restent lisibles sans compte.
        </p>
      ) : null}

      <section className="mt-10">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground">Leçons</h2>
        <ol className="mt-4 divide-y rounded-2xl border">
          {lessons.map((lesson, index) => {
            const isDone = completed.has(String(lesson.id))
            const locked = gated && !lesson.isPreview
            return (
              <li key={lesson.id}>
                {locked ? (
                  <div className="flex items-center gap-4 p-4 opacity-60">
                    <span className="w-6 text-sm text-muted-foreground">{index + 1}</span>
                    <span className="flex-1 text-sm">{lesson.title}</span>
                    <span className="text-xs uppercase tracking-wider">Compte requis</span>
                  </div>
                ) : (
                  <Link
                    href={`/academy/${course.slug}/${lesson.slug}`}
                    className="flex items-center gap-4 p-4 transition hover:bg-muted/50"
                  >
                    <span className="w-6 text-sm text-muted-foreground">
                      {isDone ? '✓' : index + 1}
                    </span>
                    <span className="flex-1 text-sm font-medium">{lesson.title}</span>
                    {lesson.isPreview && !user ? (
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">Aperçu</span>
                    ) : null}
                    {lesson.durationMinutes ? (
                      <span className="text-xs text-muted-foreground">{lesson.durationMinutes} min</span>
                    ) : null}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </section>
    </main>
  )
}
