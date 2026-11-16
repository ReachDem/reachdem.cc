import localFont from 'next/font/local'

/**
 * Neue Montreal, la police de marque.
 *
 * Copiée dans `app/(frontend)/fonts/` plutôt que lue depuis `public/` : next/font
 * doit voir les fichiers au build pour calculer les métriques de repli, et un
 * fichier de `public/` n'est pas tracé comme dépendance.
 */
export const neueMontreal = localFont({
  src: [
    { path: './fonts/NeueMontreal-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/NeueMontreal-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/NeueMontreal-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-neue',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})
