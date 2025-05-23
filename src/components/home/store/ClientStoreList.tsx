'use client'

import ContentCard from '../ui/content-card'
import FilterButton from '@/components/ui/filter-button'
import { Store } from '@/types/Store'
import { useState } from 'react'

type Props = {
  stores: Store[]
  limit?: number
}

const ClientStoreList = ({ stores, limit }: Props) => {
  const [filterCategory, setFilterCategory] = useState<string>('All')

  const parentCategories = [...new Set(stores.flatMap((p) => p.categories.map((c) => c.title)))]

  const filtered =
    filterCategory && filterCategory !== 'All'
      ? stores.filter((p) => p.categories.some((cat) => cat.title === filterCategory))
      : stores

  return (
    <>
      <div className="flex justify-center items-center w-full gap-6 my-6">
        {!limit && (
          <>
            <FilterButton
              name="All"
              variant={filterCategory === 'All' ? 'active' : 'inactive'}
              onClick={() => setFilterCategory('All')}
            />
            {parentCategories.map((category) => (
              <FilterButton
                key={category}
                name={category}
                variant={filterCategory === category ? 'active' : 'inactive'}
                onClick={() => setFilterCategory(category)}
              />
            ))}
          </>
        )}
      </div>
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((store) => (
            <ContentCard
              key={store.slug}
              image={store.heroImage?.sizes.small.url || '/placeholder.svg'}
              title={store.title}
              description={store.aboutThisProject || 'No description available.'}
              slug={`/stores/${store.slug}`}
              purchase={true}
              price={store.priceWithCurrency}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ClientStoreList
