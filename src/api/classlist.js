import service from '../utils/request'

// 分类列表
export function classList (data) {
  return service({
    url: 'category/index',
    method: 'get',
    data
  })
}

export function Addcategory (data) {
  return service({
    url: 'category/add',
    method: 'post',
    data
  })
}
export function EditClassList (data) {
  return service({
    url: 'category/edit',
    method: 'post',
    data
  })
}
export function deleteClassList (data) {
  return service({
    url: 'category/del',
    method: 'post',
    data
  })
}

// 商品列表
export function prolist (params) {
  return service({
    url: 'product/index',
    method: 'get',
    params
  })
}
export function prodesc (id) {
  return service({
    url: 'product/get_desc',
    method: 'get',
    params:{
      product_id:id
    }
  })
}
export function addpro (data) {
  return service({
    url: 'product/add_product',
    method: 'post',
    data
  })
}
export function editpro (data) {
  return service({
    url: 'product/edit_product',
    method: 'post',
    data
  })
}
export function delpro (id) {
  return service({
    url: 'product/del',
    method: 'post',
    params: {
      product_id: id
    }
  })
}
