import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conditions d’utilisation — ReachDem',
  description:
    'Les règles d’usage de la plateforme ReachDem : compte, usage acceptable, données clients, campagnes et messagerie, résiliation, responsabilité et droit applicable.',
  alternates: { canonical: '/terms' },
}

const EFFECTIVE_DATE = '12 mars 2026'
const LAST_UPDATED = '12 mars 2026'

const TOC = [
  { id: 'objet', title: 'Objet du service et acceptation' },
  { id: 'editeur', title: 'Éditeur du service' },
  { id: 'eligibilite', title: 'Éligibilité et usage acceptable' },
  { id: 'compte', title: 'Compte et espace de travail' },
  { id: 'donnees-clients', title: 'Données clients' },
  { id: 'campagnes', title: 'Campagnes et conformité de la messagerie' },
  { id: 'pages-publiques', title: 'Pages publiques, liens et profils' },
  { id: 'api', title: 'API, intégrations et usage développeur' },
  { id: 'ia', title: 'Fonctionnalités d’IA' },
  { id: 'facturation', title: 'Tarifs, facturation et abonnements' },
  { id: 'essais', title: 'Essais, fonctionnalités bêta et accès anticipé' },
  { id: 'propriete-intellectuelle', title: 'Propriété intellectuelle' },
  { id: 'propriete-donnees', title: 'Propriété des données clients et retours' },
  { id: 'confidentialite-donnees', title: 'Vie privée et protection des données' },
  { id: 'informations-confidentielles', title: 'Informations confidentielles' },
  { id: 'disponibilite', title: 'Disponibilité et évolution du service' },
  { id: 'services-tiers', title: 'Services tiers' },
  { id: 'resiliation', title: 'Suspension et résiliation' },
  { id: 'garanties', title: 'Exclusion de garanties' },
  { id: 'responsabilite', title: 'Limitation de responsabilité' },
  { id: 'indemnisation', title: 'Indemnisation' },
  { id: 'droit-applicable', title: 'Droit applicable et litiges' },
  { id: 'export', title: 'Contrôle des exportations et sanctions' },
  { id: 'integralite', title: 'Intégralité de l’accord' },
  { id: 'divisibilite', title: 'Divisibilité et renonciation' },
  { id: 'cession', title: 'Cession' },
  { id: 'modifications', title: 'Modifications des conditions' },
  { id: 'contact', title: 'Contact' },
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

export default function TermsPage() {
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
          Conditions d’utilisation
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600">
          Les présentes conditions régissent votre accès au site, à la plateforme et aux services
          ReachDem, y compris Links by ReachDem. En utilisant les services, vous acceptez d’être lié par
          ces conditions.
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
        <Section id="objet" n={1} title="Objet du service et acceptation">
          <P>
            ReachDem fournit une plateforme logicielle et des outils associés conçus pour aider les
            entreprises, les professionnels, les entrepreneurs et les organisations à gérer leur
            communication, leurs contacts, la segmentation de leurs audiences, leurs campagnes, leurs
            liens, leur analytique, leurs pages de profil publiques, leurs expériences d’identité
            numérique et les workflows associés, sur les canaux pris en charge.
          </P>
          <P>
            Selon les fonctionnalités activées, les services peuvent inclure la gestion des comptes et
            des espaces de travail, les contacts et les groupes, la segmentation dynamique, la création
            et l’acheminement de campagnes, le raccourcissement et le suivi de liens, les pages de
            profil ou de liens publiques, les cartes de visite numériques, l’analytique, les API, les
            intégrations, les automatisations et les fonctionnalités assistées par IA.
          </P>
          <P>
            En accédant au site, en naviguant sur celui-ci, en vous inscrivant ou en utilisant les
            services, vous acceptez d’être lié par les présentes conditions. Si vous n’acceptez pas ces
            conditions, vous ne devez pas accéder aux services ni les utiliser.
          </P>
          <P>
            Si vous utilisez les services pour le compte d’une société, d’une organisation, d’une agence
            ou de toute autre personne morale, vous déclarez et garantissez être habilité à engager cette
            entité par les présentes conditions, auquel cas « vous » désigne également cette entité.
          </P>
        </Section>

        <Section id="editeur" n={2} title="Éditeur du service">
          <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-5">
            <dl className="space-y-2 text-[15px] leading-7">
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
              renseignées ici avant la mise en ligne publique de ces conditions.
            </p>
          </div>
        </Section>

        <Section id="eligibilite" n={3} title="Éligibilité et usage acceptable">
          <P>
            Vous ne pouvez utiliser les services que si vous êtes juridiquement capable de conclure un
            accord contraignant et si vous y êtes autorisé par la loi applicable. Les services sont
            principalement destinés à un usage professionnel, commercial, entrepreneurial et
            organisationnel.
          </P>
          <P>
            Vous acceptez d’utiliser les services conformément aux présentes conditions et à l’ensemble
            des lois, règlements, politiques de plateformes, règles professionnelles, règles de
            communication, lois anti-spam, lois sur la protection des données, exigences en matière de
            télécommunications et exigences de tiers applicables à votre usage.
          </P>
          <P>Il est notamment interdit d’utiliser les services à des fins :</P>
          <UL>
            <li>illicites, trompeuses, frauduleuses, abusives, harcelantes, diffamatoires, discriminatoires ou portant atteinte aux droits d’autrui ;</li>
            <li>de diffusion de logiciels malveillants, de contenus d’hameçonnage, de messages en masse non sollicités, d’arnaques, de promotions illégales ou de code nuisible ;</li>
            <li>portant atteinte à l’intégrité, à la disponibilité ou à la réputation des services.</li>
          </UL>
          <P>
            Vous ne devez pas non plus tenter d’accéder sans autorisation aux services, procéder à
            l’ingénierie inverse des parties restreintes de la plateforme sauf lorsque la loi l’autorise
            expressément, perturber le fonctionnement des services, contourner les limitations d’usage ou
            utiliser les services d’une manière qui impose une charge ou un risque déraisonnable à nos
            systèmes ou à ceux de nos partenaires.
          </P>
        </Section>

        <Section id="compte" n={4} title="Compte et espace de travail">
          <P>
            Pour accéder à certaines fonctionnalités, vous pouvez être amené à créer un compte ou à être
            invité dans un espace de travail. Vous acceptez de fournir des informations exactes,
            complètes et à jour, et de maintenir ces informations actualisées.
          </P>
          <P>
            Vous êtes responsable de la confidentialité de vos identifiants de connexion et de toutes
            les activités effectuées sous votre compte ou au sein de votre espace de travail, que ces
            activités soient ou non autorisées par vous. Si vous estimez que votre compte a été compromis
            ou utilisé sans autorisation, vous devez nous en informer sans délai à{' '}
            <a href="mailto:support@reachdem.cc" className="underline hover:text-neutral-900">
              support@reachdem.cc
            </a>
            .
          </P>
          <P>
            Si vous créez ou administrez un espace de travail, vous êtes responsable de la gestion des
            utilisateurs, des permissions, des rôles, des configurations, des contenus et des données
            clients associés à cet espace. Les propriétaires et administrateurs d’espaces de travail
            sont responsables du respect des présentes conditions par les membres de leur équipe et leurs
            collaborateurs.
          </P>
        </Section>

        <Section id="donnees-clients" n={5} title="Données clients">
          <P>
            Entre ReachDem et vous, vous conservez la responsabilité des données, contenus, fiches de
            contact, messages, liens, médias, formulaires, campagnes, champs personnalisés et autres
            éléments que vous importez, soumettez, synchronisez, créez, envoyez ou traitez autrement via
            les services (les « données clients »).
          </P>
          <P>
            Vous déclarez et garantissez disposer de tous les droits, permissions et bases légales
            nécessaires pour collecter, utiliser, importer, stocker, traiter, partager et transmettre les
            données clients via les services, y compris pour les communications envoyées à vos contacts,
            prospects, abonnés ou autres destinataires.
          </P>
          <P>
            Vous êtes seul responsable de l’exactitude, de la qualité, de la licéité, de l’intégrité et du
            caractère approprié des données clients, ainsi que des moyens par lesquels vous les avez
            obtenues. ReachDem ne vérifie pas de manière indépendante si vos données clients ont été
            collectées licitement, si les destinataires ont consenti à être contactés ou si vos campagnes
            respectent la loi applicable.
          </P>
          <P>
            Nous pouvons traiter les données clients dans la mesure nécessaire à la fourniture des
            services, au maintien de la sécurité, au respect de la loi, à l’application des présentes
            conditions et à l’exécution de nos obligations contractuelles, comme décrit dans notre
            politique de confidentialité et dans tout accord de traitement des données applicable.
          </P>
        </Section>

        <Section id="campagnes" n={6} title="Campagnes et conformité de la messagerie">
          <P>
            Si vous utilisez ReachDem pour créer, acheminer, envoyer, planifier, gérer ou analyser des
            communications, vous êtes seul responsable de la conformité de ces communications avec
            l’ensemble des lois et règles de plateformes applicables. Cela inclut les règles relatives au
            consentement, aux exigences d’opt-in, à la gestion des abonnements, à l’identification de
            l’expéditeur, au contenu des messages, aux promotions, aux réglementations des
            télécommunications, à la protection des consommateurs, à la vie privée et aux obligations
            anti-spam.
          </P>
          <P>
            Vous ne devez pas utiliser les services pour envoyer des communications non sollicitées ou
            illicites, notamment du spam, des prospections abusives, des messages commerciaux trompeurs ou
            des contenus portant atteinte aux droits des destinataires ou aux règles des plateformes
            tierces.
          </P>
          <P>
            Vous êtes responsable du traitement des demandes de désinscription, des instructions
            d’opposition, des préférences de non-contact et des obligations de suppression, ainsi que de
            la licéité de la constitution, de la mise à jour et de l’usage de vos listes de
            destinataires.
          </P>
          <P>
            Lorsque vous utilisez un canal opéré par un tiers — notamment WhatsApp via la plateforme
            WhatsApp Business de Meta — vous vous engagez à respecter les conditions et politiques de ce
            tiers, à obtenir le consentement préalable des destinataires, à n’utiliser que des modèles de
            messages approuvés lorsque la plateforme l’exige, et à ne pas contourner les limitations ou
            les mécanismes de qualité imposés par ce tiers. Un manquement de votre part à ces règles peut
            entraîner la suspension du canal concerné par le tiers, indépendamment de ReachDem.
          </P>
          <P>
            ReachDem se réserve le droit de surveiller les indicateurs d’abus, d’appliquer les
            limitations d’usage, de suspendre une activité de messagerie, de retirer des contenus
            interdits ou de restreindre l’accès lorsque cela est nécessaire pour protéger les services,
            nos partenaires, les destinataires ou les autres utilisateurs.
          </P>
        </Section>

        <Section id="pages-publiques" n={7} title="Pages publiques, liens et profils">
          <P>
            Certaines fonctionnalités des services, dont Links by ReachDem, peuvent vous permettre de
            créer des pages publiques, des liens courts, des pages de profil numérique, des pages de type
            bio, des pages de formulaire et d’autres expériences de contenu public.
          </P>
          <P>
            Vous êtes seul responsable de l’ensemble des informations, liens, textes, médias,
            informations sur l’activité, coordonnées, contenus promotionnels, formulaires et autres
            éléments que vous publiez ou rendez accessibles publiquement via ces fonctionnalités. Vous
            reconnaissez que tout contenu que vous choisissez de rendre public peut être consulté, copié,
            indexé, partagé ou réutilisé par des tiers.
          </P>
          <P>
            ReachDem peut retirer ou restreindre tout contenu public qui enfreindrait les présentes
            conditions, la loi applicable, les droits de tiers ou les règles d’intégrité de la
            plateforme.
          </P>
        </Section>

        <Section id="api" n={8} title="API, intégrations et usage développeur">
          <P>
            Si ReachDem met à disposition des API, des webhooks, des outils pour développeurs ou des
            capacités d’intégration, votre usage de ces fonctionnalités doit respecter les présentes
            conditions ainsi que toute documentation technique, limite d’usage ou politique
            complémentaire que nous pourrions publier.
          </P>
          <P>
            Vous ne devez pas détourner l’usage de l’API, dépasser les limites de requêtes raisonnables,
            accéder à des données non autorisées, perturber la stabilité du service ou utiliser l’API
            d’une manière qui compromet la sécurité, la vie privée ou les performances de la plateforme.
            Nous pouvons suspendre ou restreindre l’accès à l’API à tout moment pour prévenir les abus,
            faire respecter les limites ou protéger les services.
          </P>
          <P>
            Vous êtes responsable de la sécurité, de la licéité et de la fiabilité des applications,
            automatisations ou intégrations que vous développez ou connectez aux services.
          </P>
        </Section>

        <Section id="ia" n={9} title="Fonctionnalités d’IA">
          <P>
            ReachDem peut proposer des fonctionnalités assistées par IA ou automatisées, notamment des
            suggestions de contenu, une aide à la personnalisation, une assistance à la rédaction de
            messages, des analyses prédictives, des recommandations d’optimisation, des améliorations de
            workflow ou des fonctionnalités similaires.
          </P>
          <P>
            Ces fonctionnalités sont fournies à titre de commodité et d’assistance opérationnelle
            uniquement. Les résultats générés par IA peuvent être incomplets, inexacts, inadaptés,
            biaisés ou contextuellement erronés. Vous restez pleinement responsable de la relecture, de la
            validation, de la modification et de l’approbation de tout résultat généré par IA avant de
            l’utiliser dans des campagnes, des communications, des workflows ou des décisions métier.
          </P>
          <P>
            Vous ne devez pas utiliser les fonctionnalités d’IA d’une manière qui enfreint la loi, porte
            atteinte à des droits ou crée un profilage illicite, des pratiques trompeuses ou des résultats
            automatisés préjudiciables.
          </P>
        </Section>

        <Section id="facturation" n={10} title="Tarifs, facturation et abonnements">
          <P>
            Certaines parties des services peuvent être proposées à titre payant, notamment des
            abonnements, une tarification à l’usage, des fonctionnalités premium, des modules
            complémentaires, des crédits de messagerie ou des offres entreprise. En achetant ou en
            souscrivant à des services payants, vous acceptez de payer l’ensemble des frais, charges,
            taxes et montants dus au titre de l’offre ou de la grille tarifaire en vigueur au moment de
            l’achat.
          </P>
          <P>
            Sauf mention écrite contraire, les frais ne sont pas remboursables, sauf lorsque la loi
            l’exige. Les abonnements peuvent se renouveler automatiquement sauf résiliation avant la date
            de renouvellement applicable. Vous nous autorisez, ainsi que nos prestataires de paiement
            tiers, à débiter le moyen de paiement enregistré pour les frais récurrents, les consommations,
            les dépassements, les taxes et les autres montants applicables.
          </P>
          <P>
            Si un paiement ne peut pas être effectué, nous pouvons suspendre ou restreindre l’accès aux
            fonctionnalités payantes jusqu’au règlement des montants dus. Nous nous réservons le droit de
            modifier les tarifs, le découpage des offres, la disponibilité des fonctionnalités ou la
            structure de facturation à tout moment, étant entendu que les changements importants
            s’appliquent de manière prospective.
          </P>
        </Section>

        <Section id="essais" n={11} title="Essais, fonctionnalités bêta et accès anticipé">
          <P>
            Nous pouvons proposer des essais gratuits, des programmes pilotes, des fonctionnalités bêta,
            des outils expérimentaux ou des accès anticipés. Ces fonctionnalités peuvent être modifiées,
            limitées, interrompues ou supprimées à tout moment, sans engager notre responsabilité.
          </P>
          <P>
            Les fonctionnalités bêta ou en accès anticipé sont fournies « en l’état » et peuvent contenir
            des défauts, des erreurs, des limitations ou bénéficier d’un support réduit. Nous ne nous
            engageons pas à ce que ces fonctionnalités soient un jour disponibles de manière générale ni
            qu’elles restent disponibles sous leur forme actuelle.
          </P>
        </Section>

        <Section id="propriete-intellectuelle" n={12} title="Propriété intellectuelle">
          <P>
            Les services, y compris l’ensemble des logiciels, codes, designs, interfaces, workflows,
            marques, logos, éléments de marque, graphismes, textes, documentations, structures
            analytiques et supports associés fournis par ReachDem, sont la propriété de ReachDem ou lui
            sont concédés sous licence, et sont protégés par les lois relatives à la propriété
            intellectuelle.
          </P>
          <P>
            Sous réserve du respect des présentes conditions, nous vous accordons un droit limité, non
            exclusif, non transférable et non sous-licenciable d’accéder aux services et de les utiliser
            pour vos besoins internes ou à des fins commerciales autorisées, pendant la période
            d’abonnement ou d’accès applicable.
          </P>
          <P>
            Sauf autorisation expresse dans les présentes conditions, vous ne pouvez pas copier,
            modifier, distribuer, vendre, louer, sous-licencier, désassembler, décompiler, créer des
            œuvres dérivées ou exploiter autrement les services ou l’une de leurs parties sans notre
            consentement écrit préalable.
          </P>
          <P>
            « ReachDem », « Links by ReachDem » ainsi que les noms, marques, logos, noms de produits et
            éléments de marque associés sont nos marques ou celles de nos concédants. Vous ne pouvez pas
            les utiliser sans autorisation écrite préalable, sauf dans les cas permis par la loi.
          </P>
        </Section>

        <Section id="propriete-donnees" n={13} title="Propriété des données clients et retours">
          <P>
            Vous conservez la propriété de vos données clients, sous réserve des droits que vous nous
            accordez pour héberger, copier, traiter, transmettre, afficher, analyser et utiliser
            autrement ces données dans la mesure nécessaire à la fourniture, au support, à l’amélioration
            et à la sécurisation des services, ainsi qu’au respect de la loi et à l’application des
            présentes conditions.
          </P>
          <P>
            Si vous nous transmettez des suggestions, idées, demandes d’amélioration, commentaires ou
            autres retours relatifs aux services, vous acceptez que nous puissions les utiliser sans
            restriction ni rémunération, et sans obligation envers vous, à condition de ne pas identifier
            publiquement vos informations commerciales confidentielles dans cet usage.
          </P>
        </Section>

        <Section id="confidentialite-donnees" n={14} title="Vie privée et protection des données">
          <P>
            Notre collecte et notre utilisation des données personnelles sont décrites dans notre{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-neutral-900">
              politique de confidentialité
            </Link>
            . En utilisant les services, vous reconnaissez que des données personnelles peuvent être
            collectées, traitées et utilisées comme décrit dans ce document.
          </P>
          <P>
            Lorsque ReachDem traite des données personnelles pour votre compte en qualité de
            sous-traitant ou de prestataire de services, vous restez responsable de vous assurer que vous
            disposez d’une base légale appropriée et de l’ensemble des informations, consentements et
            autorisations requis pour les données personnelles que vous utilisez via les services.
          </P>
        </Section>

        <Section id="informations-confidentielles" n={15} title="Informations confidentielles">
          <P>
            Si vous recevez de ReachDem des informations non publiques relatives aux services, à la
            technologie, à la sécurité, aux opérations, à la feuille de route, aux tarifs ou à d’autres
            sujets confidentiels, vous acceptez de ne pas les divulguer ni les utiliser autrement que
            dans la mesure nécessaire à l’utilisation des services conformément aux présentes conditions.
          </P>
          <P>
            De la même manière, nous traiterons vos données clients non publiques comme confidentielles
            et ne les utiliserons que dans les limites permises par les présentes conditions, notre
            politique de confidentialité, les accords applicables et la loi.
          </P>
          <P>
            Les obligations de confidentialité ne s’appliquent pas aux informations qui sont ou
            deviennent publiques sans manquement, qui étaient déjà connues licitement, qui sont
            développées de manière indépendante sans utilisation abusive d’informations confidentielles,
            ou qui sont obtenues licitement auprès d’un tiers sans restriction de confidentialité.
          </P>
        </Section>

        <Section id="disponibilite" n={16} title="Disponibilité et évolution du service">
          <P>
            Nous pouvons modifier, améliorer, mettre à jour, suspendre ou interrompre toute partie des
            services à tout moment. Nous ne garantissons pas qu’une fonctionnalité, une intégration, un
            canal ou une capacité spécifique soit toujours disponible, ininterrompu ou exempt d’erreurs.
          </P>
          <P>
            Les services peuvent être indisponibles de temps à autre en raison d’opérations de
            maintenance, de mises à niveau, de pannes, de défaillances de tiers, de mesures de prévention
            des abus ou d’événements échappant à notre contrôle raisonnable. Nous mettons en œuvre des
            efforts commercialement raisonnables pour maintenir la continuité de service, sans garantir
            une disponibilité ininterrompue.
          </P>
          <P>
            Nous pouvons également imposer des limites techniques ou d’usage lorsque cela est nécessaire
            pour des raisons de sécurité, de stabilité, de conformité, de tarification ou d’exploitation.
          </P>
        </Section>

        <Section id="services-tiers" n={17} title="Services tiers">
          <P>
            Les services peuvent s’intégrer à des produits, plateformes, fournisseurs de messagerie,
            prestataires de paiement, fournisseurs d’infrastructure, sites externes, réseaux sociaux ou
            outils logiciels tiers, ou dépendre de ceux-ci. Votre usage des services tiers est régi par
            les conditions et les pratiques de confidentialité de ces tiers.
          </P>
          <P>
            ReachDem n’est pas responsable des services tiers, y compris de leur disponibilité, de leurs
            tarifs, de leur fonctionnement, de leurs politiques, de leurs interruptions ou de leurs
            pratiques en matière de données. Si un service tiers modifie, restreint, suspend ou cesse de
            prendre en charge une intégration ou un canal, nous pouvons être amenés à modifier ou à
            interrompre la fonctionnalité correspondante au sein de ReachDem.
          </P>
        </Section>

        <Section id="resiliation" n={18} title="Suspension et résiliation">
          <P>
            Nous pouvons suspendre, restreindre ou résilier votre accès à tout ou partie des services à
            tout moment, avec ou sans préavis, si nous estimons raisonnablement que vous avez enfreint les
            présentes conditions, créé un risque juridique ou de sécurité, manqué de payer les frais
            applicables, adopté un comportement abusif ou frauduleux, ou utilisé les services d’une
            manière susceptible de nuire à ReachDem, aux autres utilisateurs, aux tiers ou aux
            destinataires.
          </P>
          <P>
            Vous pouvez cesser d’utiliser les services à tout moment. Si vous êtes sur une offre payante,
            la résiliation ou l’annulation ne vous donne pas automatiquement droit à un remboursement,
            sauf si la loi l’exige ou si cela est expressément prévu.
          </P>
          <P>
            En cas de résiliation, votre droit d’utiliser les services prend fin. Nous pouvons supprimer
            ou désactiver l’accès aux données clients conformément à nos pratiques de conservation, à nos
            engagements contractuels, à nos obligations légales et à nos politiques techniques.
          </P>
          <P>
            Les dispositions des présentes conditions qui, par leur nature, doivent survivre à la
            résiliation continueront de s’appliquer, notamment celles relatives aux montants dus, à la
            propriété intellectuelle, aux exclusions de garanties, aux limitations de responsabilité, à
            l’indemnisation, à la confidentialité, au droit applicable et au règlement des litiges.
          </P>
        </Section>

        <Section id="garanties" n={19} title="Exclusion de garanties">
          <P>
            Dans toute la mesure permise par la loi, les services sont fournis « en l’état » et « selon
            disponibilité ». ReachDem exclut toute garantie, expresse, implicite, légale ou autre,
            notamment toute garantie implicite de qualité marchande, d’adéquation à un usage particulier,
            de titre, d’absence de contrefaçon, de jouissance paisible, ainsi que toute garantie que les
            services seront ininterrompus, sûrs, exacts, exempts d’erreurs ou adaptés à vos besoins
            particuliers.
          </P>
          <P>
            Nous ne garantissons pas que les campagnes seront livrées avec succès, que les messages
            atteindront leurs destinataires, que les destinataires interagiront avec les contenus, que les
            analyses seront exemptes d’erreurs, ni que les canaux tiers resteront disponibles ou
            inchangés.
          </P>
          <P>
            Aucun conseil ou information fourni par ReachDem, oralement ou par écrit, ne crée de garantie,
            sauf mention écrite expresse.
          </P>
        </Section>

        <Section id="responsabilite" n={20} title="Limitation de responsabilité">
          <P>
            Dans toute la mesure permise par la loi, ReachDem, ses sociétés affiliées, dirigeants,
            administrateurs, employés, prestataires, concédants et fournisseurs de services ne sauraient
            être tenus responsables des dommages indirects, accessoires, spéciaux, consécutifs, exemplaires
            ou punitifs, ni d’aucune perte de bénéfices, de revenus, de données, d’activité, de clientèle,
            d’usage ou d’autres pertes immatérielles, résultant des services ou des présentes conditions ou
            s’y rapportant, même s’ils ont été informés de la possibilité de tels dommages.
          </P>
          <P>
            Dans toute la mesure permise par la loi, la responsabilité globale de ReachDem pour l’ensemble
            des réclamations résultant des services ou des présentes conditions ou s’y rapportant ne
            pourra excéder le montant que vous avez payé à ReachDem pour les services au cours des douze
            (12) mois précédant l’événement à l’origine de la réclamation, ou cent dollars américains
            (100 USD) si vous n’avez versé aucun montant à ReachDem, le montant le plus élevé étant
            retenu.
          </P>
          <P>
            Certaines juridictions n’autorisent pas certaines exclusions ou limitations. En conséquence,
            certaines des dispositions ci-dessus peuvent ne pas s’appliquer à vous dans la mesure où elles
            sont interdites par la loi.
          </P>
        </Section>

        <Section id="indemnisation" n={21} title="Indemnisation">
          <P>
            Vous acceptez de défendre, d’indemniser et de dégager de toute responsabilité ReachDem, ses
            sociétés affiliées, dirigeants, administrateurs, employés, prestataires et mandataires, contre
            toute réclamation, responsabilité, dommage, perte, jugement, transaction, pénalité, amende,
            coût et dépense, y compris les honoraires d’avocat raisonnables, résultant de vos données
            clients, de votre usage des services, de vos communications ou campagnes, de votre violation
            des présentes conditions, de votre violation de la loi applicable ou de la violation des
            droits d’un tiers.
          </P>
        </Section>

        <Section id="droit-applicable" n={22} title="Droit applicable et litiges">
          <P>
            Les présentes conditions sont régies par le droit de l’État de Floride, sans égard aux
            principes de conflit de lois.
          </P>
          <P>
            Tout litige, réclamation ou différend découlant des présentes conditions ou des services, ou
            s’y rapportant, sera porté devant les juridictions étatiques ou fédérales situées à Miami,
            en Floride, et vous consentez à la compétence personnelle et au ressort de ces juridictions,
            sauf disposition contraire impérative de la loi applicable.
          </P>
        </Section>

        <Section id="export" n={23} title="Contrôle des exportations et sanctions">
          <P>
            Vous acceptez de ne pas accéder aux services ni les utiliser en violation des lois
            applicables en matière de contrôle des exportations, de sanctions ou de restrictions
            commerciales des États-Unis ou d’autres juridictions applicables. Vous déclarez que vous
            n’êtes pas situé dans, constitué selon les lois de, ou résidant habituellement dans un pays ou
            territoire soumis à des sanctions globales d’une manière qui interdirait l’accès aux services,
            et que vous ne figurez sur aucune liste de parties restreintes applicable.
          </P>
        </Section>

        <Section id="integralite" n={24} title="Intégralité de l’accord">
          <P>
            Les présentes conditions, ensemble avec notre politique de confidentialité et tout accord
            écrit complémentaire, bon de commande, conditions d’abonnement ou accord de traitement des
            données applicable à votre usage des services, constituent l’intégralité de l’accord entre
            vous et ReachDem concernant les services, et remplacent tout accord, communication ou
            compréhension antérieur ou contemporain relatif au même objet.
          </P>
        </Section>

        <Section id="divisibilite" n={25} title="Divisibilité et renonciation">
          <P>
            Si une disposition des présentes conditions est jugée invalide, illégale ou inapplicable, les
            autres dispositions resteront pleinement en vigueur. Le fait que ReachDem n’applique pas une
            disposition des présentes conditions ne constitue pas une renonciation à cette disposition ni
            à aucun autre droit.
          </P>
        </Section>

        <Section id="cession" n={26} title="Cession">
          <P>
            Vous ne pouvez pas céder ni transférer les présentes conditions, en tout ou partie, sans notre
            consentement écrit préalable. Nous pouvons céder ou transférer les présentes conditions, en
            tout ou partie, notamment dans le cadre d’une fusion, d’une acquisition, d’une réorganisation
            d’entreprise ou d’une cession d’actifs.
          </P>
        </Section>

        <Section id="modifications" n={27} title="Modifications des conditions">
          <P>
            Nous pouvons mettre à jour les présentes conditions afin de refléter des évolutions des
            services, de nos opérations, des exigences légales, des modèles tarifaires ou de nos besoins de
            conformité. En cas de modification, nous mettons à jour la date de « dernière mise à jour » en
            haut de cette page. Les changements importants peuvent également être communiqués via les
            services, par e-mail ou par tout autre moyen approprié.
          </P>
          <P>
            La poursuite de l’utilisation des services après l’entrée en vigueur de conditions mises à
            jour vaut acceptation des conditions révisées, dans la mesure permise par la loi.
          </P>
        </Section>

        <Section id="contact" n={28} title="Contact">
          <P>
            Pour toute question relative aux présentes conditions, vous pouvez nous contacter :
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
          <Link href="/privacy" className="text-neutral-700 underline-offset-4 hover:underline">
            Politique de confidentialité
          </Link>
          <Link href="/" className="text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline">
            Retour à l’accueil
          </Link>
        </nav>
        <p className="mt-6 font-mono text-[11px] text-neutral-400">
          ReachDem · Conditions d’utilisation · dernière mise à jour le {LAST_UPDATED}
        </p>
      </footer>
    </main>
  )
}
