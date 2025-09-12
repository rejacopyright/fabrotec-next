'use client'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-advanced-cropper/dist/style.css'
import 'moment/locale/id'
moment.locale('id')

import { ErrorBoundaryPage } from '@components/layouts/ErrorBoundary'
import { defineRole } from '@components/layouts/LayoutConfig'
import ModalUpdateProfile from '@components/modal/ModalUpdateProfile'
import { APP_DEFAULT_ROLE, detectMobileScreen } from '@helpers'
import { useSize } from '@hooks'
import { MenuComponent } from '@metronic/assets/ts/components'
import { AsideDefault } from '@metronic/layout/components/aside/AsideDefault'
import { Content } from '@metronic/layout/components/Content'
import { ScrollTop } from '@metronic/layout/components/ScrollTop'
import { PageDataProvider } from '@metronic/layout/core'
import { MasterInit } from '@metronic/layout/MasterInit'
import { MobileMenuDrawer } from '@metronic/partials'
import clsx from 'clsx'
import moment from 'moment'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { shallowEqual, useSelector } from 'react-redux'

const Index = ({ children }) => {
  const pathname = usePathname()
  const user: any = useSelector(({ user }: any) => user?.data, shallowEqual)
  const thisLayout = defineRole?.find((item: any) => item?.role === APP_DEFAULT_ROLE)
  const Navbar: any = thisLayout?.navbar
  const Header: any = thisLayout?.header
  const sidebar: any = thisLayout?.sidebar

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isUpdateProfile, setUpdateProfile] = useState<boolean>(false)

  useSize(() => {
    setIsMobile(detectMobileScreen())
  }, 100)

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [pathname])

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }: any) => (
        <ErrorBoundaryPage error={error} reset={resetErrorBoundary} />
      )}
      onError={(err: any) => err}>
      <PageDataProvider>
        <div className='page d-flex flex-row flex-column-fluid bg-body'>
          <AsideDefault sidebar={sidebar} />
          <div
            suppressHydrationWarning
            className={clsx('wrapper d-flex flex-column flex-row-fluid', {
              'ps-0': !sidebar,
            })}
            id='kt_wrapper'>
            {thisLayout?.header && <Header sidebar={sidebar} />}
            <div id='kt_content' className='content d-flex flex-column flex-column-fluid p-0'>
              <div className='post d-flex w-100' id='kt_post'>
                <Content>{children}</Content>
              </div>
            </div>
          </div>
        </div>
        <MobileMenuDrawer />
        {isMobile && false && <Navbar />}
        <MasterInit />
        <ScrollTop isMobile={isMobile} />
        {/* <ModalCompleteProfileMessage
          isShow={!user?.user_frst_nm && !user?.user_last_nm && userID}
          setModalUpdateProfile={setUpdateProfile}
        /> */}
        <ModalUpdateProfile
          user={user}
          isModalShow={isUpdateProfile}
          setModalProfile={setUpdateProfile}
        />
      </PageDataProvider>
    </ErrorBoundary>
  )
}

export default Index
