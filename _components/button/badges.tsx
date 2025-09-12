import { FC } from 'react'

export const TrialBadge: FC<any> = () => {
  return (
    <div className='position-absolute end-0 top-0 h-40px d-flex align-items-center me-40px'>
      <div className='badge badge-warning'>Trial</div>
    </div>
  )
}
