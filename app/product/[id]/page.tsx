'use client'
import { getProductDetail } from '@api/product'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC, use } from 'react'
import Slider from 'react-slick'

const Index: FC<{ params: any }> = ({ params }) => {
  const navigate = useRouter()
  const thisParams: any = use(params)
  const { id } = thisParams || {}

  const productDetailQuery: any = useQuery({
    queryKey: ['getProductDetail', id],
    queryFn: () => getProductDetail(id),
    select: ({ data }: any) => data || {},
  })

  const productDetail = productDetailQuery?.data || {}
  const images = productDetail?.images?.map((img: any) => img.replace(/'/g, '%27')) || []

  const carousel_settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    autoplay: true,
  }

  return (
    <div className='row mx-0 mt-50px'>
      <div className='col-md-10 offset-md-1'>
        <div className='bg-white shadow-xs radius-15 overflow-hidden'>
          <div className='border-bottom border-gray-300 py-10px px-20px m-0 d-flex align-items-center'>
            <button type='button' className='btn btn-light me-10px' onClick={() => navigate.back()}>
              <i className='las la-arrow-left text-gray-500 fs-16px mb-1px me-5px' />
              Back
            </button>
          </div>
          <div className='px-20px py-10px'>
            <div className='row'>
              <div className='col-lg-4'>
                <div className='row'>
                  <Slider {...carousel_settings}>
                    {images?.map((img: any, key: number) => (
                      <div key={key} className='col-auto my-10px'>
                        <div
                          className='h-300px btn border border-gray-200 d-flex flex-center position-relative radius-0'
                          style={{
                            background: `#fff url(${img}) center / contain no-repeat`,
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className='col'>
                <div className='p-10px'>
                  <div className='fw-bold fs-16px'>{productDetail?.title || '???'}</div>
                  <div className=''>{productDetail?.description || '???'}</div>
                </div>
                <div className='p-10px fs-16px fw-bolder text-primary'>
                  ${productDetail?.price || '0'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
