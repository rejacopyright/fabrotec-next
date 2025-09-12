import { randomString } from '@helpers'
import { useLayout } from '@metronic/layout/core'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  id: string
  dir?: 'start' | 'end' | 'top' | 'bottom'
  submitText?: string
  onSubmit?: () => void
}

export const CanvasModal: FC<Props> = ({
  children,
  id,
  submitText = 'Tutup',
  onSubmit = () => undefined,
  dir = 'end',
}) => {
  const { classes } = useLayout()
  const keyId = `${id}_${randomString()}`
  const drawerId = `kt_aside_modal_${keyId}`
  const handleClose = () => {
    onSubmit()
    const drawerElement = document.getElementById(drawerId)
    if (drawerElement) {
      const drawer = (window as any).KTDrawer?.getInstance(drawerElement)
      drawer?.hide()
    }
  }
  return (
    <div
      id={drawerId}
      className={clsx('aside d-block d-lg-none', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction={dir}
      data-kt-drawer-toggle={`#${id}`}
      data-kt-drawer-close={`#${keyId}_close`}>
      <div className='aside-menu flex-column-fluid'>{children}</div>
      <div className='aside-footer flex-column-auto pt-5 pb-7 px-5'>
        <div
          id={`${keyId}_close`}
          className='btn btn-custom btn-primary w-100'
          data-kt-drawer-close='true'
          onClick={handleClose}>
          {submitText}
        </div>
      </div>
    </div>
  )
}
