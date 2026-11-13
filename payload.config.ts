import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'

import { resolveConnectionString } from './lib/db/connection'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { Solutions } from './payload/collections/Solutions'
import { PricingPlans } from './payload/collections/PricingPlans'
import { FaqItems } from './payload/collections/FaqItems'
import { RoadmapMilestones } from './payload/collections/RoadmapMilestones'
import { LegalDocuments } from './payload/collections/LegalDocuments'
import { Categories } from './payload/collections/Categories'
import { Posts } from './payload/collections/Posts'
import { Courses } from './payload/collections/Courses'
import { Lessons } from './payload/collections/Lessons'
import { LessonProgress } from './payload/collections/LessonProgress'
import { SiteSettings } from './payload/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// Top-level await : le binding Hyperdrive n'est lisible qu'asynchronement.
const connectionString = await resolveConnectionString()

/**
 * R2 est branché uniquement si les variables sont présentes.
 * Sans elles, Payload utilise son stockage local et le CMS démarre quand même :
 * on ne veut pas qu'une variable manquante empêche l'admin de booter.
 */
const r2Configured = Boolean(
  process.env.S3_BUCKET
  && process.env.S3_ACCESS_KEY_ID
  && process.env.S3_SECRET_ACCESS_KEY
  && process.env.S3_ENDPOINT,
)

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' — ReachDem',
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Solutions,
    PricingPlans,
    FaqItems,
    RoadmapMilestones,
    LegalDocuments,
    Categories,
    Posts,
    Courses,
    Lessons,
    LessonProgress,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      // Hyperdrive en Worker, DATABASE_URI/DATABASE_URL en Node.
      connectionString,
      // Un Worker ne réutilise pas un socket d'une requête à l'autre.
      // `maxUses: 1` ferme le client après chaque usage ; Hyperdrive tient le vrai pool.
      maxUses: 1,
      idleTimeoutMillis: 0,
    },
  }),
  // Pas d'option `sharp` : le binaire natif ne tourne pas dans workerd.
  // Les redimensionnements d'images sont faits à la périphérie (next/image →
  // transformations Cloudflare), pas à l'upload.
  cors: [serverURL],
  csrf: [serverURL],
  plugins: r2Configured
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.S3_BUCKET as string,
          config: {
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_REGION || 'auto',
            forcePathStyle: true,
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
            },
          },
        }),
      ]
    : [],
})
