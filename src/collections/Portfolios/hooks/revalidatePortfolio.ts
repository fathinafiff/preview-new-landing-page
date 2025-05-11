import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Portfolio } from '../../../payload-types'

export const revalidatePortfolio: CollectionAfterChangeHook<Portfolio> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/portfolios/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('portfolios-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/portfolios/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('portfolios-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Portfolio> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/portfolios/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('portfolios-sitemap')
  }

  return doc
}
