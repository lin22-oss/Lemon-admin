import request from '@/utils/request'
export default {
    //1 厂商列表（条件查询分页）
    //current当前页 limit每页记录数 teacherQuery条件对象
    getManufacturerListPage(current,limit,manufacturerQuery) {
        return request({
            url: `/bsservice/manufacturer/pageManufacturerCondition/${current}/${limit}`,
            method: 'post',
            //manufacturerQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转换json进行传递到接口里面
            data: manufacturerQuery
          })
    },
    //删除讲师
    deleteManufacturerId(id) {
        return request({
            url: `/bsservice/manufacturer/${id}`,
            method: 'delete'
          })
    },
    //添加讲师
    addManufacturer(teacher) {
        return request({
            url: `/bsservice/manufacturer/addBsManufacturer`,
            method: 'post',
            data: teacher
          })
    },
    //根据id查询讲师
    getManufacturerInfo(id) {
        return request({
            url: `/bsservice/manufacturer/getManufacturer/${id}`,
            method: 'get'
          })
    },
    //修改讲师
    updateManufacturerInfo(teacher) {
        return request({
            url: `/bsservice/manufacturer/updateManufacturer`,
            method: 'post',
            data: teacher
          })
    }
}
