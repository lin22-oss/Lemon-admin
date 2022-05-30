<template>
  <div class="app-container">
    商品分类列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="subjectQuery.name" placeholder="商品分类名"/>
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
        width="100"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="类别名称" width="160" />

      <el-table-column label="分类级别" width="160">
        <template slot-scope="scope">
          {{ scope.row.parentId==0?'一级分类':'二级分类' }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" width="240"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/subject/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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
//引入调用subject.js文件
import subject from '@/api/manufacturer/subject'

export default {
    //写核心代码位置
    // data:{
    // },
    data() { //定义变量和初始值
        return {
          list:null,//查询之后接口返回集合
          page:1,//当前页
          limit:10,//每页记录数
          total:0,//总记录数
          subjectQuery:{} //条件封装对象
        }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getList() 
    },
    methods:{  //创建具体的方法，调用teacher.js定义的方法
        //商品分类列表的方法
        getList(page=1) {
            this.page = page
            subject.getSubjectListPage(this.page,this.limit,this.subjectQuery)
                .then(response =>{//请求成功
                    //response接口返回的数据
                    // console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                }) 
        },
        resetData() {//清空的方法
            //表单输入项数据清空
            this.subjectQuery = {}
            //查询所有商品分类数据
            this.getList()
        },
        //删除商品分类的方法
        removeDataById(id) {
            this.$confirm('此操作将永久删除商品分类记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                subject.deleteSubjectId(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //回到列表页面
                    this.getList()
                })
            }) //点击取消，执行catch方法
        }
 
    }
}
</script>
