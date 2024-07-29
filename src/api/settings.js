import request from '@/utils/request'

const api = {
  menu: '/sys/router/list',
  createMenu: '/sys/router/create'
}

export function queryMenu (parameter) {
  return request({
    url: api.menu,
    method: 'get',
    params: parameter
  })
}

export function createMenu (form) {
  return request({
    url: api.createMenu,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: form
  })
}
