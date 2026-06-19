import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)

export const slot4BrandConfig = {
  siteName: siteIdentity.name,
  tagline: siteIdentity.tagline,
  domain: siteIdentity.domain,
  baseUrl: siteIdentity.url,
  productKind,
  ogImage: siteIdentity.ogImage,
  accents:
    productKind === 'visual'
      ? { primary: '#2b7db7', surface: '#f7fbff' }
      : productKind === 'editorial'
        ? { primary: '#2b7db7', surface: '#ffffff' }
        : productKind === 'directory'
          ? { primary: '#2b7db7', surface: '#f8fbff' }
          : { primary: '#2b7db7', surface: '#ffffff' },
} as const
