import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — ReachDem',
  description:
    'Comment ReachDem collecte, utilise, partage et protège les données personnelles, y compris les données traitées via WhatsApp Business et les plateformes Meta.',
  alternates: { canonical: '/privacy' },
}

const EFFECTIVE_DATE = '12 mars 2026'
const LAST_UPDATED = '12 mars 2026'

const TOC = [
  { id: 'qui-sommes-nous', title: 'Qui sommes-nous' },
  { id: 'champ-application', title: 'Champ d’application' },
  { id: 'donnees-collectees', title: 'Données personnelles collectées' },
  { id: 'collecte', title: 'Comment nous collectons les données' },
  { id: 'finalites', title: 'Comment nous utilisons les données' },
  { id: 'bases-legales', title: 'Bases légales du traitement' },
  { id: 'cookies', title: 'Cookies et technologies similaires' },
  { id: 'whatsapp-meta', title: 'Données WhatsApp et plateformes Meta' },
  { id: 'profils-publics', title: 'Profils publics et contenus partagés' },
  { id: 'donnees-clients', title: 'Données clients et communications envoyées' },
  { id: 'partage', title: 'Partage des données et sous-traitants' },
  { id: 'transferts', title: 'Transferts internationaux' },
  { id: 'conservation', title: 'Durées de conservation' },
  { id: 'securite', title: 'Sécurité des données' },
  { id: 'droits', title: 'Vos droits et vos choix' },
  { id: 'marketing', title: 'Communications marketing' },
  { id: 'mineurs', title: 'Données des mineurs' },
  { id: 'services-tiers', title: 'Services tiers' },
  { id: 'ia', title: 'Fonctionnalités d’IA' },
  { id: 'regional', title: 'Dispositions régionales' },
  { id: 'modifications', title: 'Modifications de cette politique' },
  { id: 'contact', title: 'Nous contacter' },
]

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-7 text-neutral-600">{children}</p>
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-neutral-600 marker:text-neutral-300">
      {children}
    </ul>
  )
}

/** Marqueur visible pour toute donnée légale qui doit être fournie par la société. */
function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-900">
      [À COMPLÉTER : {children}]
    </mark>
  )
}

function Section({
  id,
  n,
  title,
  children,
}: {
  id: string
  n: number
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-neutral-200 pt-10">
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
        <span className="mr-2 font-mono text-sm font-normal tabular-nums text-neutral-400">
          {n}.
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-14">
      <nav className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
        <Link href="/" className="transition-colors hover:text-neutral-900">
          ← Retour à l’accueil
        </Link>
      </nav>

      <header className="mt-8 border-b border-neutral-200 pb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          Mentions légales
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600">
          Cette politique explique comment ReachDem collecte, utilise, communique, conserve et protège
          les données personnelles lorsque vous accédez à son site, à sa plateforme et aux services
          associés, y compris Links by ReachDem.
        </p>
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] text-neutral-500">
          <div className="flex gap-2">
            <dt>En vigueur depuis</dt>
            <dd className="text-neutral-700">{EFFECTIVE_DATE}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Dernière mise à jour</dt>
            <dd className="text-neutral-700">{LAST_UPDATED}</dd>
          </div>
        </dl>
      </header>

      <nav aria-label="Sommaire" className="my-10 rounded-xl border border-neutral-200 bg-neutral-50/60 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">Sommaire</p>
        <ol className="mt-4 grid gap-x-8 gap-y-2 text-sm text-neutral-600 sm:grid-cols-2">
          {TOC.map((item, index) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="transition-colors hover:text-neutral-900 hover:underline">
                <span className="font-mono text-[11px] tabular-nums text-neutral-400">
                  {String(index + 1).padStart(2, '0')}
                </span>{' '}
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-10">
        <Section id="qui-sommes-nous" n={1} title="Qui sommes-nous">
          <P>
            ReachDem est une plateforme de communication et d’engagement conçue pour aider les
            entreprises, les équipes, les entrepreneurs et les organisations à gérer leur
            communication numérique, l’engagement de leurs clients, leurs données de contact, la
            segmentation de leurs audiences, leurs campagnes, leur analytique et leurs pages
            publiques, sur l’ensemble des canaux pris en charge.
          </P>
          <P>Selon les services utilisés, ReachDem peut proposer des fonctionnalités relatives à :</P>
          <UL>
            <li>la gestion des contacts et des audiences, groupes et segments ;</li>
            <li>la création et l’envoi de campagnes de messagerie ;</li>
            <li>le raccourcissement et le suivi de liens ;</li>
            <li>l’analytique et le reporting ;</li>
            <li>les pages de profil et de liens publiques, y compris les cartes de visite numériques ;</li>
            <li>les intégrations et l’accès par API ;</li>
            <li>l’automatisation de workflows et les fonctionnalités assistées par intelligence artificielle.</li>
          </UL>
          <P>
            Au sens des lois applicables sur la protection des données, ReachDem agit soit comme{' '}
            <strong className="font-semibold text-neutral-800">responsable du traitement</strong> pour
            les données personnelles qu’elle collecte dans le cadre de ses propres activités, soit
            comme <strong className="font-semibold text-neutral-800">sous-traitant</strong> ou
            prestataire de services lorsqu’elle traite des données personnelles pour le compte de ses
            clients.
          </P>
          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              Identité de l’éditeur
            </p>
            <dl className="mt-4 space-y-2 text-[15px] leading-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="w-56 shrink-0 text-neutral-500">Raison sociale</dt>
                <dd className="text-neutral-700">
                  <Placeholder>raison sociale exacte</Placeholder>
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="w-56 shrink-0 text-neutral-500">Siège social</dt>
                <dd className="text-neutral-700">
                  <Placeholder>adresse complète du siège social</Placeholder>
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="w-56 shrink-0 text-neutral-500">Immatriculation / RCCM</dt>
                <dd className="text-neutral-700">
                  <Placeholder>numéro d’immatriculation ou RCCM</Placeholder>
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="w-56 shrink-0 text-neutral-500">Contact</dt>
                <dd className="text-neutral-700">
                  <a href="mailto:support@reachdem.cc" className="underline hover:text-neutral-900">
                    support@reachdem.cc
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs leading-6 text-neutral-500">
              Ces informations d’identification sont en cours de validation par la société et seront
              renseignées ici avant la mise en ligne publique de cette politique.
            </p>
          </div>
        </Section>

        <Section id="champ-application" n={2} title="Champ d’application">
          <P>
            Cette politique s’applique aux données personnelles collectées via notre site, la création
            et l’administration de comptes, l’onboarding des clients, l’usage du tableau de bord, les
            pages de profil publiques, les outils de communication, le suivi des liens et des
            campagnes, la gestion des contacts, les échanges avec le support, les intégrations, les API
            et les autres activités opérationnelles associées.
          </P>
          <P>
            Elle ne s’applique pas aux sites, services ou plateformes de tiers qui peuvent être liés à
            nos services, intégrés à ceux-ci ou accessibles depuis eux. Ces tiers appliquent leurs
            propres conditions et politiques de confidentialité, que nous vous invitons à consulter
            séparément.
          </P>
        </Section>

        <Section id="donnees-collectees" n={3} title="Données personnelles collectées">
          <P>
            Nous pouvons collecter des données personnelles directement auprès de vous,
            automatiquement lorsque vous utilisez les services, auprès de nos clients, via des
            intégrations tierces et auprès de prestataires qui soutiennent nos opérations.
          </P>
          <P>Les données personnelles collectées peuvent notamment inclure :</P>
          <UL>
            <li>votre nom, votre adresse e-mail, votre numéro de téléphone, le nom de votre société, votre fonction et vos coordonnées professionnelles ;</li>
            <li>vos identifiants de compte, vos informations de profil et les informations relatives à votre espace de travail ;</li>
            <li>vos informations de facturation et d’abonnement ;</li>
            <li>vos demandes de support, vos réponses à des enquêtes et toute autre information que vous choisissez de nous communiquer.</li>
          </UL>
          <P>
            Lorsque des clients utilisent ReachDem pour importer, créer, organiser ou gérer des bases
            de contacts, nous pouvons traiter des informations de contact telles que des noms, numéros
            de téléphone, adresses e-mail, informations professionnelles, adresses postales, dates
            d’anniversaire, étiquettes, attributs de segmentation, champs personnalisés, préférences de
            communication, historique des échanges et autres métadonnées associées à une fiche de
            contact.
          </P>
          <P>
            Lorsque les services servent à créer, envoyer, acheminer ou analyser des communications,
            nous pouvons traiter des données relatives à l’expéditeur et au destinataire, notamment des
            noms, adresses, identifiants de canal, contenus des messages, objets, médias joints,
            horodatages de remise, statuts de remise, événements d’engagement, désinscriptions et
            métadonnées de campagne associées.
          </P>
          <P>
            Lorsque des utilisateurs interagissent avec des pages ReachDem, des liens raccourcis, des
            cartes de visite numériques ou des profils Links by ReachDem, nous pouvons collecter des
            données telles que des vues de page, des clics sur des liens, des sources de trafic, une
            localisation approximative déduite de l’adresse IP, le type de navigateur, des informations
            sur l’appareil, le système d’exploitation, l’activité de session, des horodatages, des
            paramètres d’attribution de campagne et d’autres indicateurs d’interaction.
          </P>
          <P>
            Nous collectons également des informations techniques et d’usage lorsque les utilisateurs
            accèdent aux services : adresse IP, journaux, paramètres du navigateur, identifiants
            d’appareil, heures d’accès, parcours de navigation, journaux d’API, rapports d’erreur,
            signaux de sécurité et informations de diagnostic nécessaires au maintien, à la
            sécurisation et à l’amélioration des services.
          </P>
          <P>
            Si des paiements sont traités dans le cadre des services, nous pouvons recevoir des
            informations de facturation, des statuts de paiement, des détails de facturation, des
            enregistrements d’abonnement et des métadonnées de transaction limitées. Les données
            complètes de carte de paiement sont généralement traitées par des prestataires de paiement
            tiers et ne sont pas stockées par nos soins, sauf mention contraire expresse.
          </P>
          <P>
            Lorsque des fonctionnalités d’IA sont disponibles, nous pouvons traiter les instructions et
            requêtes des utilisateurs, le contexte de campagne, le contexte lié aux contacts, les
            données d’analyse fournies en entrée, les résultats générés, les retours des utilisateurs et
            les métadonnées nécessaires à la fourniture de ces fonctionnalités.
          </P>
        </Section>

        <Section id="collecte" n={4} title="Comment nous collectons les données">
          <P>
            Certaines informations sont collectées directement lorsque vous créez un compte, remplissez
            un formulaire, nous contactez, vous abonnez à nos actualités, demandez une démonstration,
            configurez votre espace de travail ou interagissez autrement avec nous. D’autres
            informations sont collectées automatiquement au moyen de cookies, de journaux, de
            technologies d’analyse et d’outils similaires lorsque vous naviguez sur le site ou utilisez
            les services.
          </P>
          <P>
            Nous pouvons également recevoir des données personnelles de la part de clients qui importent
            des fiches de contact ou utilisent les services pour gérer leurs communications, de services
            tiers que les utilisateurs connectent à ReachDem, de prestataires de paiement, de
            fournisseurs d’authentification, de fournisseurs d’analyse et d’autres prestataires
            intervenant dans nos opérations.
          </P>
        </Section>

        <Section id="finalites" n={5} title="Comment nous utilisons les données">
          <P>
            Nous utilisons les données personnelles pour fournir, exploiter, maintenir, sécuriser,
            assister et améliorer les services. Cela comprend la création et la gestion des comptes,
            l’authentification des utilisateurs, la collaboration au sein des espaces de travail, la
            gestion des environnements de données clients, le fonctionnement des workflows de
            messagerie, la tenue des pages de profil publiques, l’exploitation des liens raccourcis et la
            production d’analyses et de rapports.
          </P>
          <P>
            Nous utilisons également les données personnelles pour communiquer avec les utilisateurs et
            les clients, notamment pour l’onboarding, les notifications de service, la facturation, le
            support, les évolutions produit et les communications légales ou administratives. Lorsque la
            loi le permet, nous pouvons utiliser certaines données personnelles pour envoyer des
            communications marketing, promouvoir nos services et informer les utilisateurs de nouvelles
            fonctionnalités, d’événements ou de mises à jour.
          </P>
          <P>Les données personnelles peuvent aussi servir à :</P>
          <UL>
            <li>personnaliser l’expérience produit et améliorer l’ergonomie ;</li>
            <li>analyser les performances et surveiller la qualité de service ;</li>
            <li>détecter et prévenir les abus, le spam, la fraude, les accès non autorisés et les incidents de sécurité ;</li>
            <li>faire respecter nos conditions et nos politiques ;</li>
            <li>respecter nos obligations légales et protéger nos droits, ceux de nos utilisateurs et de nos activités.</li>
          </UL>
          <P>
            Lorsque des fonctionnalités assistées par IA sont proposées, nous pouvons utiliser les
            données fournies en entrée pour produire des suggestions de contenu, des fonctionnalités de
            personnalisation, des analyses prédictives, des recommandations de workflow ou des
            améliorations analytiques. Les utilisateurs restent responsables de la relecture et de la
            validation des résultats générés avant de les utiliser dans des communications réelles ou
            des processus métier.
          </P>
        </Section>

        <Section id="bases-legales" n={6} title="Bases légales du traitement">
          <P>
            Lorsque la loi applicable l’exige, nous traitons les données personnelles sur une ou
            plusieurs bases légales. Il peut s’agir de :
          </P>
          <UL>
            <li>
              <strong className="font-semibold text-neutral-800">l’exécution d’un contrat</strong>,
              lorsque le traitement est nécessaire à la fourniture des services ou à l’exécution de nos
              obligations ;
            </li>
            <li>
              <strong className="font-semibold text-neutral-800">nos intérêts légitimes</strong>,
              lorsque le traitement est raisonnablement nécessaire à l’exploitation, à l’amélioration,
              à la sécurisation ou au développement de nos activités et de nos services ;
            </li>
            <li>
              <strong className="font-semibold text-neutral-800">le consentement</strong>, lorsqu’il est
              requis pour certaines activités, comme certaines communications marketing ou certains
              cookies facultatifs ;
            </li>
            <li>
              <strong className="font-semibold text-neutral-800">le respect d’obligations légales</strong>.
            </li>
          </UL>
          <P>
            Lorsque nous traitons des données personnelles pour le compte de nos clients, c’est au
            client qu’il appartient de déterminer la base légale appropriée pour la collecte et
            l’utilisation de ces données.
          </P>
        </Section>

        <Section id="cookies" n={7} title="Cookies et technologies similaires">
          <P>
            Nous utilisons des cookies et des technologies similaires pour faire fonctionner le site et
            les services, mémoriser des préférences, sécuriser les sessions utilisateur, mesurer le
            trafic et les performances, comprendre comment les utilisateurs interagissent avec les pages
            et fonctionnalités, améliorer l’ergonomie, produire des analyses et préserver l’intégrité de
            la plateforme.
          </P>
          <P>
            Ces technologies peuvent inclure des cookies strictement nécessaires, des cookies
            fonctionnels, des cookies de mesure d’audience et des outils similaires utilisés pour la
            surveillance des performances, le diagnostic ou l’amélioration de l’expérience utilisateur.
            Selon la juridiction et la configuration du site, des contrôles ou des choix de consentement
            peuvent être proposés. Vous pouvez également gérer les cookies depuis les réglages de votre
            navigateur, étant précisé que la désactivation de certains cookies peut affecter le
            fonctionnement des services.
          </P>
        </Section>

        <Section id="whatsapp-meta" n={8} title="Données WhatsApp et plateformes Meta">
          <P>
            ReachDem permet à ses clients de communiquer avec leurs contacts sur plusieurs canaux, dont
            WhatsApp via la plateforme WhatsApp Business de Meta. Cette section décrit spécifiquement
            les données traitées dans ce cadre, conformément aux exigences des plateformes Meta.
          </P>
          <P>
            <strong className="font-semibold text-neutral-800">Données de connexion au compte.</strong>{' '}
            Lorsqu’un client connecte un compte WhatsApp Business à ReachDem, nous traitons les
            identifiants techniques fournis par Meta (identifiant du compte WhatsApp Business,
            identifiant du compte publicitaire ou du portefeuille professionnel le cas échéant, numéro
            de téléphone professionnel, nom du profil professionnel) ainsi que les jetons d’accès
            nécessaires à l’acheminement des messages. Ces jetons sont stockés de manière sécurisée et
            ne sont jamais affichés en clair dans l’interface.
          </P>
          <P>
            <strong className="font-semibold text-neutral-800">Contenus et métadonnées des messages.</strong>{' '}
            Nous traitons le contenu des messages entrants et sortants, les pièces jointes, les
            modèles de messages soumis à validation par Meta et leur statut, les horodatages d’envoi et
            de remise, les statuts de livraison et de lecture, les réactions et les événements de
            désabonnement, afin de fournir la messagerie, d’afficher l’historique dans l’espace de
            travail du client et de produire les statistiques de campagne.
          </P>
          <P>
            <strong className="font-semibold text-neutral-800">Rôles respectifs.</strong> Pour les
            données de contacts et de conversations d’un client, ce client est responsable du traitement
            et ReachDem agit comme sous-traitant, sur ses instructions. Pour les données liées à la
            création, à la sécurité et à la facturation du compte ReachDem lui-même, ReachDem agit comme
            responsable du traitement.
          </P>
          <P>
            <strong className="font-semibold text-neutral-800">Transmission à Meta.</strong> Les
            messages et les données techniques nécessaires à leur acheminement sont transmis à Meta
            Platforms, Inc. et à WhatsApp LLC, qui les traitent selon leurs propres conditions et
            politiques de confidentialité. La conservation des données au sein des systèmes de Meta
            relève de Meta et n’est pas déterminée par ReachDem. Nous ne transmettons pas à Meta les
            données de contact de nos clients à d’autres fins que l’acheminement des communications
            demandées.
          </P>
          <P>
            <strong className="font-semibold text-neutral-800">Ce que nous ne faisons pas.</strong> Nous
            ne vendons pas les données issues de WhatsApp. Nous ne les utilisons pas pour de la
            publicité comportementale de tiers. Nous ne les utilisons pas pour entraîner des modèles
            d’IA générative accessibles au public d’une manière qui rendrait ces données publiquement
            attribuables au client.
          </P>
          <P>
            <strong className="font-semibold text-neutral-800">Obligations du client.</strong> Le client
            qui utilise WhatsApp via ReachDem est seul responsable de l’obtention du consentement
            préalable de ses destinataires (opt-in), du respect des règles de la plateforme WhatsApp
            Business et de sa politique commerciale, de l’usage de modèles de messages approuvés et du
            traitement des demandes de désabonnement. Il lui appartient également de fournir ses propres
            informations de confidentialité aux personnes qu’il contacte.
          </P>
          <P>
            <strong className="font-semibold text-neutral-800">Suppression et déconnexion.</strong> Lorsqu’un
            client déconnecte son compte WhatsApp Business de ReachDem, les jetons d’accès associés sont
            révoqués et supprimés de nos systèmes. Les données de contacts et de conversations restent
            accessibles dans l’espace de travail du client et sont supprimées selon les modalités
            décrites à la section 13 et à la demande écrite du client adressée à{' '}
            <a href="mailto:support@reachdem.cc" className="underline hover:text-neutral-900">
              support@reachdem.cc
            </a>
            .
          </P>
        </Section>

        <Section id="profils-publics" n={9} title="Profils publics et contenus partagés">
          <P>
            Certaines fonctionnalités de ReachDem, dont Links by ReachDem et les expériences de profil
            public ou de carte de visite numérique associées, permettent de publier des informations
            destinées à être accessibles publiquement : noms, descriptions professionnelles, moyens de
            contact, informations sur l’activité, médias, liens sociaux, liens promotionnels, liens de
            réservation, formulaires et autres contenus délibérément rendus publics par l’utilisateur.
          </P>
          <P>
            Toute information qu’un utilisateur choisit de publier peut être consultée, copiée ou
            réutilisée par des tiers. Les utilisateurs sont responsables du caractère exact, approprié et
            licite des informations qu’ils choisissent de rendre publiques.
          </P>
        </Section>

        <Section id="donnees-clients" n={10} title="Données clients et communications envoyées via ReachDem">
          <P>
            Lorsque des clients utilisent ReachDem pour gérer des contacts, des segments, des campagnes,
            le suivi de liens ou des workflows de communication, ReachDem traite ces données
            personnelles pour leur compte. Dans ce cas, le client est généralement responsable du
            traitement et ReachDem agit comme sous-traitant ou prestataire de services.
          </P>
          <P>
            Les clients sont responsables de s’assurer qu’ils disposent des droits, des mentions
            d’information et de la base légale nécessaires pour collecter, importer, utiliser et
            contacter leurs destinataires via les services, y compris du respect des lois applicables
            sur la protection des données, des règles anti-spam, des règles relatives aux
            télécommunications, des politiques des plateformes de messagerie et des obligations de
            désinscription.
          </P>
          <P>
            ReachDem ne détermine pas de manière indépendante les destinataires visés par les campagnes
            d’un client, ni la licéité de sa prospection. Nous nous réservons toutefois le droit
            d’enquêter, de suspendre ou de restreindre toute activité qui apparaîtrait illicite, abusive,
            trompeuse, frauduleuse ou incompatible avec nos conditions ou nos règles de plateforme.
          </P>
        </Section>

        <Section id="partage" n={11} title="Partage des données et sous-traitants">
          <P>
            Nous pouvons partager des données personnelles avec des prestataires, sous-traitants et
            partenaires qui nous aident à exploiter les services. Il peut s’agir de prestataires
            d’hébergement, d’infrastructure cloud, de stockage, d’authentification, d’analyse, de
            supervision, de traitement des paiements, d’outils de support client, d’infrastructure
            d’acheminement des communications, de services de sécurité, d’infrastructure d’IA et d’outils
            opérationnels associés.
          </P>
          <P>
            Nous pouvons également partager des données avec des opérateurs de communication et de
            livraison lorsqu’il est nécessaire d’acheminer ou d’envoyer des communications SMS, e-mail,
            WhatsApp ou via d’autres canaux pris en charge, ainsi qu’avec des partenaires d’intégration
            lorsque l’utilisateur ou le client a choisi de connecter des services tiers à la plateforme.
          </P>
          <P>
            Les données personnelles peuvent être partagées en interne avec du personnel autorisé et, au
            sein d’un espace de travail client, avec les propriétaires de compte, administrateurs,
            membres d’équipe ou collaborateurs, selon les permissions et les rôles applicables.
          </P>
          <P>
            Nous pouvons communiquer des données personnelles lorsqu’il est nécessaire de respecter la
            loi, une réglementation, une procédure judiciaire ou une demande légitime des autorités
            publiques, de protéger nos droits, d’enquêter sur des soupçons de fraude ou d’abus, de faire
            respecter nos accords ou de répondre à un incident de sécurité.
          </P>
          <P>
            Si ReachDem prend part à une fusion, une acquisition, une réorganisation, une cession
            d’actifs, une opération de financement ou un événement similaire, des données personnelles
            peuvent être communiquées ou transférées dans le cadre de cette opération, sous réserve des
            garanties et des exigences légales applicables.
          </P>
          <P>
            Nous ne vendons pas de données personnelles au sens d’un échange contre une contrepartie
            financière. Nous ne partageons pas non plus de données personnelles à des fins de publicité
            comportementale de tiers, sauf mention contraire indiquée et autorisée par la loi.
          </P>
        </Section>

        <Section id="transferts" n={12} title="Transferts internationaux">
          <P>
            Parce que ReachDem opère en ligne et peut recourir à des prestataires situés dans plusieurs
            pays, des données personnelles peuvent être traitées, stockées ou consultées en dehors du
            pays dans lequel elles ont été collectées. Ces transferts peuvent concerner des juridictions
            qui n’offrent pas le même niveau de protection légale que le pays d’origine.
          </P>
          <P>
            Lorsque la loi l’exige, nous mettons en œuvre des garanties appropriées pour ces transferts,
            qui peuvent inclure des protections contractuelles, des procédures d’examen interne et
            d’autres mécanismes de transfert reconnus par la loi.
          </P>
        </Section>

        <Section id="conservation" n={13} title="Durées de conservation">
          <P>
            Nous conservons les données personnelles pendant la durée nécessaire à la fourniture des
            services, à l’exécution de nos obligations contractuelles, à la tenue de nos registres
            d’activité légitimes, au respect de nos obligations légales, à la résolution de litiges, à
            l’exécution de nos accords et à la protection de la sécurité et de l’intégrité de la
            plateforme.
          </P>
          <P>
            Les durées de conservation peuvent varier selon la nature des données, la finalité de leur
            collecte, les instructions du client, les contraintes techniques et les obligations légales.
            Lorsque les données personnelles ne sont plus nécessaires, nous les supprimons, les
            anonymisons ou les isolons de manière sécurisée, sauf si leur conservation continue est
            requise ou autorisée par la loi.
          </P>
          <P>
            Des copies de sauvegarde et des enregistrements archivés peuvent subsister pendant une durée
            limitée après suppression, dans le cadre normal de nos processus de continuité d’activité et
            de reprise après sinistre.
          </P>
        </Section>

        <Section id="securite" n={14} title="Sécurité des données">
          <P>
            Nous mettons en œuvre des mesures techniques, organisationnelles et administratives
            raisonnables destinées à protéger les données personnelles contre l’accès, l’utilisation, la
            divulgation, la perte, la destruction ou l’altération non autorisés. Ces mesures peuvent
            inclure des contrôles d’accès, des dispositifs d’authentification, le chiffrement en transit,
            la protection des environnements, la journalisation, la supervision, des procédures de
            réponse aux incidents, la gestion des permissions internes et la surveillance de nos
            prestataires.
          </P>
          <P>
            Malgré nos efforts pour protéger les données personnelles au moyen de garanties
            commercialement raisonnables, aucune méthode de transmission ou de stockage n’est totalement
            sûre. Nous ne pouvons donc pas garantir une sécurité absolue. Les utilisateurs sont
            responsables de la confidentialité de leurs identifiants et doivent nous prévenir sans délai
            s’ils soupçonnent un accès non autorisé ou un usage abusif.
          </P>
        </Section>

        <Section id="droits" n={15} title="Vos droits et vos choix">
          <P>
            Selon votre lieu de résidence et les lois qui vous sont applicables, vous pouvez disposer du
            droit de demander l’accès à vos données personnelles, de demander la rectification de
            données inexactes ou incomplètes, de demander leur suppression, de vous opposer à certains
            traitements ou d’en demander la limitation, de retirer votre consentement lorsque le
            traitement repose sur celui-ci, ou de demander la portabilité de certaines données.
          </P>
          <P>
            Lorsque ReachDem traite des données personnelles pour le compte d’un client, les demandes
            relatives à ces données doivent en principe être adressées à ce client, qui contrôle le
            traitement. Lorsque ReachDem agit comme responsable du traitement, vous pouvez nous adresser
            vos demandes directement à l’aide des coordonnées indiquées ci-dessous.
          </P>
          <P>
            Nous pouvons demander les informations nécessaires à la vérification de votre identité avant
            de traiter une demande relative à la protection des données. Nous pouvons également refuser
            ou limiter certaines demandes lorsque la loi le permet, notamment lorsqu’une demande est
            manifestement infondée, excessive, incompatible avec nos obligations légales ou porte
            atteinte aux droits d’autrui.
          </P>
          <P>
            Pour exercer vos droits, écrivez-nous à{' '}
            <a href="mailto:support@reachdem.cc" className="underline hover:text-neutral-900">
              support@reachdem.cc
            </a>
            .
          </P>
        </Section>

        <Section id="marketing" n={16} title="Communications marketing">
          <P>
            Lorsque la loi le permet, nous pouvons envoyer des newsletters, des annonces produit, des
            informations sur des événements, des contenus promotionnels ou d’autres communications
            marketing. Vous pouvez vous désinscrire des e-mails marketing en utilisant le lien de
            désinscription présent dans ces messages ou en nous contactant directement.
          </P>
          <P>
            Même en cas de désinscription des communications marketing, nous pouvons continuer à envoyer
            des communications transactionnelles ou liées au service, notamment des notifications
            relatives à votre compte, votre abonnement, la facturation, le support, la sécurité, les
            mises à jour légales ou les évolutions des services.
          </P>
        </Section>

        <Section id="mineurs" n={17} title="Données des mineurs">
          <P>
            Les services sont destinés à un usage professionnel, entrepreneurial, organisationnel ou
            commercial et ne s’adressent pas aux enfants. Nous ne collectons pas sciemment de données
            personnelles auprès d’enfants d’une manière qui exigerait le consentement parental au titre
            de la loi applicable.
          </P>
          <P>
            Si vous pensez que des données personnelles concernant un enfant nous ont été communiquées
            de manière illicite, contactez-nous afin que nous puissions examiner la situation et prendre
            les mesures appropriées.
          </P>
        </Section>

        <Section id="services-tiers" n={18} title="Services tiers">
          <P>
            Notre site et nos services peuvent contenir des liens vers des sites, produits, services de
            paiement, canaux de communication, formulaires ou plateformes externes. Nous ne sommes pas
            responsables des pratiques de confidentialité, de sécurité ou de traitement des données de
            ces tiers. Vos interactions avec ces services sont régies par leurs propres conditions et
            politiques de confidentialité.
          </P>
        </Section>

        <Section id="ia" n={19} title="Fonctionnalités d’IA">
          <P>
            ReachDem peut proposer des fonctionnalités assistées par IA ou automatisées destinées à
            aider les utilisateurs à rédiger des messages, suggérer des contenus, personnaliser des
            campagnes, recommander des actions ou produire des analyses prédictives. Ces fonctionnalités
            peuvent s’appuyer sur les données fournies par l’utilisateur, le contexte de campagne, les
            indicateurs de performance historiques ou d’autres données opérationnelles.
          </P>
          <P>
            Les résultats générés par IA peuvent ne pas être exacts, complets ou adaptés à chaque
            contexte. Les utilisateurs restent responsables de la relecture et de la validation de ces
            résultats avant de s’y fier dans des communications, des décisions stratégiques ou des
            processus soumis à des exigences de conformité.
          </P>
          <P>
            Sauf mention contraire expresse dans un accord distinct ou une notice produit, les données
            des clients ne sont pas utilisées pour entraîner des modèles d’IA générative publics d’une
            manière qui rendrait ces données publiquement attribuables au client.
          </P>
        </Section>

        <Section id="regional" n={20} title="Dispositions régionales">
          <P>
            Selon votre lieu de résidence, des droits ou des informations complémentaires peuvent
            s’appliquer. Si vous résidez dans l’Espace économique européen, au Royaume-Uni ou dans une
            autre juridiction offrant des protections comparables, vous pouvez disposer de droits au
            titre des lois applicables sur la protection des données, sous réserve des limitations et
            conditions locales.
          </P>
          <P>
            Si vous résidez dans un État des États-Unis doté d’une législation spécifique en matière de
            vie privée, vous pouvez également disposer de certains droits d’accès, de rectification, de
            suppression, de portabilité et d’opposition, lorsque ces droits s’appliquent. Nous
            respecterons ces droits dans la mesure exigée par la loi applicable.
          </P>
        </Section>

        <Section id="modifications" n={21} title="Modifications de cette politique">
          <P>
            Nous pouvons mettre à jour cette politique de confidentialité afin de refléter des
            évolutions de nos services, de nos pratiques, de nos technologies, de nos obligations
            légales ou de nos exigences de conformité. Dans ce cas, nous modifions la date de « dernière
            mise à jour » en haut de cette page et pouvons fournir une information complémentaire
            lorsque la loi l’exige ou lorsque les changements sont importants.
          </P>
          <P>
            La poursuite de l’utilisation des services après l’entrée en vigueur d’une version mise à
            jour vaut reconnaissance de la politique révisée, dans la mesure permise par la loi.
          </P>
        </Section>

        <Section id="contact" n={22} title="Nous contacter">
          <P>
            Pour toute question, préoccupation ou demande relative à cette politique de confidentialité
            ou à nos pratiques en matière de données, vous pouvez nous contacter :
          </P>
          <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50/60 p-5 text-[15px] leading-7 text-neutral-700">
            <p className="font-semibold text-neutral-900">
              <Placeholder>raison sociale exacte</Placeholder>
            </p>
            <p>
              <Placeholder>adresse complète du siège social</Placeholder>
            </p>
            <p className="mt-2 font-mono text-sm">
              <a href="mailto:support@reachdem.cc" className="underline hover:text-neutral-900">
                support@reachdem.cc
              </a>
            </p>
          </div>
        </Section>
      </div>

      <footer className="mt-14 border-t border-neutral-200 pt-8">
        <nav aria-label="Autres documents légaux" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/terms" className="text-neutral-700 underline-offset-4 hover:underline">
            Conditions d’utilisation
          </Link>
          <Link href="/" className="text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline">
            Retour à l’accueil
          </Link>
        </nav>
        <p className="mt-6 font-mono text-[11px] text-neutral-400">
          ReachDem · Politique de confidentialité · dernière mise à jour le {LAST_UPDATED}
        </p>
      </footer>
    </main>
  )
}
