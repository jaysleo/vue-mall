import service from '../utils/request'

// 支付宝预授权
export function signList (params) {
  return service({
    url: 'vip/index',
    method: 'get',
    params
  })
}

export function delsign (id) {
  return service({
    url: 'vip/del',
    method: 'post',
    data:{
      id:id
    }
  })
}

export function vipList (params) {
  return service({
    url: 'vip/vip_list',
    method: 'get',
    params
  })
}

export function getvipUser (params) {
  return service({
    url: 'vip/search4user',
    method: 'get',
    params
  })
}

export function userVip (id) {
  return service({
    url: 'vip/user2vip',
    method: 'post',
    data:{
      user_id:id
    }
  })
}