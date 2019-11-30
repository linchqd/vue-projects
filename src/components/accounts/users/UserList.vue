<template>
  <div class="container-fluid">
    <div class="content-title">
      <span>用户列表</span>
      <el-input size="mini" clearable placeholder="输入任意字段过滤" v-model="search" class="content-search"></el-input>
      <el-button type="primary" plain size="mini" @click.native="dialogFormVisible = true">添加</el-button>
      <el-button type="danger" plain size="mini" :disabled="disabled">删除</el-button>
    </div>
    <div class="content-content">
      <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="user_list.filter(filterUserTable)" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="60"></el-table-column>
        <el-table-column prop="name" label="用户名" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cname" label="用户别名" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="is_super" label="管理员" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.is_super" style="color:green">是</span>
            <span v-else style="color:#409EFF">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status" style="color:#409EFF">正常</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone_number" label="手机号码" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" plain type="primary" @click="handleEdit(scope.$index, scope.row)">管理</el-button>
            <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
      </el-pagination>
      <!--   dialog   -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
        <el-form ref="user_add_form" :model="user_add_form" :rules="rules" label-width="80px">
          <el-form-item prop="name" label="登录名">
              <el-input placeholder="请输入" v-model="user_add_form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="cname" label="姓名">
              <el-input placeholder="请输入" v-model="user_add_form.cname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码" required>
              <el-input placeholder="请输入" type="password" v-model="user_add_form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password2" label="确认密码" required>
              <el-input placeholder="请输入" type="password" v-model="user_add_form.password2" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
              <el-input placeholder="请输入" v-model="user_add_form.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="phone_number" label="电话" required>
              <el-input placeholder="请输入" v-model="user_add_form.phone_number" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" size="small" plain @click.native="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" size="small" :loading="submit_loading" plain @click.native="user_add_form_submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'accounts',
  data () {
    let checkPhone = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        let mobile = /^1[34578]\d{9}$/
        if (!mobile.test(value)) {
          callback(new Error('手机号不正确'))
        } else {
          callback()
        }
      }, 1000)
    }
    let validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.user_add_form.password2 !== '') {
          this.$refs.user_add_form.validateField('password2')
        }
        callback()
      }
    }
    let validatePwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user_add_form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      disabled: true,
      search: '',
      user_list: [],
      select_items: [],
      dialogFormVisible: false,
      submit_loading: false,
      user_add_form: {
        name: '',
        cname: '',
        password: '',
        password2: '',
        email: '',
        phone_number: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        cname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone_number: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        password: [
          { validator: validatePwd, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePwd2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    get_users () {
      this.$http.get('/accounts/users/').then(response => {
        this.user_list = response.res
      }, error => {
        this.$custom_message('error', error.res)
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      // if (val.length > 0) {
      //   val.forEach(item => {
      //     this.multipleSelection.push(item.id)
      //   })
      // } else {
      //   this.multipleSelection = []
      // }
      // console.log(this.multipleSelection)
      // this.disabled = !this.multipleSelection.length > 0
    },
    handleSelect (val) {
      if (val.length > 0) {
        val.forEach(item => {
          this.multipleSelection.push(item.id)
        })
      } else {
        this.multipleSelection = []
      }
      console.log(this.multipleSelection)
      this.disabled = !this.multipleSelection.length > 0
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    filterUserTable (data) {
      return !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()
      ) || data.cname.toLowerCase().includes(this.search.toLowerCase()
      ) || data.email.toLowerCase().includes(this.search.toLowerCase()
      ) || data.phone_number.toLowerCase().includes(this.search.toLowerCase())
    },
    user_add_form_submit () {
      this.$refs.user_add_form.validate((pass) => {
        if (pass) {
          this.submit_loading = true
          this.$http.post('/accounts/users/', this.user_add_form).then(response => {
            this.$custom_message('success', response.res)
            this.dialogFormVisible = false
            this.get_users()
          }, error => {
            this.$custom_message('error', error.res)
          }).finally(() => {
            this.submit_loading = false
          })
        }
      })
    }
  },
  created () {
    this.get_users()
  }
}
</script>
<style>
.container-fluid {
  padding: 0 16px;
}
.app-content .content-title {
  padding: 16px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.app-content .content-title > span {
  font-size: 16px;
  flex: 1 1 auto;
  border-left: 2px solid #88B7E0;
  padding-left: 5px;
}
.app-content .content-title .content-search {
  width: 150px !important;
  margin-right: 10px;
}
</style>
