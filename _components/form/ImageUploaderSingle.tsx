'use client'
import Tooltip from '@components/tooltip'
// https://www.npmjs.com/package/jimp
// https://www.npmjs.com/package/browser-image-compression
import { KTSVG } from '@helpers'
import imageCompression, { Options } from 'browser-image-compression'
import { ChangeEvent, FC, forwardRef, useImperativeHandle, useRef } from 'react'
import { CropperRef, FixedCropper, ImageRestriction } from 'react-advanced-cropper'

export type UploadFileType = File | Blob | MediaSource | undefined
// export type UploadFilesType = FileList | File[] | Blob[] | MediaSource[]

type Range50 = 0 | 50 | 100 | 150 | 200 | 250 | 300 | 350 | 400 | 450 | 500
interface ImageUploaderType {
  onChange?: (e: UploadFileType) => void
  src?: string
  width?: Range50
  height?: Range50
}

export const compressImage = async (file: File, opt?: Options) => {
  const options: Options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 600,
    useWebWorker: true,
    ...opt,
  }
  try {
    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch {
    return undefined
  }
}

export const ImageUploaderSingle: FC<ImageUploaderType> = ({ onChange = () => '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event?.dataTransfer?.files?.length && event?.dataTransfer?.files?.[0]) {
      const file = await compressImage(event?.dataTransfer?.files?.[0])
      onChange(file)
    }
  }

  const updateImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.length && event?.target?.files?.[0]) {
      const file = await compressImage(event?.target?.files?.[0])
      onChange(file)
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        multiple={false}
        accept='image/*'
        style={{ display: 'none' }}
        onChange={updateImage}
      />
      <div
        className='btn btn-outline btn-bg-light btn-color-gray-600 btn-active-light-primary border-dashed border-primary d-flex flex-center text-center w-100 h-100'
        onDragOver={handleDragOver}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current?.click()}>
        <div className='mx-auto text-center'>
          <KTSVG className='' width={50} height={50} path='/media/icons/general/gen006.svg' />
          <small className='text-gray-800 d-block pt-5px'>Browse Image</small>
        </div>
      </div>
    </>
  )
}

export interface ImageUploaderHandle {
  fileInput: () => HTMLInputElement | null
  getCropperInstance: () => CropperRef | null
}

export const SingleImageUploader = forwardRef<ImageUploaderHandle, ImageUploaderType>(
  ({ onChange = () => '', src = '', width = 200, height = 200 }, ref) => {
    // ========== UPLOADER ==========
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
    }

    const handleFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      if (event?.dataTransfer?.files?.length && event?.dataTransfer?.files?.[0]) {
        const file = await compressImage(event?.dataTransfer?.files?.[0], {
          maxSizeMB: 0.15,
          maxWidthOrHeight: 300,
        })
        onChange(file)
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }

    const updateImage = async (event: ChangeEvent<HTMLInputElement>) => {
      if (event?.target?.files?.length && event?.target?.files?.[0]) {
        const file = await compressImage(event?.target?.files?.[0], {
          maxSizeMB: 0.15,
          maxWidthOrHeight: 300,
        })
        onChange(file)
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
    // ========== END UPLOADER ==========

    // ========== CROPPER ==========
    const cropperRef = useRef<any>(null)
    const onInteractionEnd = (_e: CropperRef) => {
      // e.getCanvas()?.toBlob?.((blob) => {
      //   if (blob) {
      //     const _file = new File([blob], 'cropped-image.jpg', {
      //       type: blob?.type,
      //       lastModified: Date.now(),
      //     })
      //   }
      // })
    }
    // ========== END CROPPER ==========

    useImperativeHandle(ref, () => ({
      fileInput: () => fileInputRef.current,
      getCropperInstance: () => cropperRef.current,
    }))

    return (
      <div className='text-center'>
        <input
          ref={fileInputRef}
          type='file'
          multiple={false}
          accept='image/*'
          style={{ display: 'none' }}
          onChange={updateImage}
        />
        {src ? (
          <div className={`position-relative w-${width}px h-${height}px m-auto`}>
            <FixedCropper
              ref={cropperRef}
              src={src}
              className={`cropper border radius-10 w-${width}px h-${height}px`}
              backgroundClassName='bg-white'
              imageRestriction={ImageRestriction?.stencil}
              stencilSize={{ width, height }}
              stencilProps={{
                handlers: false,
                lines: false,
                movable: false,
                resizable: false,
              }}
              onInteractionEnd={onInteractionEnd}
            />
            <div className='position-absolute' style={{ bottom: '5px', right: '5px' }}>
              <Tooltip placement='left' title='Hapus Gambar'>
                <div
                  className='btn btn-danger btn-flex flex-center p-0 w-30px h-30px radius-50 me-1'
                  onClick={() => {
                    if (fileInputRef?.current) {
                      fileInputRef.current.value = ''
                      onChange(undefined)
                    }
                  }}>
                  <div className='fas fa-trash-alt fs-14px' />
                </div>
              </Tooltip>
              <Tooltip placement='left' title='Ganti Gambar'>
                <div
                  className='btn btn-warning btn-flex flex-center p-0 w-30px h-30px radius-50'
                  onClick={() => {
                    fileInputRef?.current?.click?.()
                  }}>
                  <div className='fas fa-image fs-14px' />
                </div>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div
            className={`btn btn-outline btn-bg-light btn-color-gray-600 btn-active-light-primary border-dashed border-primary d-flex flex-center text-center w-${width}px h-${height}px m-auto`}
            onDragOver={handleDragOver}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef?.current?.click?.()}>
            <div className='mx-auto text-center'>
              <KTSVG className='' width={50} height={50} path='/media/icons/general/gen006.svg' />
              <small className='text-gray-800 d-block pt-5px'>Browse Image</small>
            </div>
          </div>
        )}
      </div>
    )
  }
)
