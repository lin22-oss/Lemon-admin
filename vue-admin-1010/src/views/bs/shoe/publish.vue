<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新商品</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写商品基本信息"/>
      <el-step title="发布商品"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="shoePublish.cover">
      <div class="main">
        <h2>{{ shoePublish.shoeName }}</h2>
        <p><span>所属分类：{{ shoePublish.subjectLevelOne }} — {{ shoePublish.subjectLevelTwo }}</span></p>
        <p>商品厂商：{{ shoePublish.manufacturerName }}</p>
        <h3 class="red">￥{{ shoePublish.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布商品</el-button>
    </div>
  </div>
</template>

<script>
import shoe from '@/api/manufacturer/shoe'
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      shoeId:'',
      shoePublish:{}
    }
  },
  
  created() {
    //获取路由商品id值
    if(this.$route.params && this.$route.params.id) {
      this.shoeId = this.$route.params.id
      //调用接口方法根据商品id查询
      this.getShoePublishId()
    }
  },
    //监听路由是否发生变化
     watch:{
        $route(to, from) {
            if(this.$route.params && this.$route.params.id) {
                this.shoeId = this.$route.params.id
                //调用接口方法根据商品id查询
                this.getShoePublishId()
            }
        }
    },
  methods: {

    //根据商品id查询
    getShoePublishId() {
      shoe.getPublihShoeInfo(this.shoeId)
        .then(response => {
          this.shoePublish = response.data.publishShoe
        })
    },
    previous() {
      console.log('previous')
      this.$router.push({path:'/shoe/info/'+this.shoeId})
    },

    publish() {
      shoe.publihShoe(this.shoeId)
        .then(response => {
          //提示
          this.$message({
              type: 'success',
              message: '商品发布成功!'
          });
          //跳转商品列表页面
          this.$router.push({ path: '/shoe/list' })
        })
      
    }
  }
}
</script>

<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 400px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>