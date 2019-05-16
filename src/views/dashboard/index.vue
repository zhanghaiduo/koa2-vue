<template>
  <div class="app-container contractContainer">
    <div class="customContainer ">
      <!-- 搜索头 -->
      <div class="customHeader">
        <!-- 搜索头 -->
        <el-input
          v-model="formInline.name"
          placeholder="请输入姓名"
          style="width:210px;"
          size="small"
          @keyup.enter.native="searchClick"
        />
        <el-button type="primary" size="small" @click="searchClick">查询</el-button>
        <el-button class="pull-right" type="primary" size="small" @click="addEditClick()">新增</el-button>
      </div>
      <br>
      <!-- 表格 -->
      <div>
        <el-table v-loading.body="listLoading" :data="list" element-loading-text="Loading" border size="mini" highlight-current-row>
          <el-table-column align="center" label="ID" prop="id" width="50" />
          <el-table-column align="center" label="名称" prop="name" width="80" />
          <el-table-column align="center" label="职位" prop="posts" width="80" />
          <el-table-column align="center" label="电话" prop="phone" width="120" />
          <el-table-column align="center" label="学校" prop="school" width="400" />
          <el-table-column align="center" label="阅读时间" width="140">
            <template slot-scope="scope">
              {{ scope.row.read_time|normalDate }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="面试时间" width="140">
            <template slot-scope="scope">
              {{ scope.row.Interview_time|normalDate }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="邮箱" prop="mail" />
          <el-table-column align="center" label="状态" prop="status_name" />
          <el-table-column align="center" label="备注1" prop="remark" />
          <el-table-column align="center" label="备注2" prop="remark2" />
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="addEditClick(scope.row)">修改</el-button>
              <el-button
                :disabled="scope.row.id===1"
                size="mini"
                type="danger"
                @click="delClick(scope.row.id,scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 弹框 -->
        <el-dialog :title="dialoTitle" :visible.sync="dialog" :inline="true" append-to-body width="400px" style="margin-top:-5vh" @close="callOf('saveForm')">
          <el-form ref="saveForm" class="resumeForm" :model="saveForm" :rules="rules">
            <el-form-item label="　姓 名" prop="name">
              <el-input v-model="saveForm.name" />
            </el-form-item>
            <el-form-item label="　职 位 " prop="posts_id">
              <el-select v-model="saveForm.posts_id">
                <el-option v-for="item in posts_list" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="　　电话">
              <el-input v-model="saveForm.phone" />
            </el-form-item>
            <el-form-item label="　　学校">
              <el-input v-model="saveForm.school" type="textarea" />
            </el-form-item>
            <el-form-item label="阅读时间">
              <el-date-picker
                v-model="saveForm.read_time"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="面试时间">
              <el-date-picker
                v-model="saveForm.Interview_time"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="　　邮箱">
              <el-input v-model="saveForm.mail" />
            </el-form-item>
            <el-form-item label="　　状态">
              <el-select v-model="saveForm.status">
                <el-option v-for="item in status_list" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="　　备注">
              <el-input v-model="saveForm.remark" type="textarea" />
            </el-form-item>
            <el-form-item label="　备注二">
              <el-input v-model="saveForm.remark2" type="textarea" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
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
import { getList, del, getPosts, save } from '@/api/dashboard/index'
export default {
  name: 'Dashboard',
  data() {
    return {
      dialoTitle: '',
      status_list: [{ name: '简历初选不过', id: 0 }, { name: '简历筛选通过', id: 1 }, { name: '已面试', id: 2 }],
      list: null,
      listLoading: false,
      dialog: false,
      posts_list: [],
      pageObj: {
        currentPage: 1,
        totalDataNumber: 0,
        pageSize: 10 // 每页多少条
      },
      formInline: {
        name: ''
      },
      saveForm: {
        id: '',
        name: '',
        posts_id: '',
        phone: '',
        school: '',
        mail: '',
        status: '',
        score: '',
        remark: '',
        read_time: '',
        Interview_time: '',
        remark2: ''
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        posts_id: [
          { required: true, message: '必填', trigger: 'change' }
        ]
      }
    }
  },
  async created() {
    await this.fetchPosts()
    this.fetchData()
  },
  methods: {
    posts_name(id) {
      return this.posts_list.find(v => id).name
    },
    async fetchPosts() {
      try {
        const data = await getPosts({})
        if (data.data) {
          this.posts_list = data.data
        }
      } catch {
        console.log('err')
      }
    },
    async saveClick() {
      try {
        const ok = await this.$refs.saveForm.validate()
        if (ok) {
          const data = await save(this.saveForm)
          this.$message({ type: 'success', message: data.msg })
          this.fetchData()
          this.dialog = false
        }
      } catch {
        console.log('err')
      }
    },
    addEditClick(row) {
      this.dialoTitle = row ? '编辑简历' : '新增简历'
      this.saveForm.id = row ? row.id : ''
      this.saveForm.name = row ? row.name : ''
      this.saveForm.posts_id = row ? row.posts_id : ''
      this.saveForm.phone = row ? row.phone : ''
      this.saveForm.school = row ? row.school : ''
      this.saveForm.mail = row ? row.mail : ''
      this.saveForm.status = row ? row.status : ''
      this.saveForm.score = row ? row.score : ''
      this.saveForm.remark = row ? row.remark : ''
      this.saveForm.remark2 = row ? row.remark2 : ''
      this.saveForm.Interview_time = row ? row.Interview_time : ''
      this.saveForm.read_time = row ? row.read_time : ''
      this.dialog = true
    },
    async delClick(id, index) {
      try {
        const ok = await this.$confirm('大佬你真的要删除吗?', '提示', { type: 'warning' })
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
          data.data.rows.forEach(val => {
            // val.posts_name = this.posts_list.find(v => val.posts_id === v.id).name
            val.status_name = this.status_list.find(v => val.status === v.id).name
          })
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
    },
    // 关闭弹框重置
    callOf(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.resumeForm{
 .el-input,.el-textarea,.el-select{
   width: 280px;
 }
}
.el-form-item{
  margin-bottom: 10px;
}
</style>
