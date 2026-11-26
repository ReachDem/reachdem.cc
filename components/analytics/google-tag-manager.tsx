'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

import { CONSENT_EVENT, readConsent, type ConsentValue } from '@/lib/consent'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

function consentState(value: ConsentValue) {
  const granted = value === 'granted'
  return {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
  }
}

/**
 * GTM n'est monté qu'après acceptation.
 *
 * Pas de `Consent Mode` en mode « denied par défaut » : on ne charge rien du
 * tout. Le conteneur reste inerte tant que le visiteur n'a pas dit oui, donc
 * aucun cookie tiers, aucune requête vers Google. C'est plus strict que ce que
 * Google autorise, et c'est voulu.
 */
export function GoogleTagManager() {
  const [consent, setConsent] = useState<ConsentValue | null>(null)

  useEffect(() => {
    window.dataLayer = window.dataLayer ?? []

    // gtag() pousse des `arguments` : c'est la forme que GTM attend.
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }

    window.gtag('consent', 'default', {
      ...consentState('denied'),
      wait_for_update: 500,
    })

    const sync = () => {
      const current = readConsent()
      setConsent(current)
      if (current) window.gtag?.('consent', 'update', consentState(current))
    }

    sync()
    window.addEventListener(CONSENT_EVENT, sync)
    return () => window.removeEventListener(CONSENT_EVENT, sync)
  }, [])

  if (consent !== 'granted' || !GTM_ID) return null

  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  )
}
