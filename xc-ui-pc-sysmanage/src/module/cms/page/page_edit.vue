<template>
  <div>
    <el-form :model="pageForm" ref="pageForm" :rules="pageFormRules" label-width="80px">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option v-for="item in siteList"
                     :key="item.siteId"
                     :label="item.siteName"
                     :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模板" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选择模板">
          <el-option v-for="item in templateList"
                     :key="item.templateId"
                     :label="item.templateName"
                     :value="item.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="pageAliase">
        <el-input v-model="pageForm.pageAliase" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="数据url" prop="dataUrl">
        <el-input v-model="pageForm.dataUrl" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="pageForm.pageType">
          <el-radio class="radio" label="0">静态</el-radio>
          <el-radio class="radio" label="1">动态</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.pageCreateTime">
          </el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editSubmit"> 提 交</el-button>
      <el-button type="primary" @click="go_back"> 返 回</el-button>
    </div>
  </div>
</template>
<script>
/*编写页面静态部分，即model及vm部分*/
import * as  cmsApi from '../api/cms'

export default {
  data() {
    return {
      // 站点列表
      siteList: [],
      // 模板列表
      templateList: [],
      // 页面id
      pageId: '',
      // 新增页面数据
      pageForm: {
        siteId: '',
        templateId: '',
        pageName: '',
        pageAliase: '',
        pageWebPath: '',
        pageParameter: '',
        pagePhysicalPath: '',
        dataUrl: '',
        pageType: '',
        pageCreateTime: new Date()
      },
      pageFormRules: {
        siteId: [
          {required: true, message: '请选择站点', trigger: 'blur'}
        ],
        templateId: [
          {required: true, message: '请选择模板', trigger: 'blur'}
        ],
        pageName: [
          {required: true, message: '请输入页面名称', trigger: 'blur'}
        ],
        pageWebPath: [
          {required: true, message: '请输入访问路径', trigger: 'blur'}
        ],
        pagePhysicalPath: [
          {required: true, message: '请输入物理路径', trigger: 'blur'}
        ],
        dataUrl: [
          {required: true, message: '请输入数据url', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 提交
    editSubmit() {
      this.$refs.pageForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            console.log(this.pageId)
            cmsApi.page_edit(this.pageId, this.pageForm).then((res) => {
              console.log(res)
              if (res.success) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.pageForm = res.cmsPage
                this.go_back()
              } else {
                this.$message.error('提交失败')
              }
            })
          })
        }
      })
    },
    // 返回
    go_back() {
      this.$router.push({
        path: '/cms/page/list', query: {
          page: this.$route.query.page,
          siteId: this.$route.query.siteId
        }
      })
    },
    // 初始化页面详情
    initPageInfo: function () {
      console.log('加载页面详情')
      cmsApi.page_findById(this.pageId).then((res) => {
        console.log(res)
        this.pageForm = res
      })
    },
    // 初始化站点下拉框
    querySiteSelectList: function () {
      cmsApi.site_list().then((res) => {
        console.log(res)
        this.siteList = res
      })
    },
    // 初始化模板下拉框
    queryTemplateSelectList: function () {
      cmsApi.template_list().then((res) => {
        console.log(res)
        this.templateList = res
      })
    }
  },
  created: function () {
    console.log('进入编辑页面')
    // 初始化站点列表
    this.siteList = [
      {
        siteId: '1',
        siteName: 'test'
      }
    ]

    // 模板列表
    this.templateList = [
      {
        templateId: '2',
        templateName: '轮播图'
      }
    ]

    // 初始化页面详情
    this.pageId = this.$route.params.pageId
    this.initPageInfo();
  },
  mounted() {
    // 初始化站点下拉框
    this.querySiteSelectList()
    // 初始化模板下拉框
    this.queryTemplateSelectList()

  },
}
</script>
<style>
/*编写页面样式，不是必须*/
</style>
