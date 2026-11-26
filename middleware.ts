import { NextResponse, type NextRequest } from 'next/server'

import {
  EXPERIMENT_COOKIE,
  EXPERIMENT_COOKIE_MAX_AGE,
  VARIANT_HEADER,
  assignVariant,
  isNonHuman,
  normalizeVariant,
} from '@/lib/experiments'

/**
 * Assigne la variante A/B de la page d'accueil, et rien d'autre.
 *
 * Le matcher est `/` exactement : `/blog`, `/academy` ou les pages légales ne
 * participent pas au test, donc un visiteur assigné B qui lit le blog n'est
 * pas compté comme exposé. C'est ce qu'on veut — l'exposition, c'est la home.
 *
 * La variante est injectée dans un header de requête en plus du cookie : sur
 * la première visite, le cookie est posé sur la *réponse*, donc la page ne
 * peut pas le lire. Sans ce header, elle rendrait A pendant que la mesure dit B.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') return NextResponse.next()

  const userAgent = request.headers.get('user-agent')
  const nonHuman = isNonHuman(userAgent)
  const existing = normalizeVariant(request.cookies.get(EXPERIMENT_COOKIE)?.value)

  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
  const seed = `${request.headers.get('cf-connecting-ip') ?? forwarded}|${userAgent ?? ''}`
  const variant = existing ?? (nonHuman ? 'a' : assignVariant(seed))

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(VARIANT_HEADER, variant)

  const response = NextResponse.next({ request: { headers: requestHeaders } })

  // Un robot reçoit A mais ne prend pas de cookie : il ne doit pas figer une
  // variante pour l'aperçu d'un lien partagé.
  if (!existing && !nonHuman) {
    response.cookies.set(EXPERIMENT_COOKIE, variant, {
      path: '/',
      maxAge: EXPERIMENT_COOKIE_MAX_AGE,
      sameSite: 'lax',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.NODE_ENV === 'production' ? '.reachdem.cc' : undefined,
    })
  }

  return response
}

export const config = {
  matcher: '/',
}
