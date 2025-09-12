import axios from '@api/axios'

export const getBooking = (params?: any) => {
  return axios({
    method: 'get',
    url: `booking`,
    params,
  })
}

export const getDetailBooking = (id?: string) => {
  return axios({
    method: 'get',
    url: `booking/${id}/detail`,
  })
}

export const deleteTransaction = (id?: string) => {
  return axios({
    method: 'delete',
    url: `booking/${id}/delete`,
  })
}

export const scanBooking = (id?: string) => {
  return axios({
    method: 'post',
    url: `booking/${id}/scan`,
  })
}

export const cancelScanBooking = (id?: string) => {
  return axios({
    method: 'post',
    url: `booking/${id}/scan/cancel`,
  })
}

export const getTrainerBooking = (params?: any) => {
  return axios({
    method: 'get',
    url: `trainer/booking`,
    params,
  })
}

export const payInAdmin = (id?: string) => {
  return axios({
    method: 'post',
    url: `booking/${id}/pay`,
  })
}

// ================================================= MEMBER =================================================
export const getMemberTransaction = (params?: any) => {
  return axios({
    method: 'get',
    url: `booking/member`,
    params,
  })
}

export const getMemberDetailTransaction = (id?: string) => {
  return axios({
    method: 'get',
    url: `booking/member/${id}/detail`,
  })
}
