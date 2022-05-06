<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新商品</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写商品基本信息"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">

        <el-form-item label="商品名称">
            <el-input v-model="shoeInfo.shoeName" placeholder="例如:音速9"/>
        </el-form-item>

        <!-- 所属分类 TODO -->
        <el-form-item label="商品分类">
            <el-select
                v-model="shoeInfo.subjectParentId"
                placeholder="一级分类" @change="subjectLevelOneChanged">

                <el-option
                    v-for="subject in subjectOneList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id"/>

            </el-select>

            <!-- 二级分类 -->
            <el-select v-model="shoeInfo.subjectId" placeholder="二级分类">
                <el-option
                    v-for="subject in subjectTwoList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id"/>
            </el-select>
        </el-form-item>


        <!-- 商品厂商 TODO -->
        <!-- 商品厂商 -->
        <el-form-item label="商品厂商">
        <el-select
            v-model="shoeInfo.manufacturerId"
            placeholder="请选择">

            <el-option
                v-for="manufacturer in manufacturerList"
                :key="manufacturer.id"
                :label="manufacturer.name"
                :value="manufacturer.id"/>

        </el-select>
        </el-form-item>


        <!-- 商品简介 TODO -->
        <!-- 商品简介-->
        <el-form-item label="商品简介">
            <tinymce :height="400" v-model="shoeInfo.description" ref="knowledgeText"/>
        </el-form-item>

        <!-- 穿搭精选视频-->
        <el-form-item label="穿搭精选视频">
        <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/bsvod/video/uploadAlyiVideo'"
            :limit="1"
            class="upload-demo">
        <el-button size="small" type="primary">上传视频</el-button>
        <el-tooltip placement="right-end">
            <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
            <i class="el-icon-question"/>
        </el-tooltip>
        </el-upload>
        </el-form-item>

        <!-- 商品封面 TODO -->
        <!-- 商品封面-->
        <el-form-item label="商品封面">

            <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API+'/bsoss/fileoss'"
                class="avatar-uploader">
                <img :src="shoeInfo.cover">
            </el-upload>

        </el-form-item>

        <el-form-item label="商品价格">
            <el-input-number :min="0" v-model="shoeInfo.price" controls-position="right"/> 元
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>
<script>
import shoe from '@/api/manufacturer/shoe'
import video from '@/api/manufacturer/video'
import subject from '@/api/manufacturer/subject'
import Tinymce from '@/components/Tinymce' 

export default {
    components: { Tinymce },
    data() {
        return {
            saveBtnDisabled:false,
            shoeInfo:{
                shoeName: '',
                subjectId: '',//二级分类id
                subjectParentId:'',//一级分类id
                manufacturerId: '',
                description: '',
                version:'',
                cover: '/static/01.jpg',
                price: 0
            },
            video: {
                sort: 0,
                videoSourceId: '',
                videoOriginalName:''//视频名称
            },
            fileList: [],//上传文件列表
            shoeId:'',
            BASE_API: process.env.BASE_API, // 接口API地址
            manufacturerList:[],//封装所有的厂商
            subjectOneList:[],//一级分类
            subjectTwoList:[]//二级分类
        }   
    },
    created() {
        this.init()
        
    },
    //监听路由是否发生变化
     watch:{
        $route(to, from) {
            this.init()
            this.$refs.contentText.initTinymce();
        }
    },
    methods:{
        handleVodRemove(){
            //调用接口的删除视频的方法
            video.deleteVideo(this.video.videoSourceId)
                .then(response => {
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除视频成功!'
                    });
                    //把文件列表清空
                    this.fileList = []
                    //把video视频id和视频名称值清空
                    //上传视频id赋值
                    this.video.videoSourceId = ''
                    //上传视频名称赋值
                    this.video.videoOriginalName = ''
                })

        },
        beforeVodRemove(file, fileList){
            return this.$confirm(`确认移出${file.name}?`)
        },
        //上传视频成功调用的方法
        handleVodUploadSuccess(response, file, fileList) {
            //上传视频id赋值
            this.video.videoSourceId = response.data.videoId
            //上传视频名称赋值
            this.video.videoOriginalName = file.name
            if(this.shoeId){
                this.video.shoeId = this.shoeId
                //将视频存入数据库
                video.addVideo(this.video)
            }
        },
        handleUploadExceed() {
            this.$message.warning('想要重新上传视频，请先删除已上传的视频')
        },
        init() {
            //获取路由id值
            if(this.$route.params && this.$route.params.id) {
                this.shoeId = this.$route.params.id
                //调用根据id查询商品的方法
                this.getInfo()
                this.getVideo()

            } else {
                this.shoeInfo={
                    shoeName: '',
                    subjectId: '',//二级分类id
                    subjectParentId:'',//一级分类id
                    manufacturerId: '',
                    description: '',
                    version:'',
                    cover: '/static/01.jpg',
                    price: 0
                }
                //初始化所有厂商
                this.getListManufacturer() 
                //初始化一级分类
                this.getOneSubject()
            }
        },
        getVideo(){
            video.getVideo(this.shoeId)
                .then(response =>{
                    this.video = response.data.video
                    console.log(this.video)
                    this.fileList=[{name:this.video.videoOriginalName}]
                })
        },
        //根据商品id查询
        getInfo() {
            shoe.getShoeInfoId(this.shoeId)
                .then(response => {
                    //在shoeInfo商品基本信息，包含 一级分类id 和 二级分类id
                    this.shoeInfo = response.data.shoeInfoVo
                    //1 查询所有的分类，包含一级和二级
                    subject.getSubjectList()
                        .then(response => {
                            //2 获取所有一级分类
                            this.subjectOneList = response.data.list
                            //3 把所有的一级分类数组进行遍历，
                            for(var i=0;i<this.subjectOneList.length;i++) {
                                //获取每个一级分类
                                var oneSubject = this.subjectOneList[i]
                                //比较当前shoeInfo里面一级分类id和所有的一级分类id
                                if(this.shoeInfo.subjectParentId == oneSubject.id) {
                                    //获取一级分类所有的二级分类
                                    this.subjectTwoList = oneSubject.children
                                }
                            }
                        })
                        //初始化所有厂商
                        this.getListManufacturer()
                })
        },
        //上传封面成功调用的方法
        handleAvatarSuccess(res, file) {
            this.shoeInfo.cover = res.data.url
        },
        //上传之前调用的方法
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        //点击某个一级分类，触发change，显示对应二级分类
        subjectLevelOneChanged(value) {
            //value就是一级分类id值
            //遍历所有的分类，包含一级和二级
            for(var i=0;i<this.subjectOneList.length;i++) {
                //每个一级分类
                var oneSubject = this.subjectOneList[i]
                //判断：所有一级分类id 和 点击一级分类id是否一样
                if(value === oneSubject.id) {
                    //从一级分类获取里面所有的二级分类
                    this.subjectTwoList = oneSubject.children
                    //把二级分类id值清空
                    this.shoeInfo.subjectId = ''
                }
            }
        },
        //查询所有的一级分类
        getOneSubject() {
            subject.getSubjectList()
                .then(response => {
                    this.subjectOneList = response.data.list
                })
        },
        //查询所有的厂商
        getListManufacturer() {
            shoe.getListManufacturer()
                .then(response => {
                    this.manufacturerList = response.data.items
                })
        },
        //添加商品
        addShoe() {
            shoe.addShoeInfo(this.shoeInfo)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: '添加商品信息成功!'
                    });
                    this.video.shoeId = response.data.shoeId
                    //将视频存入数据库
                    video.addVideo(this.video)
                    //跳转到第二步
                    this.$router.push({path:'/shoe/publish/'+response.data.shoeId})
                })
        },
        //修改商品
        updateShoe() {
            shoe.updateShoeInfo(this.shoeInfo)
                .then(response => {
                     //提示
                    this.$message({
                        type: 'success',
                        message: '修改商品信息成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/shoe/publish/'+this.shoeId})
                })
        },
        saveOrUpdate() {
            //判断合法性
            if(!this.shoeInfo.shoeName){
                this.$message({
                        type: 'error',
                        message: '添加的商品名不能为空!'
                    });
            }else if(!this.shoeInfo.subjectParentId){
                this.$message({
                        type: 'error',
                        message: '商品一级分类不能为空!'
                    });
            }else if(!this.shoeInfo.subjectId){
                this.$message({
                        type: 'error',
                        message: '商品二级分类不能为空!'
                    });
            }else if(!this.shoeInfo.manufacturerId){
                this.$message({
                        type: 'error',
                        message: '商品所属的厂商不能为空!'
                    });
            }else{
                //判断添加还是修改
                if(!this.shoeInfo.id) {
                    //添加
                    this.addShoe()
                } else {
                    this.updateShoe()
                }
            }
        }
    }
}
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>