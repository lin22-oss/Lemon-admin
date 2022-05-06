import request from '@/utils/request'
export default {
    //1 课程分类列表
    getSubjectList() {
        return request({
            url: '/bsservice/subject/getAllSubject',
            method: 'get'
          })
    }
}
