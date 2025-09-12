import { getCategory } from '@api/product'
import { Sticky } from '@components/cards/Sticky'
import { Searchbox } from '@components/form'
import { Select as SelectData } from '@components/select/select'
import { useLocation } from '@hooks'
import { useQuery } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parse, stringify } from 'qs'
import { FC } from 'react'

export const Filter: FC<any> = () => {
  const pathname: any = usePathname()
  const router = useRouter()
  const searchParamsFn = useSearchParams()
  const searchParams = parse(searchParamsFn.toString() || '', { ignoreQueryPrefix: true })
  const { category = 'all', order, q = '' }: any = searchParams || {}

  const omitParams = (keys: string[] | string) => {
    if (searchParams?.page) {
      searchParams.page = '1'
    }
    const omittedParams: any = omit(searchParams, keys)
    const resParams = stringify(omittedParams, { encode: false })
    router.replace(`${pathname}?${resParams}`)
  }

  const categoryQuery: any = useQuery({
    // initialData: {data: []},
    queryKey: ['getCategory'],
    queryFn: getCategory,
    select: ({ data }: any) => {
      const res: any = data || {}
      return res
    },
  })
  const categories: any = categoryQuery?.data || []
  const sortData: any = [
    { id: 'asc', name: 'Chiper', selected: true },
    { id: 'desc', name: 'Most Expensive' },
  ]
  const categoryIsLoading = !categoryQuery?.isFetched
  return (
    <Sticky className='pb-8px mb-5px bg-body mx-n5 px-5 mt-5 mt-lg-0'>
      <div className='page-filter pt-14px'>
        <div className='d-flex flex-wrap align-items-center justify-content-lg-between bg-white p-18px radius-10 shadow-xs gap-20px'>
          <div className='d-flex flex-wrap align-items-center gap-12px col'>
            <div className='col-lg-4'>
              <Searchbox
                size='sm'
                icon='search'
                controlled
                placeholder='Search product...'
                className='radius-5 w-100'
                height={36}
                delay={1000}
                defaultValue={q}
                onChange={async (e: any) => {
                  const location = useLocation()
                  if (e) {
                    const thisParams = location?.params || {}
                    if (thisParams?.page) {
                      thisParams.page = '1'
                    }
                    const thisResParams = await stringify(
                      { ...thisParams, q: e },
                      { encode: false }
                    )
                    router.replace(`${pathname}?${thisResParams}`)
                  } else {
                    omitParams('q')
                  }
                }}
              />
            </div>
            <div className='col-auto'>
              <SelectData
                sm={true}
                name='sort'
                className='p-0 text-start'
                reload={false}
                data={sortData}
                isClearable={true}
                placeholder='Sort Price'
                defaultValue={order}
                parse={(e: any) => {
                  return {
                    value: e?.id,
                    label: e?.name,
                  }
                }}
                styleOption={{
                  control: {
                    border: '1px solid #eee',
                    borderRadius: '5px',
                    minWidth: 175,
                    height: 37,
                    minHeight: 37,
                  },
                  placeholder: { color: '#000' },
                }}
                onChange={async (e: any) => {
                  const location = useLocation()
                  const thisParams = location?.params || {}
                  const thisResParams = await stringify(
                    e?.value ? { ...thisParams, order: e?.value } : omit(thisParams, 'order'),
                    { encode: false }
                  )
                  router.replace(`${pathname}?${thisResParams}`)
                }}
              />
            </div>
            <div className='col-auto'>
              {!categoryIsLoading ? (
                <SelectData
                  sm={true}
                  name='category'
                  className='p-0 text-start'
                  reload={false}
                  data={categories}
                  isClearable={true}
                  placeholder='Choose Category'
                  defaultValue={category && category !== 'all' ? category : 'all'}
                  parse={(e: any) => {
                    return {
                      value: e?.slug,
                      label: e?.name,
                    }
                  }}
                  styleOption={{
                    control: {
                      border: '1px solid #eee',
                      borderRadius: '5px',
                      minWidth: 175,
                      height: 37,
                      minHeight: 37,
                    },
                    placeholder: { color: '#000' },
                  }}
                  onChange={async (e: any) => {
                    const location = useLocation()
                    const thisParams = location?.params || {}
                    const thisResParams = await stringify(
                      e?.value
                        ? { ...thisParams, category: e?.value }
                        : omit(thisParams, 'category'),
                      { encode: false }
                    )
                    router.replace(`${pathname}?${thisResParams}`)
                  }}
                />
              ) : (
                <div className='w-175px h-40px bg-gray-100 radius-10' />
              )}
            </div>
            <div className='col-auto ms-auto' />
          </div>
        </div>
      </div>
    </Sticky>
  )
}
