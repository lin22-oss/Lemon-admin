<template>
  <div class="app-container">
    会员列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="ucenterQuery.name" placeholder="会员昵称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="ucenterQuery.status" clearable placeholder="会员状态">
          <el-option value="1" label="已禁用"/>
          <el-option value="0" label="未禁用"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="ucenterQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="ucenterQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
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

      <el-table-column prop="nickname" label="昵称" width="200" />

      <el-table-column label="是否被禁用" width="200">
        <template slot-scope="scope">
          {{ scope.row.isDisabled==false?'未禁用':'已禁用' }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" width="320"/>

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/ucenter/query/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-search">查看</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-circle-close" @click="removeDataById(scope.row.id)">禁用</el-button>
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
//引入调用ucenter.js文件
import ucenter from '@/api/ucenter'

export default {
    //写核心代码位置
    // data:{
    // },
    data() { //定义变量和初始值
        return {
          list:null,//查询之后接口返回集合
          page:1,//当前页
          limit:7,//每页记录数
          total:0,//总记录数
          ucenterQuery:{} //条件封装对象
        }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getList() 
    },
    methods:{  //创建具体的方法，调用teacher.js定义的方法
        //厂商列表的方法
        getList(page=1) {
            this.page = page
            ucenter.getUcenterListPage(this.page,this.limit,this.ucenterQuery)
                .then(response =>{//请求成功
                    //response接口返回的数据
                    //console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                }) 
        },
        resetData() {//清空的方法
            //表单输入项数据清空
            this.ucenterQuery = {}
            //查询所有厂商数据
            this.getList()
        },
        //删除厂商的方法
        removeDataById(id) {
            this.$confirm('此操作将永久禁用会员记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                ucenter.deleteUcenterId(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '禁用成功!'
                    });
                    //回到列表页面
                    this.getList()
                })
            }) //点击取消，执行catch方法
        }
 
    }
}
</script>
