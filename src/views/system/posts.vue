<template>
  <div class="app-container contractContainer">
    <div class="customContainer ">
      <!-- 搜索头 -->
      <div class="customHeader">
        <!-- 搜索头 -->
        <el-input
          v-model="formInline.name"
          placeholder="请输入职位"
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
          <el-table-column align="center" label="ID" prop="id" width="50" />
          <el-table-column align="center" label="职位" prop="name" />
          <el-table-column align="center" label="备注" prop="remark" />
          <el-table-column align="center" label="创建时间" prop="createdAt" />
          <el-table-column align="center" label="修改时间" prop="updatedAt" />
          <el-table-column align="center" label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="addEditClick(scope.row)">修改</el-button>
              <el-button
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
            <el-form-item label="职位" prop="name">
              <el-input v-model="saveForm.name" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="saveForm.remark" type="textarea" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="saveClick()">确认</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, del, save } from '@/api/system/posts'
export default {
  name: 'Posts',
  data() {
    return {
      list: null,
      listLoading: false,
      dialog: false,
      formInline: {
        name: ''
      },
      saveForm: {
        id: '',
        name: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    this.fetchData()
  },
  methods: {
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
      this.saveForm.name = row ? row.name : ''
      this.saveForm.remark = row ? row.remark : ''
      this.dialog = true
    },
    async delClick(id, index) {
      try {
        const ok = await this.$confirm('大佬你真的要删除吗?', '提示', { type: 'warning' })
        if (ok) {
          const data = await del({ id: id })
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
    async fetchData() {
      this.listLoading = true
      try {
        const data = await getList(this.formInline)
        if (data) {
          this.list = data.data
          this.listLoading = false
        }
      } catch {
        this.listLoading = false
        console.log('err')
      }
    },
    // 关闭弹框重置
    callOf(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
