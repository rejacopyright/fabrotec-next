export const rewrites = [
  {
    source: '/',
    destination: '/home',
  },
  // {
  //   source: `/login`,
  //   destination: '/auth/login',
  // },
  // {
  //   source: `/register`,
  //   destination: '/register/email',
  // },
  // {
  //   source: '/public/user/badge/:pathname',
  //   destination: '/public/badge/:pathname',
  // },
  // {
  //   source: '/policy',
  //   destination: '/public/policy',
  // },
  // {
  //   source: '/terms',
  //   destination: '/public/terms',
  // },
]

export const redirects = [
  {
    source: '/auth',
    destination: '/',
    permanent: true,
  },
  {
    source: '/auth/:pathname*',
    destination: '/:pathname*',
    permanent: true,
  },
]
