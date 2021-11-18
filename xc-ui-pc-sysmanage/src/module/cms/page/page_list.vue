<template>
  <div>
    <!--  编写页面静态部分，即view部分-->
    <el-form :model="params">
      站点：
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="params.pageAliase" placeholder="请输入页面别名" clearable style="width: 100px;"></el-input>
      <el-button type="primary" size="small" @click="query">查询</el-button>
      <router-link class="mui-tab-item"
                   :to="{path:'/cms/page/add', query:{page: this.params.page, siteId: this.params.siteId}}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建人" width="250">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="page">
          <el-button
            size="small" type="text"
            @click="edit(page.row.pageId)">编辑
            <!--            {{page.row.pageId}}-->
          </el-button>
          <el-button
            size="small" type="text"
            @click="del(page.row.pageId)">删除
            <!--            {{page.row.pageId}}-->
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      @current-change="changePage"
      style="float: right">
    </el-pagination>
  </div>
</template>
<script>
/*编写页面静态部分，即model及vm部分*/
import * as  cmsApi from '../api/cms'

export default {
  data() {
    return {
      list: [],
      siteList: [],
      total: 0,
      params: {
        page: 1,
        size: 10,
        siteName: '',
        siteId: '',
        pageAliase: ''
      }
    }
  },
  methods: {
    querySiteSelectList: function () {
      cmsApi.site_list().then((res) => {
        console.log(res)
        this.siteList = res
      })
    },
    query: function () {
      // alert('查询')
      cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
        console.log(res)
        this.list = res.queryResult.list
        this.total = res.queryResult.total
      })
    },
    changePage: function (page) {
      this.params.page = page
      this.query()
    },
    // 编辑
    edit: function (pageId) {
      console.log(pageId)
      this.$router.push({
        path: '/cms/page/edit/' + pageId, query: {
          page: this.params.page,
          siteId: this.params.siteId
        }
      })
    },
    // 删除
    del: function (pageId) {
      console.log(pageId)
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
        cmsApi.page_del(pageId).then((res) => {
          console.log(res)
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.query()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      })
    }
  },
  created() { // created是页面还没有渲染之前，执行的动作
    this.params.page = Number.parseInt(this.$route.query.page || 1)
    this.params.siteId = this.$route.query.siteId || ''
  },
  mounted() { // mounted是页面渲染完成之后，执行的动作
    // 初始化站点列表
    this.querySiteSelectList()

    // 默认查询页面
    this.query()
  }
}
</script>
<style>
/*编写页面样式，不是必须*/
</style>
