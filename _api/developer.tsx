import axios from '@api/axios'

export const fixOpenClassInterval = () => {
  return axios({
    method: 'post',
    url: 'developer/fix-open-class-interval',
  })
}

export const downloadImageAssets = async () => {
  try {
    const response = await axios.post('developer/download-image-assets', null, {
      responseType: 'blob',
      headers: { 'Content-Type': 'application/zip' },
    })

    const blob = new Blob([response.data], { type: 'application/zip' })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'images.zip')
    document.body.appendChild(link)
    link.click()

    link.remove()
    window.URL.revokeObjectURL(url)
  } catch {
    //
  }
}
