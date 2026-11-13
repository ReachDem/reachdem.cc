import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { getReachDemUser, isAcademyConfigured } from '@/lib/reachdem-auth'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Academy — ReachDem',
  description: 'Apprendre à obtenir ses premiers clients avec ReachDem, leçon par leçon.',
  alternates: { canonical: '/academy' },
}

const levelLabel: Record<string, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
}

export default async function AcademyIndexPage() {
  const payload = await getPayloadClient()
  const [{ docs: courses }, user] = await Promise.all([
    payload.find({
      collection: 'courses',
      where: { _status: { equals: 'published' } },
      sort: 'order',
      limit: 50,
      depth: 1,
      overrideAccess: false,
    }),
    getReachDemUser(),
  ])

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Academy</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Apprendre en faisant, pas en regardant
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Des parcours courts, construits sur de vraies campagnes. La progression est enregistrée sur
          votre compte ReachDem.
        </p>
      </header>

      {!isAcademyConfigured ? (
        <p className="mb-8 rounded-xl border border-amber-500/40 bg-amber-500/5 p-5 text-sm">
          <strong className="font-semibold">La connexion au compte n’est pas encore branchée.</strong>{' '}
          Le contenu est lisible, mais la progression ne peut pas être enregistrée tant que
          <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">REACHDEM_SESSION_VERIFY_URL</code>
          n’est pas configuré.
        </p>
      ) : user ? (
        <p className="mb-8 rounded-xl border p-4 text-sm text-muted-foreground">
          Connecté en tant que <span className="font-medium text-foreground">{user.email}</span>.
        </p>
      ) : (
        <p className="mb-8 rounded-xl border p-4 text-sm text-muted-foreground">
          <Link href="/academy" className="underline">
            Connectez-vous à votre compte ReachDem
          </Link>{' '}
          pour suivre et reprendre votre progression.
        </p>
      )}

      {courses.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Aucun parcours publié pour le moment.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <li key={course.id}>
              <Link
                href={`/academy/${course.slug}`}
                className="flex h-full flex-col rounded-2xl border p-6 transition hover:border-foreground/30"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <span>{levelLabel[String(course.level)] ?? course.level}</span>
                  {course.requiresAccount ? <span>· compte requis</span> : null}
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">{course.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{course.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
