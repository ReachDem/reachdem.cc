import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getCompletedLessonIds, setLessonCompleted } from '@/app/academy/actions'
import { getPayloadClient, getPublishedCourse } from '@/lib/payload'
import { getReachDemUser, requireReachDemUser } from '@/lib/reachdem-auth'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ course: string; lesson: string }> }

async function loadLesson(courseSlug: string, lessonSlug: string) {
  const course = await getPublishedCourse(courseSlug)
  if (!course) return null

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'lessons',
    where: {
      and: [
        { course: { equals: course.id } },
        { slug: { equals: lessonSlug } },
        { _status: { equals: 'published' } },
      ],
    },
    limit: 1,
    depth: 0,
    overrideAccess: false,
  })

  return { course, lesson: docs[0] ?? null }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { course, lesson } = await params
  const found = await loadLesson(course, lesson)
  if (!found?.lesson) return { title: 'Leçon introuvable — ReachDem' }
  return {
    title: `${found.lesson.title} — ${found.course.title} — ReachDem`,
    description: found.lesson.summary ?? undefined,
    alternates: { canonical: `/academy/${found.course.slug}/${found.lesson.slug}` },
  }
}

export default async function LessonPage({ params }: Params) {
  const { course: courseSlug, lesson: lessonSlug } = await params
  const found = await loadLesson(courseSlug, lessonSlug)
  if (!found?.lesson) notFound()

  const { course, lesson } = found
  const gated = Boolean(course.requiresAccount) && !lesson.isPreview

  // Seule la leçon d'aperçu est lisible sans compte ; le reste renvoie vers la connexion produit.
  const user = gated ? await requireReachDemUser(`/academy/${course.slug}/${lesson.slug}`) : await getReachDemUser()

  const completed = user ? await getCompletedLessonIds(course.id, user.id) : new Set<string>()
  const isDone = completed.has(String(lesson.id))

  const payload = await getPayloadClient()
  const { docs: siblings } = await payload.find({
    collection: 'lessons',
    where: {
      and: [{ course: { equals: course.id } }, { _status: { equals: 'published' } }],
    },
    sort: 'order',
    limit: 200,
    depth: 0,
    overrideAccess: false,
  })

  const position = siblings.findIndex((l) => String(l.id) === String(lesson.id))
  const previous = position > 0 ? siblings[position - 1] : null
  const next = position >= 0 && position < siblings.length - 1 ? siblings[position + 1] : null

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link href={`/academy/${course.slug}`} className="text-sm text-muted-foreground hover:underline">
        ← {course.title}
      </Link>

      <header className="mt-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Leçon {position + 1} sur {siblings.length}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{lesson.title}</h1>
        {lesson.summary ? (
          <p className="mt-3 text-base text-muted-foreground">{lesson.summary}</p>
        ) : null}
      </header>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <RichText data={lesson.content} />
      </div>

      {user ? (
        <form action={setLessonCompleted} className="mt-10 flex items-center gap-4">
          <input type="hidden" name="courseId" value={String(course.id)} />
          <input type="hidden" name="courseSlug" value={course.slug} />
          <input type="hidden" name="lessonId" value={String(lesson.id)} />
          <input type="hidden" name="lessonSlug" value={lesson.slug} />
          <input type="hidden" name="completed" value={isDone ? 'false' : 'true'} />
          <button
            type="submit"
            className="rounded-full border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            {isDone ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
          </button>
          {isDone ? <span className="text-sm text-muted-foreground">Terminée</span> : null}
        </form>
      ) : (
        <p className="mt-10 rounded-xl border p-5 text-sm text-muted-foreground">
          Leçon d’aperçu. Connectez-vous à votre compte ReachDem pour enregistrer votre progression.
        </p>
      )}

      <nav className="mt-12 flex items-center justify-between border-t pt-6 text-sm">
        {previous ? (
          <Link href={`/academy/${course.slug}/${previous.slug}`} className="hover:underline">
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/academy/${course.slug}/${next.slug}`} className="text-right hover:underline">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  )
}
