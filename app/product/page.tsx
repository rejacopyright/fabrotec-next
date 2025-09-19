'use client'

import { getProduct, getProductByCategory, getProductByKeyword } from '@api/product'
import { DatatableCircleLoader } from '@components/loader'
import { useQuery } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useRouter, useSearchParams } from 'next/navigation'
import { parse } from 'qs'
import { FC, useCallback, useEffect, useState } from 'react'

import { Filter } from './_parts/Filter'

const Index: FC<any> = () => {
  const navigate = useRouter()
  const searchParams = useSearchParams()
  const queryParams = parse(searchParams.toString() || '', { ignoreQueryPrefix: true })
  const perPage = 12
  const { limit = perPage?.toString(), category = 'all', sortBy = 'price', order, q } = queryParams

  const [page, setPage] = useState(1)
  const [products, setProducts] = useState<any[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const productQueryParams: any = {
    limit,
    category,
    sortBy,
    order,
    q,
    page,
  }

  const productParams = {
    ...omit(productQueryParams, ['page', 'sortBy', 'q', 'order', 'category']),
    skip: (page - 1) * perPage,
  }
  const productQuery: any = useQuery({
    queryKey: ['getProduct', productQueryParams],
    queryFn: async () => {
      if ((q && q !== '') || (category && category !== 'all') || order) {
        setProducts([])
        setPage(1)
        setIsLoadingMore(false)
      }
      if (q && q !== '') return getProductByKeyword(q as string)
      if (category && category !== 'all') return getProductByCategory(category as string)
      if (order) return getProduct(productQueryParams)
      try {
        const res = await getProduct(productParams)
        return res
      } catch {
      } finally {
        setIsLoadingMore(false)
      }
      return []
    },
    select: ({ data }: any) => data || {},
  })

  // const products = productQuery?.data?.products || []
  const productIsLoading = !productQuery?.isFetched
  console.log(productIsLoading)
  const productHasMore = products?.length > 0

  useEffect(() => {
    if (page > 1) {
      if (productQuery?.data?.products) {
        setProducts((prevProducts) => [...prevProducts, ...(productQuery?.data?.products || [])])
      }
      setIsLoadingMore(false)
    }
  }, [page, productQuery?.data?.products])

  useEffect(() => {
    if (productQuery?.data?.products && page === 1) {
      setProducts(productQuery?.data?.products)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productQuery?.data?.products])

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + window.scrollY
    const element = document.getElementById('content')
    const documentHeight = element?.offsetHeight || 0

    if (scrollPosition >= documentHeight + 50 && !isLoadingMore && productHasMore) {
      setIsLoadingMore(true)
      setPage((prevPage) => prevPage + 1)
    }
  }, [isLoadingMore, productHasMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div className='content' id='content'>
      <title>Products</title>
      <Filter />
      <div className='row'>
        {productIsLoading && page === 1 ? (
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
        {isLoadingMore && (
          <div className='col-12 d-flex flex-center'>
            <DatatableCircleLoader size={30} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Index
