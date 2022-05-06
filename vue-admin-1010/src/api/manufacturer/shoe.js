import request from '@/utils/request'
export default {
    //1 添加商品信息
    addShoeInfo(shoeInfoVo) {
        return request({
            url: '/bsservice/shoe/addShoeInfo',
            method: 'post',
            data:shoeInfoVo
          })
    },
    //2 查询所有厂商
    getListManufacturer() {
        return request({
            url: '/bsservice/manufacturer/findAll',
            method: 'get'
          })
    },
    //根据商品id查询商品基本信息
    getShoeInfoId(shoeId) {
        return request({
            url: '/bsservice/shoe/getShoeInfo/'+shoeId,
            method: 'get'
          })
    },
    //修改商品信息
    updateShoeInfo(shoeInfoVo) {
        return request({
            url: '/bsservice/shoe/updateShoeInfo',
            method: 'post',
            data: shoeInfoVo
          })
    },
    //课程确认信息显示
    getPublihShoeInfo(id) {
        return request({
            url: '/bsservice/shoe/getPublishShoeInfo/'+id,
            method: 'get'
          })
    },
    //课程最终发布
    publihShoe(id) {
        return request({
            url: '/bsservice/shoe/publishShoe/'+id,
            method: 'post'
          })
    },
    //课程列表
    getListShoePage(current,limit,shoeQuery) {
        return request({
            url: `/bsservice/shoe/pageShoe/${current}/${limit}`,
            method: 'post',
            data:shoeQuery
          })
    },
    removeDataById(id){
        return request({
            url: `/bsservice/shoe/`+id,
            method: 'delete',
          })
    }


}
