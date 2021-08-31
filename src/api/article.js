import service from '../utils/request'

export function articlelist (params) {
    return service({
        url: 'other/article_list',
        method: 'get',
        params
    })
}
export function add_article (title,content,tag) {
    return service({
        url: 'other/add_article',
        method: 'post',
        data:{
            title:title,
            content:content,
            tag:tag
        }
    })
}
export function edit_article (article_id,title,content,tag) {
    return service({
        url: 'other/edit_article',
        method: 'post',
        data:{
            article_id:article_id,
            title:title,
            content:content,
            tag:tag
        }
    })
}
export function del_article (article_id) {
    return service({
        url: 'other/del_article',
        method: 'post',
        data:{
            article_id:article_id
        }
    })
}

export function getwebconfig (params) {
    return service({
        url: 'other/web_config_detail',
        method: 'get',
        params
    })
}
export function editWebconfig (data) {
    return service({
        url: 'other/web_config_edit',
        method: 'post',
        data
    })
}