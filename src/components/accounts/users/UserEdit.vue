<template>
  <div class="container-fluid">
    <div class="content-title">
      <div class="content-title-goBack" @click="$router.go(-1)">
        <i class="goBack-icon"></i>
        <span>返回</span>
      </div>
      <span class="content-title-info">角色信息</span>
      <el-button type="primary" plain size="mini" @click.native="userUpdateFromVisible = true">编辑</el-button>
    </div>
    <div class="content-content">
      <table class="table">
        <thead>
          <tr><th colspan="3">基本信息</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>用户ID: <span>{{ userObj.id }}</span></td>
            <td>邮箱: <span>{{ userObj.email }}</span></td>
            <td>状态: <span>{{ userObj.status | assertStatus }}</span></td>
          </tr>
          <tr>
            <td>用户名: <span>{{ userObj.name }}</span></td>
            <td>手机号码: <span>{{ userObj.phone_number }}</span></td>
            <td>创建时间: <span>{{ userObj.ctime | formatDatetime }}</span></td>
          </tr>
          <tr>
            <td>用户姓名: <span>{{ userObj.cname }}</span></td>
            <td>是否管理员: <span>{{ userObj.is_super | assertIsSuper }}</span></td>
            <td>最后登录时间: <span>{{ userObj.last_time | formatDatetime }}</span></td>
          </tr>
        </tbody>
      </table>
      <div class="content-tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户组管理" name="hasGroups">
            <div class="content-title" style="padding: 0">
              <span class="content-title-info">用户组列表</span>
              <el-button type="primary" plain size="mini">添加</el-button>
            </div>
            <div class="content-content">
              <table class="table noBorder">
                <thead>
                  <tr>
                    <th>组ID</th>
                    <th>组名称</th>
                    <th>组描述</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="JSON.stringify(this.userObj.groups) === '[]'">
                    <tr>
                      <td colspan="4" style="text-align: center">无数据</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr v-for="(item, index) in userObj.groups" :key="index">
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.desc }}</td>
                      <td>
                        <el-button size="mini" plain type="primary">详细</el-button>
                        <el-popconfirm style="padding-left: 10px;" confirmButtonText='确认' cancelButtonText='取消' icon="el-icon-info" iconColor="red" title="Are you sure?">
                          <el-button size="mini" plain type="warning" slot="reference">移除</el-button>
                        </el-popconfirm>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关联的角色" name="hasRoles">
            <div class="content-title" style="padding: 0">
              <span class="content-title-info">角色列表</span>
              <el-button type="primary" plain size="mini">添加</el-button>
            </div>
            <div class="content-content">
              <table class="table noBorder">
                <thead>
                  <tr>
                    <th>角色ID</th>
                    <th>角色名称</th>
                    <th>角色描述</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="JSON.stringify(this.userObj.roles) === '[]'">
                    <tr>
                      <td colspan="4" style="text-align: center">无数据</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr v-for="(item, index) in userObj.roles" :key="index">
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.desc }}</td>
                      <td>
                        <el-button size="mini" plain type="primary">详细</el-button>
                        <el-popconfirm style="padding-left: 10px;" confirmButtonText='确认' cancelButtonText='取消' icon="el-icon-info" iconColor="red" title="Are you sure?">
                          <el-button size="mini" plain type="warning" slot="reference">移除</el-button>
                        </el-popconfirm>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="拥有的权限" name="hasPermissions">
            <div class="content-title" style="padding: 0">
              <span class="content-title-info">权限列表</span>
              <el-button type="primary" plain size="mini">添加</el-button>
            </div>
            <div class="content-content">
              <table class="table noBorder">
                <thead>
                  <tr>
                    <th>权限ID</th>
                    <th>权限名称</th>
                    <th>权限描述</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="JSON.stringify(this.userObj.permissions) === '[]'">
                    <tr>
                      <td colspan="4" style="text-align: center">无数据</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr v-for="(item, index) in userObj.permissions" :key="index">
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.desc }}</td>
                      <td>
                        <el-button size="mini" plain type="primary">详细</el-button>
                        <el-popconfirm style="padding-left: 10px;" confirmButtonText='确认' cancelButtonText='取消' icon="el-icon-info" iconColor="red" title="Are you sure?">
                          <el-button size="mini" plain type="warning" slot="reference">移除</el-button>
                        </el-popconfirm>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog :title="userUpdateFormTitle" :visible.sync="userUpdateFromVisible" :close-on-click-modal="false">
        <el-form ref="userUpdateFrom" :model="userUpdateFromModel" :rules="rules" label-width="80px">
          <el-form-item prop="name" label="登录名">
              <el-input placeholder="username" v-model="userUpdateFromModel.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="cname" label="姓名">
              <el-input placeholder="cname" v-model="userUpdateFromModel.cname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
              <el-input placeholder="email" v-model="userUpdateFromModel.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="phone_number" label="手机号码" required>
              <el-input placeholder="phone number" v-model="userUpdateFromModel.phone_number" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" size="small" plain @click.native="userUpdateFromVisible = false">取 消</el-button>
          <el-button type="primary" size="small" :loading="userUpdateFromLoading" plain @click.native="userUpdateFromSubmit">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import dateFormat from '../../../libs/formatDatetime.js'
export default {
  name: 'userEdit',
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
      userObj: {},
      activeName: 'hasGroups',
      userUpdateFormTitle: '更新用户',
      userUpdateFromVisible: false,
      userUpdateFromLoading: false,
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
        password2: [
          { validator: validatePwd2, trigger: 'blur' }
        ]
      },
      userUpdateFromModel: {
        id: Number,
        name: '',
        cname: '',
        email: '',
        phone_number: ''
      }
    }
  },
  methods: {
    get_users (username) {
      this.$http.get(`/accounts/users/?name=${username}`).then(response => {
        this.userObj = response.res
        for (let item in this.userUpdateFromModel) {
          if (this.userObj.hasOwnProperty(item)) {
            this.userUpdateFromModel[item] = this.userObj[item]
          }
        }
      }, error => {
        this.$custom_message('error', error.res)
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    userUpdateFromSubmit () {
      this.$refs.userUpdateFrom.validate((pass) => {
        if (pass) {
          this.userUpdateFromLoading = true
          this.$http.put('/accounts/users/', this.userUpdateFromModel).then(response => {
            this.$custom_message('success', response.res)
            this.userUpdateFromVisible = false
            this.get_users(this.userObj.name)
          }, error => {
            this.$custom_message('error', error.res)
          }).finally(() => {
            this.userUpdateFromLoading = false
          })
        }
      })
    }
  },
  created () {
    this.get_users(this.$route.params.name)
  },
  filters: {
    assertStatus: (val) => {
      if (val === true) {
        return '正常'
      } else {
        return '禁用'
      }
    },
    assertIsSuper: (val) => {
      if (val === true) {
        return '是'
      } else {
        return '否'
      }
    },
    formatDatetime: (time) => {
      let date = new Date(time)
      return dateFormat.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>
