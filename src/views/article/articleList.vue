<template>
  <div class="app-container contractContainer">
    <div class="customContainer ">
      <!-- 搜索头 -->
      <div class="customHeader">
        <!-- 搜索头 -->
        <el-input
          v-model="formInline.title"
          placeholder="请输入文章标题"
          style="width:210px;"
          size="small"
          @keyup.enter.native="searchClick"
        />
        <el-button type="primary" size="small" @click="searchClick">查询</el-button>
      </div>
      <br>
      <div>
        <!-- 表格 -->
        <el-table v-loading.body="listLoading" :data="list" element-loading-text="Loading" border size="mini">
          <el-table-column align="center" label="序号" width="50">
            <template slot-scope="scope">
              <span class="indexColor">{{ scope.$index+1+(pageObj.currentPage-1)*pageObj.pageSize }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="文章标题">
            <template slot-scope="scope">
              <el-button type="text" @click="showClick(scope.row,0)">{{ scope.row.title }}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="作者" prop="author" />
          <el-table-column align="center" label="创建时间" prop="createdAt" />
          <el-table-column align="center" label="修改时间" prop="updatedAt" />
          <el-table-column align="center" label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="showClick(scope.row,1)">修改</el-button>
              <el-button size="mini" type="danger" @click="delClick(scope.row.id,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 弹框 -->
        <el-dialog title="查看文章" :visible.sync="showDialog" append-to-body>
          <div v-if="!is_edit" v-html="content" />
          <div v-if="is_edit">
            <div style="margin-bottom:20px;">
              <el-input v-model="saveForm.name" placeholder="请输入标题" style="width:300px;" />
            </div>
            <froala v-model="saveForm.content" :tag="'textarea'" :config="config" />
          </div>
          <div v-if="is_edit" slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="saveClick()">确认</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <br>
    <!-- 自定义底部 -->
    <div class="bottom_box">
      <el-pagination
        :current-page="pageObj.currentPage"
        :page-sizes="[5, 10,20, 50, 100]"
        :page-size="pageObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageObj.totalDataNumber"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getList, del } from '@/api/article/articleList'
export default {
  name: 'ArticleList',
  data() {
    return {
      content: '',
      baseUrl: 'http://127.0.0.1:3000',
      list: null,
      listLoading: false,
      is_edit: false,
      showDialog: false,
      pageObj: {
        currentPage: 1,
        totalDataNumber: 0,
        pageSize: 5 // 每页多少条
      },
      formInline: {
        title: ''
      },
      saveForm: {
        id: '',
        name: '',
        content: ''
        // author: JSON.parse(localStorage.getItem('USER_INFO')).nick
      },
      config: { // 编辑器的初始化信息
        imageUploadURL: `http://127.0.0.1:3000/article/upload`,
        imageUploadParams: { name: 'zq' },
        height: 360,
        events: {
          // 'froalaEditor.image.beforeUpload': (e, editor, images) => {
          //   console.log(editor.opts)
          // },
          'froalaEditor.image.uploaded': (e, editor, response) => {
            this.$message({ type: 'success', message: '上传成功' })
          },
          'froalaEditor.image.inserted': (e, editor, $img, response) => {
            this.$message({ type: 'success', message: '插入成功' })
          },
          'froalaEditor.image.replaced': (e, editor, $img, response) => {
            this.$message({ type: 'success', message: '替换成功' })
          },
          'froalaEditor.image.error': (e, editor, error, response) => {
            alert('失败')
          }
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    saveClick() {
      if (this.saveForm.content === '' || this.saveForm.name === '') {
        this.$message({ type: 'error', message: '大佬，把信息填完' })
        return
      }
    },
    showClick(row, is_edit) {
      this.is_edit = !!is_edit
      this.saveForm.name = row.name
      this.saveForm.id = row.id
      this.saveForm.content = row.content
      this.content = row.content
      this.showDialog = true
    },
    async delClick(id, index) {
      console.log(id)
      try {
        const ok = await this.$confirm('大佬你真的要删除这篇文章吗?', '提示', { type: 'warning' })
        if (ok) {
          const data = await del({ id: id })
          console.log(data)
          this.$message({ type: 'success', message: data.msg })
          this.list.splice(index, 1)
        }
      } catch {
        console.log('err')
      }
    },
    searchClick() {
      this.fetchData()
    },
    // 列表获取
    async fetchData(val = 1) {
      this.listLoading = true
      this.pageObj.currentPage = val
      const d = { ...this.pageObj, ...this.formInline }
      try {
        const data = await getList(d)
        if (data.data) {
          this.list = data.data.rows
          this.pageObj.totalDataNumber = data.data.count
          this.listLoading = false
        }
      } catch {
        this.listLoading = false
        console.log('err')
      }
    },
    handleSizeChange(val) {
      this.pageObj.pageSize = val
      this.fetchData()
    },
    // 分页
    handleCurrentChange(val) {
      this.fetchData(val)
    }
  }
}
</script>
