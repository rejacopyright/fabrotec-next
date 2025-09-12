import axios from '@api/axios'

export const getAdmin = (params?: any) => {
  return axios({
    method: 'get',
    url: 'users/admin',
    params,
  })
}

export const getTrainer = (params?: any) => {
  return axios({
    method: 'get',
    url: 'users/trainer',
    params,
  })
}

export const getUserRegular = (params?: any) => {
  return axios({
    method: 'get',
    url: 'users/regular',
    params,
  })
}

export const getUserMember = (params?: any) => {
  return axios({
    method: 'get',
    url: 'users/member',
    params,
  })
}

export const getUserTrash = (params?: any) => {
  return axios({
    method: 'get',
    url: 'users/trash',
    params,
  })
}

export const addUser = (data: any) => {
  return axios({
    method: 'post',
    url: 'users/create',
    data,
  })
}

export const updateUser = (id: string, data: any) => {
  return axios({
    method: 'put',
    url: `users/${id}/update`,
    data,
  })
}

export const updateUserAvatar = (data: any) => {
  return axios({
    method: 'post',
    url: `update/avatar`,
    data,
  })
}

export const updateUserNIK = (data: any) => {
  return axios({
    method: 'post',
    url: `update/nik`,
    data,
  })
}

export const unfreezeUser = (id: string) => {
  return axios({
    method: 'post',
    url: `users/${id}/unfreeze`,
  })
}

export const deleteUser = (id: string) => {
  return axios({
    method: 'delete',
    url: `users/${id}/delete`,
  })
}

export const hardDeleteUser = (id: string) => {
  return axios({
    method: 'delete',
    url: `users/${id}/delete/hard`,
  })
}

export const restoreUser = (id: string) => {
  return axios({
    method: 'post',
    url: `users/${id}/restore`,
  })
}

export const importUser = (data) => {
  return axios({
    method: 'post',
    url: `users/create/bulk`,
    data,
  })
}

export const changeUserToRegular = (id: string) => {
  return axios({
    method: 'post',
    url: `users/${id}/move/regular`,
  })
}

export const changeUserToTrainer = (id: string) => {
  return axios({
    method: 'post',
    url: `users/${id}/move/trainer`,
  })
}

export const changeUserToMember = (id: string, member_id: string) => {
  return axios({
    method: 'post',
    url: `users/${id}/move/member`,
    data: { member_id },
  })
}
