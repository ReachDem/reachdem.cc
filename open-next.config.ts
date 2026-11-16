import { defineCloudflareConfig } from '@opennextjs/cloudflare'

/**
 * Adaptateur OpenNext pour Cloudflare Workers.
 *
 * OpenNext est le chemin que Payload documente pour Workers, et il supporte
 * Next 16. Il exécute Next dans son runtime Node (pas Edge), ce dont Payload a
 * besoin pour l'admin et l'API.
 *
 * Pas de cache incrémental configuré ici : le contenu du CMS est servi en
 * `force-dynamic`. Un cache R2/KV pourra être ajouté plus tard sans toucher au reste.
 */
export default defineCloudflareConfig({})
