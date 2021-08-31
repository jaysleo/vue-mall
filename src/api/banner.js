import service from '../utils/request'

// bannerList
export function bannerList (data) {
  return service({
    url: 'banner/index',
    method: 'get',
    data
  })
}

export function uploaDbannerList (data) {
  return service({
    url: 'banner/upload',
    method: 'post',
    data
  })
}

export function delbanner (id) {
  return service({
    url: 'banner/del',
    method: 'post',
    data:{
      banner_id:id
    }
  })
}