import { KTSVG } from '@helpers'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const Index: FC<any> = () => {
  const path = usePathname()
  return (
    <>
      <div className='h-75px' />
      <div className='position-fixed bottom-0 w-100'>
        <div className='shadow-sm border-top border-gray-200 bg-white p-2'>
          <div className='row'>
            <Link href={`/product`} className='col text-center'>
              <KTSVG
                path={`/media/icons/general/gen001.svg`}
                className={`svg-icon-${path?.startsWith(`/product`) ? 'primary' : 'gray-300'}`}
                svgClassName='w-30px h-30px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`/product`) ? 'primary' : 'dark'}`}>
                Home
              </div>
            </Link>
            <Link href={`/wallet`} className='col text-center'>
              <KTSVG
                path={`/media/icons/general/gen026.svg`}
                className={`svg-icon-${path?.startsWith(`/wallet`) ? 'primary' : 'gray-400'}`}
                svgClassName='w-35px h-35px'
                style={{ marginBottom: -2.5, marginTop: -2.5 }}
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`/wallet`) ? 'primary' : 'dark'}`}>
                Wallet
              </div>
            </Link>
            <Link href={`/submission`} className='col text-center'>
              <KTSVG
                path={`/media/icons/general/gen043.svg`}
                className={`svg-icon-${path?.startsWith(`/submission`) ? 'primary' : 'gray-400'}`}
                svgClassName='w-30px h-30px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`/submission`) ? 'primary' : 'dark'}`}>
                Submission
              </div>
            </Link>
            <Link href={`/notification`} className='col text-center'>
              <KTSVG
                path={`/media/icons/general/gen007.svg`}
                className={`svg-icon-${path?.startsWith(`/notification`) ? 'primary' : 'gray-400'}`}
                svgClassName='w-30px h-30px'
              />
              <div
                className={`fs-9 lh-1 mt-1 text-${path?.startsWith(`/notification`) ? 'primary' : 'dark'}`}>
                Notification
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
