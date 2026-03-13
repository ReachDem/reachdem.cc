import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type LegalDocumentProps = {
  title: string;
  description: string;
  children: string;
  aside?: ReactNode;
};

export function LegalDocument({ title, description, children, aside }: LegalDocumentProps) {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(232,186,70,0.16),transparent_60%)]" />

      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6 shadow-[0_4px_14px_rgba(0,0,0,0.025)]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Legal</p>
              <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p>
              {aside ? <div className="mt-6">{aside}</div> : null}
            </div>
          </aside>

          <div className="rounded-xl border border-border bg-card p-6 shadow-[0_4px_14px_rgba(0,0,0,0.025)] sm:p-10">
            <article className="prose prose-zinc max-w-none prose-headings:font-display prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
