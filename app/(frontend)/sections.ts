/**
 * Le plan de la landing, en une seule liste.
 *
 * Source de vérité de l'ordre des sections. Chaque entrée correspond à un
 * sketch dans `design/sketches/out/` et à un emplacement vide dans la page.
 *
 * Quand une section est développée, on retire son `placeholder` et on met le
 * composant réel à la place — l'ordre, lui, ne bouge pas d'ici.
 */
export type Section = {
  /** numéro affiché, aligné sur le nom du GIF */
  n: number;
  id: string;
  title: string;
  /** ce que la section doit raconter — pas la copie finale */
  note: string;
  /** fichier de sketch correspondant */
  gif: string;
};

export const SECTIONS: Section[] = [
  { n: 1, id: 'navbar', title: 'Navbar', note: 'barre fixe — logo, navigation, un seul CTA', gif: '01-navbar.gif' },
  { n: 2, id: 'hero', title: 'Hero', note: 'une seule promesse — visuel produit à droite', gif: '02-hero.gif' },
  { n: 3, id: 'logos', title: 'Preuves — logos', note: 'qui nous fait déjà confiance', gif: '03-logos.gif' },
  { n: 4, id: 'probleme', title: 'Le constat', note: 'trois douleurs, pourquoi le visiteur est là', gif: '04-probleme.gif' },
  { n: 5, id: 'features', title: 'Fonctionnalités', note: 'ce que le produit fait — grille de six', gif: '05-features.gif' },
  { n: 6, id: 'process', title: 'Comment ça marche', note: 'trois étapes numérotées', gif: '06-process.gif' },
  { n: 7, id: 'demo', title: 'Produit en action', note: 'capture réelle — pas une illustration', gif: '07-demo.gif' },
  { n: 8, id: 'testimonial', title: 'Testimonial', note: 'une voix forte, pas un mur de citations', gif: '08-testimonial.gif' },
  { n: 9, id: 'chiffres', title: 'Preuves chiffrées', note: 'métriques vérifiables', gif: '09-chiffres.gif' },
  { n: 10, id: 'academy', title: 'Teaser Academy', note: 'formation + suivi — nécessite un compte', gif: '10-academy.gif' },
  { n: 11, id: 'blog', title: 'Teaser blog', note: 'trois articles, tirés de Payload', gif: '11-blog.gif' },
  { n: 12, id: 'pricing-teaser', title: 'Tarifs — teaser', note: 'trois plans, un seul mis en avant', gif: '12-pricing-teaser.gif' },
  { n: 13, id: 'faq', title: 'FAQ', note: 'les vraies objections', gif: '13-faq.gif' },
  { n: 14, id: 'cta', title: 'CTA final', note: 'dernière action avant le footer', gif: '14-cta.gif' },
  { n: 15, id: 'footer', title: 'Footer', note: 'navigation secondaire + preuves + mentions', gif: '15-footer.gif' },
];
