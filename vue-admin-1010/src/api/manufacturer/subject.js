import request from '@/utils/request'
export default {
    //1 课程分类列表
    getSubjectList() {
        return request({
            url: '/bsservice/subject/getAllSubject',
            method: 'get'
          })
    },
    getSubjectListPage(current,limit,subjectQuery) {
        return request({
            url: `/bsservice/subject/pageSubject/${current}/${limit}`,
            method: 'post',
            data: subjectQuery
          })
    },
    deleteSubjectId(id) {
        return request({
            url: `/bsservice/subject/deleteSubject/${id}`,
            method: 'delete'
          })
    },
    addSubject(subject) {
        return request({
            url: `/bsservice/subject/saveSubject`,
            method: 'post',
            data: subject
          })
    },
    getSubjectInfo(id) {
        return request({
            url: `/bsservice/subject/getSubjectInfo/${id}`,
            method: 'get'
          })
    },
    updateSubjectInfo(subject) {
        return request({
            url: `/bsservice/subject/updateSubject`,
            method: 'put',
            data: subject
          })
    }

}
 