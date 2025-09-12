// API: https://github.com/react-component/image
// DEMO: https://image-sepia.vercel.app

import Image from 'rc-image'
import { FC, useState } from 'react'

import { defaultIcons } from './common'

interface Props {
  items: string[]
  render?: any
  clickable?: boolean
}

export const ImageViewer: FC<Props> = ({ items, render, clickable = true }) => {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)

  return (
    <Image.PreviewGroup
      items={items}
      preview={{
        icons: defaultIcons,
        visible,
        onVisibleChange: setVisible,
        current,
        onChange: setCurrent,
      }}>
      {items?.map((item: any, index: number) => {
        const customEl: any = render ? render('', item, index) : undefined
        const content: any = item
        let thisEl: any = content

        if (customEl) {
          const El: any = render(content, item, index)
          if (typeof El === 'function') {
            thisEl = El?.()
          } else {
            thisEl = El
          }
        } else if ([null, undefined, '']?.includes(content)) {
          thisEl = '-'
        } else if (['object', 'function']?.includes(typeof content)) {
          thisEl = `[${typeof content}]`
        } else {
          thisEl = (
            <div
              className='w-50px h-50px radius-50 border'
              style={{ background: `#fff url(${item}) center / cover no-repeat` }}
            />
          )
        }
        return (
          <div
            key={index}
            onClick={() => {
              if (clickable) {
                setCurrent(index)
                setVisible(true)
              }
            }}>
            {thisEl}
          </div>
        )
      })}
    </Image.PreviewGroup>
  )
}
