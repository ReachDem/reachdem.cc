'use server'

import { revalidatePath } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { getReachDemUser } from '@/lib/reachdem-auth'

/**
 * Leçons terminées par un utilisateur pour un parcours donné.
 * Renvoie un ensemble d'identifiants de leçons.
 */
export async function getCompletedLessonIds(courseId: string | number, userRef: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'lesson-progress',
    where: {
      and: [{ userRef: { equals: userRef } }, { course: { equals: courseId } }],
    },
    limit: 500,
    depth: 0,
    // Requête déjà cadrée sur userRef : on assume l'override, il n'y a pas de
    // session Payload dans un composant public.
    overrideAccess: true,
  })

  return new Set(
    docs.map((row) => {
      const lesson = (row as { lesson?: string | number | { id: string | number } }).lesson
      return typeof lesson === 'object' && lesson !== null ? String(lesson.id) : String(lesson)
    }),
  )
}

/**
 * Coche ou décoche une leçon pour l'utilisateur connecté.
 *
 * `create` est volontairement refusé en REST public sur `lesson-progress`
 * (voir la collection) : la seule écriture possible passe par cette action,
 * qui vérifie d'abord la session ReachDem.
 */
export async function setLessonCompleted(formData: FormData) {
  const user = await getReachDemUser()
  // Sans session valide, on ne fait rien : la page a déjà redirigé vers la connexion.
  if (!user) return

  const courseId = String(formData.get('courseId') ?? '')
  const lessonId = String(formData.get('lessonId') ?? '')
  const courseSlug = String(formData.get('courseSlug') ?? '')
  const lessonSlug = String(formData.get('lessonSlug') ?? '')
  const shouldComplete = formData.get('completed') === 'true'

  if (!courseId || !lessonId) return

  const payload = await getPayloadClient()
  const existing = await payload.find({
    collection: 'lesson-progress',
    where: {
      and: [{ userRef: { equals: user.id } }, { lesson: { equals: lessonId } }],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const current = existing.docs[0]

  if (shouldComplete && !current) {
    await payload.create({
      collection: 'lesson-progress',
      data: {
        userRef: user.id,
        userEmail: user.email,
        course: courseId,
        lesson: lessonId,
        completedAt: new Date().toISOString(),
      },
      overrideAccess: true,
    })
  } else if (!shouldComplete && current) {
    await payload.delete({
      collection: 'lesson-progress',
      id: current.id,
      overrideAccess: true,
    })
  }

  revalidatePath(`/academy/${courseSlug}`)
  revalidatePath(`/academy/${courseSlug}/${lessonSlug}`)
}
