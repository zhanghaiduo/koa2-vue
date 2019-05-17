<template>
  <div class="app-container contractContainer">
    <div class="customContainer ">
      <!-- 搜索头 -->
      <div class="customHeader">
        <!-- 搜索头 -->
        <el-input
          v-model="formInline.name"
          placeholder="请输入姓名"
          style="width:200px;"
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
          <el-table-column align="center" label="序号" width="50">
            <template slot-scope="scope">
              <span class="indexColor">{{ scope.$index+1+(pageObj.currentPage-1)*pageObj.pageSize }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="姓名" prop="name" />
          <el-table-column align="center" label="账号" prop="username" />
          <el-table-column align="center" label="部门" prop="posts_name" />
          <el-table-column align="center" label="创建时间" prop="createdAt" />
          <el-table-column align="center" label="修改时间" prop="updatedAt" />
          <el-table-column align="center" label="操作" width="150">
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
        <el-dialog title="详情" :visible.sync="dialog" append-to-body width="350px" @close="callOf('saveForm')">
          <el-form ref="saveForm" :model="saveForm" :rules="rules">
            <el-form-item label="账号" prop="username">
              <el-input v-model="saveForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="saveForm.password" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="saveForm.name" />
            </el-form-item>
            <el-form-item label="职位" prop="posts_id">
              <br>
              <el-select v-model="saveForm.posts_id">
                <el-option v-for="item in posts_list" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
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
import { getList, del, getPosts, save } from '@/api/system/userList'
import { validUsername } from '@/utils/validate'
export default {
  name: 'UserList',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('输入正常的账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不小于6位'))
      } else {
        callback()
      }
    }
    return {
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
        username: '',
        password: '',
        name: '',
        posts_id: ''
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        posts_id: [
          { required: true, message: '必选', trigger: 'change' }
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
      this.saveForm.id = row ? row.id : ''
      this.saveForm.username = row ? row.username : ''
      this.saveForm.password = row ? row.password : ''
      this.saveForm.name = row ? row.name : ''
      this.saveForm.posts_id = row ? row.posts_id : ''
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
            val.posts_name = this.posts_list.find(v => val.posts_id === v.id).name
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
