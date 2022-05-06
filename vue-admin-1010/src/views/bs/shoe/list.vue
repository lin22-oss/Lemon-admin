<template>
  <div class="app-container">
    商品列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="shoeQuery.name" placeholder="商品名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="shoeQuery.status" clearable placeholder="商品状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="shoeName" label="商品名称" width="700" />

      <el-table-column label="商品状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status==='Normal'?'已发布':'未发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" width="300"/>

      <el-table-column prop="viewCount" label="浏览数量" width="60" />

      <el-table-column label="操作" width="400" align="center">
        <template slot-scope="scope">
          <router-link :to="'/shoe/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑商品基本信息</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除商品信息</el-button>
        </template>
      </el-table-column>
    </el-table>

  <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>

import shoe from '@/api/manufacturer/shoe'

export default {
    //写核心代码位置
    // data:{
    // },
    data() { //定义变量和初始值
        return {
          list:null,//查询之后接口返回集合
          page:1,//当前页
          limit:5,//每页记录数
          total:0,//总记录数
          shoeQuery:{} //条件封装对象
        }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getList() 
    },
    methods:{  //创建具体的方法，调用teacher.js定义的方法
        //讲师列表的方法
        getList(page = 1) {
            this.page = page
            shoe.getListShoePage(this.page,this.limit, this.shoeQuery)
                .then(response =>{//请求成功
                    //response接口返回的数据
                    this.list = response.data.rows
                    this.total = response.data.total
                }) 
        },
        resetData() {//清空的方法
            //表单输入项数据清空
            this.shoeQuery = {}
            //查询所有讲师数据
            this.getList()
        },
        //删除商品信息
        removeDataById(id) {
          this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                shoe.removeDataById(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除商品成功!'
                    });
                    //刷新页面
                    this.getList() 
                })
            }) //点击取消，执行catch方法
        }

        
 
    }
}
</script>
