import { isDev, translate } from '@helpers'
import { FC } from 'react'

import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'

const Index: FC<any> = () => {
  return (
    <>
      <AsideMenuItem
        to={`/product`}
        icon='/media/icons/art/art002.svg'
        title='product'
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>TRANSAKSI</span>
        </div>
      </div>
      {/* <AsideMenuItem
        to={`/transaction/all`}
        icon='/media/icons/finance/fin008.svg'
        title='Semua Transaksi'
        fontIcon='bi-app-indicator'
      /> */}
      <AsideMenuItem
        to={`/transaction/booking`}
        icon='/media/icons/general/gen014.svg'
        title='Booking'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to={`/transaction/trainer`}
        icon='/media/icons/communication/com014.svg'
        title='Trainer'
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {translate('MENU.MAIN')}
          </span>
        </div>
      </div>
      {/* <AsideMenuItem
        to={`/other`}
        icon='/media/icons/general/gen043.svg'
        title='Other'
        fontIcon='bi-app-indicator'
      /> */}
      <AsideMenuItemWithSub
        to={`/class`}
        title='Kelas'
        fontIcon='bi-chat-left'
        icon='/media/icons/abstract/abs046.svg'>
        <AsideMenuItem to={`/class/studio`} title='Mat Studio' hasBullet={true} />
        <AsideMenuItem to={`/class/functional`} title='Hybrid Studio' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to={`/open-class`}
        title='Buka Kelas'
        fontIcon='bi-user'
        icon='/media/icons/abstract/abs038.svg'>
        <AsideMenuItem to={`/open-class/studio`} title='Mat Studio' hasBullet={true} />
        <AsideMenuItem to={`/open-class/functional`} title='Hybrid Studio' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to={`/member`}
        title='Member'
        fontIcon='bi-user'
        icon='/media/icons/general/gen026.svg'>
        <AsideMenuItem to={`/member/package`} title='Paket' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to={`/user`}
        title='User'
        fontIcon='bi-user'
        icon='/media/icons/communication/com013.svg'>
        <AsideMenuItem to={`/user/regular`} title='User Reguler' hasBullet={true} />
        <AsideMenuItem to={`/user/member`} title='Member' hasBullet={true} />
        <AsideMenuItem to={`/user/trainer`} title='Trainer' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Settings</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to={`/settings`}
        title='Pengaturan'
        fontIcon='bi-user'
        icon='/media/icons/coding/cod009.svg'>
        {isDev && (
          <AsideMenuItem to={`/settings/developer`} title='Developer Console' hasBullet={true} />
        )}
        <AsideMenuItem to={`/settings/fee`} title='Harga' hasBullet={true} />
        <AsideMenuItem to={`/settings/payment`} title='Biaya Layanan' hasBullet={true} />
        <AsideMenuItem to={`/settings/app-banner`} title='Banner Aplikasi' hasBullet={true} />
        <AsideMenuItem to={`/settings/other`} title='Lainnya' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to={`/company`}
        title='Perusahaan'
        fontIcon='bi-user'
        icon='/media/icons/maps/map004.svg'>
        <AsideMenuItem to={`/company/contact`} title='Kontak' hasBullet={true} />
        <AsideMenuItem to={`/company/home`} title='Homepage' hasBullet={true} />
        <AsideMenuItem to={`/company/about`} title='Tentang Kami' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to={`/history`}
        title='Riwayat'
        fontIcon='bi-user'
        icon='/media/icons/general/gen013.svg'>
        <AsideMenuItem to={`/history/login?limit=25`} title='Login' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to={`/trash`}
        title='Sampah'
        fontIcon='bi-user'
        icon='/media/icons/general/gen027.svg'>
        <AsideMenuItem to={`/trash/user`} title='User' hasBullet={true} />
      </AsideMenuItemWithSub>
    </>
  )
}

export default Index
