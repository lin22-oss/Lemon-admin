<template>
  <div class="app-container">
    厂商表单
    <el-form label-width="120px">
      <el-form-item label="厂商名称">
        <el-input
          v-model="manufacturer.name"
        />
      </el-form-item>
      <el-form-item label="厂商排序">
        <el-input-number
          v-model="manufacturer.sort"
          controls-position="right"
          min="0"
        />
      </el-form-item>
      <el-form-item label="厂商简介">
        <el-input v-model="manufacturer.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 厂商头像：TODO -->
      <!-- 厂商头像 -->
      <el-form-item label="厂商头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="manufacturer.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>

        <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 
        <input type="file" name="file"/>
      -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/bsoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import manufacturer from "@/api/manufacturer/manufacturer";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      manufacturer: {
        name: "",
        sort: 0,
        intro: "",
        avatar: "",
      },

      //上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0, //上传组件key值
      BASE_API: process.env.BASE_API, //获取dev.env.js里面地址
      saveBtnDisabled: false, // 保存按钮是否禁用,
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
    close() {
      //关闭上传弹框的方法
      this.imagecropperShow = false;
      //上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    //上传成功方法
    cropSuccess(data) {
      this.imagecropperShow = false;
      //上传之后接口返回图片地址
      this.manufacturer.avatar = data.url;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    init() {
      //判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        //从路径获取id值
        const id = this.$route.params.id;
        //调用根据id查询的方法
        this.getInfo(id);
      } else {
        //路径没有id值，做添加
        //清空表单
        this.manufacturer = {};
      }
    },
    //根据厂商id查询的方法
    getInfo(id) {
      manufacturer.getManufacturerInfo(id).then((response) => {
        this.manufacturer = response.data.manufacturer;
      });
    },
    saveOrUpdate() {
      //判断修改还是添加
      //根据manufacturer是否有id
      if (!this.manufacturer.name) {
        this.$message({
          type: "error",
          message: "厂商名不能为空!",
        });
      } else {
        if (!this.manufacturer.id) {
          //添加
          this.saveManufacturer();
        } else {
          //修改
          this.updateManufacturer();
        }
      }
    },
    //修改厂商的方法
    updateManufacturer() {
      manufacturer
        .updateManufacturerInfo(this.manufacturer)
        .then((response) => {
          //提示信息
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          //回到列表页面 路由跳转
          this.$router.push({ path: "/manufacturer/list" });
        });
    },
    //添加厂商的方法
    saveManufacturer() {
      manufacturer.addManufacturer(this.manufacturer).then((response) => {
        //添加成功
        //提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //回到列表页面 路由跳转
        this.$router.push({ path: "/manufacturer/list" });
      });
    },
  },
};
</script>
