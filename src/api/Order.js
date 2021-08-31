import service from '../utils/request'

// OrderList
export function OrderList (params) {
  return service({
    url: 'order/index',
    method: 'get',
    params
  })
}
export function delOrder (id) {
  return service({
    url: 'order/del',
    method: 'post',
    data:{
      order_id:id
    }
  })
}
export function expressList (params) {
  return service({
    url: 'order/express_list',
    method: 'get',
    params
  })
}

export function order2express (order_id,express_id,express_number) {
  return service({
    url: 'order/order2express',
    method: 'post',
    data:{
      order_id:order_id,
      express_id:express_id,
      express_number:express_number
    }
  })
}
export function withdrawList (params) {
  return service({
    url: 'order/withdraw_list',
    method: 'get',
    params
  })
}

export function changeWithdraw (id,status) {
  return service({
    url: 'order/change_withdraw_status',
    method: 'post',
    data:{
      withdraw_id:id,
      status:status
    }
  })
}

export function commitList (params) {
  return service({
    url: 'commit/index',
    method: 'get',
    params
  })
}

export function delcommit (id) {
  return service({
    url: 'commit/del_commit',
    method: 'post',
    data:{
      commit_id:id
    }
  })
}

export function suggestList (params) {
  return service({
    url: 'other/suggestion_list',
    method: 'get',
    params
  })
}