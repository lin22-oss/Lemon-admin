<template>
  <div class="app-container">
    会员表单
    <el-form label-width="120px">
      <el-form-item label="会员昵称">
        <el-input v-model="ucenter.nickname" readonly />
      </el-form-item>

      <el-form-item label="会员手机号">
        <el-input v-model="ucenter.mobile" readonly/>
      </el-form-item>

      <el-form-item label="会员年龄">
        <el-input v-model="ucenter.age" readonly/>
      </el-form-item>

      <el-form-item label="会员简介">
        <el-input v-model="ucenter.sign" :rows="10" type="textarea" readonly/>
      </el-form-item>

      <el-form-item label="会员头像">
        <pan-thumb :image="ucenter.avatar" readonly/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ucenter from "@/api/ucenter";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      ucenter: {},
    };
  },
  created() {
    //页面渲染之前执行
    this.init();
  },
  watch: {
    //监听
    $route(to, from) {
      //路由变化方式，路由发生变化，方法就会执行
      this.init();
    },
  },
  methods: {
    init() {
      //判断路径有id值,做修改
      const id = this.$route.params.id;
      //调用根据id查询的方法
      this.getInfo(id);
    },
    //根据会员id查询的方法
    getInfo(id) {
      ucenter.getUcenterInfo(id).then((response) => {
        this.ucenter = response.data.ucenterMember;
      });
    },
  },
};
</script>
