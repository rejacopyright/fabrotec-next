'use client'

import { getProduct, getProductByCategory, getProductByKeyword } from '@api/product'
import { DatatableCircleLoader } from '@components/loader'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC } from 'react'

import { Filter } from './_parts/Filter'

const Index: FC<any> = () => {
  const navigate = useRouter()

  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const { limit = '16', category = 'all', sortBy = 'price', order, q } = queryParams

  const productQueryParams: any = {
    limit,
    category,
    sortBy,
    order,
    q,
  }

  const productQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getProduct', productQueryParams],
    queryFn: () =>
      q && q !== ''
        ? getProductByKeyword(q as string)
        : category && category !== 'all'
          ? getProductByCategory(category as string)
          : getProduct(productQueryParams),
    select: ({ data }: any) => data || {},
  })

  const products = productQuery?.data?.products || []
  const productIsLoading = !productQuery?.isFetched

  return (
    <div className='content'>
      <title>Products</title>
      <Filter />
      <div className='row'>
        {productIsLoading ? (
          <div className='col-12 d-flex flex-center h-400px'>
            <DatatableCircleLoader size={30} />
          </div>
        ) : (
          products?.map((item, key: number) => (
            <div key={key} className='col-lg-3 col-md-4 col-sm-6 my-10px'>
              <div
                className='bg-white border radius-10 overflow-hidden card-2 h-100'
                onClick={() => navigate.push(`/product/${item?.id || '#'}`)}>
                <div
                  className='w-200px h-auto mx-auto position-relative'
                  style={{
                    minHeight: '200px',
                    background: `#fff url(${item?.images?.[0] ? item?.images?.[0]?.replace(/'/g, '%27') : '/media/placeholder/blank-image.svg'}) center / cover no-repeat`,
                  }}
                />
                <div className='p-10px'>
                  <div className='fw-bold fs-16px'>{item?.title || '???'}</div>
                  <div className='text-truncate-2'>{item?.description || '???'}</div>
                </div>
                <div className='p-10px fs-16px fw-bolder text-primary'>${item?.price || '0'}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Index
