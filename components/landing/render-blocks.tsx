import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { HeroBento, HeroPanels } from './heroes'

/**
 * Le rendu des blocs Payload.
 *
 * Chaque bloc du CMS a exactement un composant ici, et ces composants
 * n'utilisent que les tokens du site (`text-ink`, `bg-surface-2`, `border-line`,
 * `bg-brand-soft`…). C'est la règle qui empêche le CMS de réintroduire une
 * deuxième identité visuelle : un bloc ne choisit pas ses couleurs, il hérite.
 *
 * Volontairement sans animation ni image plein écran pour l'instant : on veut
 * une base lisible qu'on remplace section par section, pas un thème.
 */

type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
  tag?: string
}

/** Les réponses de FAQ sont du rich text : on en extrait le texte, paragraphe par paragraphe. */
function lexicalToParagraphs(node: LexicalNode | undefined): string[] {
  if (!node) return []
  const blocks: string[] = []

  const walk = (current: LexicalNode) => {
    if (typeof current.text === 'string' && current.text.length > 0) {
      blocks.push(current.text)
    }
    if (current.type === 'paragraph' || current.type === 'heading') {
      blocks.push('\n')
    }
    current.children?.forEach(walk)
  }

  walk(node)

  return blocks
    .join('')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

type Action = { label?: string | null; href?: string | null; variant?: string | null }

function Actions({ actions }: { actions?: Action[] | null }) {
  if (!actions?.length) return null

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {actions.map((action, index) =>
        action?.label && action?.href ? (
          <Button
            key={`${action.href}-${index}`}
            asChild
            size="lg"
            variant={action.variant === 'outline' ? 'outline' : 'default'}
            className="h-11 rounded-full px-5"
          >
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : null,
      )}
    </div>
  )
}

// biome-ignore lint/suspicious/noExplicitAny: les blocs viennent de payload-types, pas encore générés pour la home
type Block = Record<string, any>

function Hero({ block }: { block: Block }) {
  const props = {
    eyebrow: block.eyebrow,
    title: block.title,
    subtitle: block.subtitle,
    actions: block.actions,
  }

  if (block.design === 'bento') return <HeroBento {...props} />
  if (block.design === 'panels') return <HeroPanels {...props} />

  const imageUrl = typeof block.image === 'object' ? block.image?.url : undefined

  return (
    <section className="border-line border-b px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {block.eyebrow && (
            <p className="text-ink-soft text-[11px] font-medium tracking-[0.14em] uppercase">
              {block.eyebrow}
            </p>
          )}
          <h1 className="text-ink mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {block.title}
          </h1>
          {block.subtitle && (
            <p className="text-ink-soft mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
              {block.subtitle}
            </p>
          )}
          <Actions actions={block.actions} />
        </div>

        {imageUrl && (
          <div className="border-line bg-surface-2 overflow-hidden rounded-2xl border">
            {/* eslint-disable-next-line @next/next/no-img-element -- média Payload, dimensions inconnues */}
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}

function Features({ block }: { block: Block }) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          {block.eyebrow && (
            <p className="text-ink-soft text-[11px] font-medium tracking-[0.14em] uppercase">
              {block.eyebrow}
            </p>
          )}
          <h2 className="text-ink mt-3 text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
            {block.title}
          </h2>
          {block.description && (
            <p className="text-ink-soft mt-4 text-base leading-relaxed">{block.description}</p>
          )}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(block.items ?? []).map((item: Block, index: number) => (
            <div key={`${item.title}-${index}`}>
              <h3 className="text-ink flex items-center gap-2 text-base font-medium">
                {item.title}
                {item.badge && (
                  <span className="bg-brand-soft text-brand-strong rounded-full px-1.5 py-px text-[10px] font-medium">
                    {item.badge}
                  </span>
                )}
              </h3>
              {item.description && (
                <p className="text-ink-soft mt-2 text-sm leading-relaxed">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Logos({ block }: { block: Block }) {
  return (
    <section className="border-line border-y px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-4">
        {block.title && <p className="text-ink-soft text-xs">{block.title}</p>}
        {(block.items ?? []).map((item: Block, index: number) => (
          <span key={`${item.name}-${index}`} className="text-ink-soft text-sm font-medium">
            {item.name}
          </span>
        ))}
      </div>
    </section>
  )
}

function Process({ block }: { block: Block }) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-ink text-3xl font-medium tracking-[-0.01em] sm:text-4xl">{block.title}</h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-3">
          {(block.steps ?? []).map((step: Block, index: number) => (
            <li key={`${step.title}-${index}`}>
              <span className="text-ink-soft text-[11px] font-medium tracking-[0.14em]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-ink mt-2 text-base font-medium">{step.title}</h3>
              {step.description && (
                <p className="text-ink-soft mt-2 text-sm leading-relaxed">{step.description}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Faq({ block }: { block: Block }) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {block.title && (
          <h2 className="text-ink text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
            {block.title}
          </h2>
        )}
        <dl className="border-line mt-10 border-t">
          {(block.items ?? []).map((item: Block, index: number) => (
            <div key={`${item.question}-${index}`} className="border-line border-b py-5">
              <dt className="text-ink text-base font-medium">{item.question}</dt>
              <dd className="text-ink-soft mt-2 text-sm leading-relaxed">
                {lexicalToParagraphs(item.answer?.root).map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Cta({ block }: { block: Block }) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="border-line bg-surface-2 mx-auto max-w-4xl rounded-2xl border px-6 py-14 text-center sm:px-12">
        <h2 className="text-ink text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
          {block.title}
        </h2>
        {block.description && (
          <p className="text-ink-soft mx-auto mt-4 max-w-xl text-base leading-relaxed">
            {block.description}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {block.label && block.href && (
            <Button asChild size="lg" className="h-11 rounded-full px-5">
              <Link href={block.href}>{block.label}</Link>
            </Button>
          )}
          {block.secondaryLabel && block.secondaryHref && (
            <Button asChild size="lg" variant="outline" className="h-11 rounded-full px-5">
              <Link href={block.secondaryHref}>{block.secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

function RichText({ block }: { block: Block }) {
  const paragraphs = lexicalToParagraphs(block.content?.root)
  if (!paragraphs.length) return null

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="text-ink-soft mx-auto max-w-3xl space-y-4 text-base leading-relaxed">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}

const RENDERERS: Record<string, (props: { block: Block }) => React.ReactElement | null> = {
  hero: Hero,
  features: Features,
  logos: Logos,
  process: Process,
  faq: Faq,
  cta: Cta,
  richText: RichText,
}

export function RenderBlocks({ blocks }: { blocks?: Block[] | null }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Renderer = RENDERERS[block?.blockType as string]
        if (!Renderer) return null
        return <Renderer key={`${block.blockType}-${index}`} block={block} />
      })}
    </>
  )
}
