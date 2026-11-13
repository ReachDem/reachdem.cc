/**
 * Résolution de la chaîne de connexion Postgres selon l'environnement.
 *
 * - **Worker Cloudflare** : la connexion vient du binding Hyperdrive. On ne garde
 *   aucune URL de base en dur ni en secret : Hyperdrive gère les identifiants et
 *   fournit une chaîne par requête.
 * - **Node (build, CLI, scripts, dev local)** : `DATABASE_URI` ou `DATABASE_URL`.
 *
 * Hyperdrive est indispensable ici : un Worker ne peut pas garder de socket TLS
 * ouverte vers Postgres, et `workerd` refuse de réutiliser un socket d'une requête
 * à l'autre. Hyperdrive maintient le pool de son côté.
 */
export async function resolveConnectionString(): Promise<string> {
  if (process.env.DATABASE_URI) return process.env.DATABASE_URI

  try {
    // Import dynamique : la fonction n'existe pas hors du runtime Workers,
    // et le build Node ne doit pas échouer dessus.
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const { env } = await getCloudflareContext({ async: true })
    const hyperdrive = (env as { HYPERDRIVE?: { connectionString?: string } }).HYPERDRIVE
    if (hyperdrive?.connectionString) return hyperdrive.connectionString
  } catch {
    // Hors Workers (build, CLI Payload, dev local) : on continue avec les variables d'env.
  }

  return process.env.DATABASE_URL ?? ''
}
