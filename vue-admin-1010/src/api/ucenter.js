import request from '@/utils/request'
export default {
    //1 会员列表（条件查询分页）
    //current当前页 limit每页记录数 teacherQuery条件对象
    getUcenterListPage(current,limit,ucenterQuery) {
        return request({
            url: `/educenter/member/pageUcenterMemberCondition/${current}/${limit}`,
            method: 'post',
            //ucenterQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转换json进行传递到接口里面
            data: ucenterQuery
          })
    }, 
    //禁用会员
    deleteUcenterId(id) {
        return request({
            url: `/educenter/member/banUcenterMember/${id}`,
            method: 'get'
          })
    },
    //根据id查询会员
    getUcenterInfo(id) {
        return request({
            url: `/educenter/member/getUcenterMemberById/${id}`,
            method: 'get'
          })
    }
}
