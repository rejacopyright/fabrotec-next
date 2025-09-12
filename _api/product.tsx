import axios from '@api/axios'

export const getProduct = (params?: any) => {
  return axios({
    method: 'get',
    url: `products`,
    params,
  })
}

export const getProductByCategory = (category?: string) => {
  return axios({
    method: 'get',
    url: `products/category/${category}`,
  })
}

export const getProductByKeyword = (q?: string) => {
  return axios({
    method: 'get',
    url: `products/search`,
    params: { q },
  })
}

export const getProductDetail = (id?: string) => {
  return axios({
    method: 'get',
    url: `products/${id}`,
  })
}

export const getCategory = () => {
  return axios({
    method: 'get',
    url: `products/categories`,
  })
}
