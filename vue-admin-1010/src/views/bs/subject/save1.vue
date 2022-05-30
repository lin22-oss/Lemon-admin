<template>
  <div class="app-container">
    商品分类表单
    <el-form label-width="120px">
      <el-form-item label="商品分类名称">
        <el-input v-model="subjectInfo.title" />
      </el-form-item>
      <el-form-item label="商品分类排序">
        <el-input-number
          v-model="subjectInfo.sort"
          controls-position="right"
          min="0"
        />
      </el-form-item>

      <el-form-item label="所属分类">
        <el-select v-model="subjectInfo.parentId" placeholder="请选择">
          
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
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
import subject from "@/api/manufacturer/subject";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      subjectInfo: {
        title: "",
        sort: 0,
        parentId: "",
      },
      parentSubject:{
        title:"一级分类" ,
        id:"0"
      },
      subjectOneList: [], //一级分类
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
        this.subjectInfo = {};
        this.getOneSubject();
      }
    },
    //根据商品分类id查询的方法
    getInfo(id) {
      subject.getSubjectInfo(id).then((response) => {
        this.subjectInfo = response.data.subject;
        subject.getSubjectList().then((response) => {
          console.log(response);
          this.subjectOneList = response.data.list;
          this.subjectOneList.push(this.parentSubject)
        });
      });
    },
    saveOrUpdate() {
      //判断修改还是添加
      //根据subject是否有id
      if (!this.subjectInfo.id) {
        //添加
        this.saveSubject();
      } else {
        //修改
        this.updateSubject();
      }
    },
    //修改商品分类的方法
    updateSubject() {
      subject.updateSubjectInfo(this.subjectInfo).then((response) => {
        //提示信息
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //回到列表页面 路由跳转
        this.$router.push({ path: "/subject/list1" });
      });
    },
    //添加商品分类的方法
    saveSubject() {
      subject.addSubject(this.subjectInfo).then((response) => {
        //添加成功
        //提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //回到列表页面 路由跳转
        this.$router.push({ path: "/subject/list1" });
      });
    },
    //查询所有的一级分类
    getOneSubject() {
      subject.getSubjectList().then((response) => {
        console.log(response);
        this.subjectOneList = response.data.list;
        this.subjectOneList.push(this.parentSubject)
      });
    },
  },
};
</script>
