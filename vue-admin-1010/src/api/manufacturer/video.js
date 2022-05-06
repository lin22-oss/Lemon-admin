import request from '@/utils/request'
export default {

    //添加视频
    addVideo(video) {
        return request({
            url: '/bsservice/video/addVideo',
            method: 'post',
            data: video
          })
    },
    
    //删除视频
    deleteVideo(id) {
        return request({
            url: '/bsservice/video/'+id,
            method: 'delete'
          })
    },

    getVideo(id){
        return request({
            url: '/bsservice/video/getVideo/'+id,
            method: 'get',
          })
    }
}