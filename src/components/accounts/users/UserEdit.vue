<template>
  <div class="container-fluid">
    <div class="content-title">
      <div class="content-title-goBack" @click="$router.go(-1)">
        <i class="goBack-icon"></i>
        <span>返回</span>
      </div>
      <span class="content-title-info">角色信息</span>
      <el-button v-if="userObj.is_super" type="danger" plain size="mini" @click.native="setOrMvAdmin">移除管理员</el-button>
      <el-button v-else type="danger" plain size="mini" @click.native="setOrMvAdmin">设为管理员</el-button>
      <el-button type="warning" plain size="mini" @click.native="resetPasswordShow">修改密码</el-button>
      <el-button v-if="userObj.status" type="danger" plain size="mini" @click.native="enableOrDisable">禁用</el-button>
      <el-button v-else type="success" plain size="mini" @click.native="enableOrDisable">启用</el-button>
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
              <el-button type="primary" plain size="mini" @click.native="joinGroupsShow">添加</el-button>
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
                        <el-button size="mini" plain type="warning" slot="reference">移除</el-button>
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
                        <el-button size="mini" plain type="warning">移除</el-button>
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
                        <el-button size="mini" plain type="warning">移除</el-button>
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
      <el-form ref="userUpdateFrom" :model="userUpdateFormModel" :rules="rules" label-width="100px">
        <el-form-item prop="name" label="登录名">
            <el-input placeholder="username" v-model="userUpdateFormModel.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="cname" label="姓名">
            <el-input placeholder="cname" v-model="userUpdateFormModel.cname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
            <el-input placeholder="email" v-model="userUpdateFormModel.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone_number" label="手机号码" required>
            <el-input placeholder="phone number" v-model="userUpdateFormModel.phone_number" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" plain @click.native="userUpdateFromVisible = false">取 消</el-button>
        <el-button type="primary" size="small" :loading="userUpdateFromLoading" plain @click.native="userUpdateFromSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="userModifyFormTitle" :visible.sync="userModifyFormVisible" :close-on-click-modal="false">
      <el-form ref="userModifyFrom" :model="userModifyFormModel" :rules="rules" label-width="100px">
        <template v-if="userModifyFormObj === 'resetPwd'">
          <el-form-item prop="password" label="密码">
              <el-input placeholder="密码" type="password" v-model="userModifyFormModel.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password2" label="确认密码">
              <el-input placeholder="确认密码" type="password" v-model="userModifyFormModel.password2" auto-complete="off"></el-input>
          </el-form-item>
        </template>
        <template v-else-if="userModifyFormObj === 'joinGroup'">
          <el-form-item prop="groups" label="选择用户组">
            <el-select v-model="joinGroupList" multiple clearable filterable size="small" style="width: 300px;" placeholder="选择用户组">
              <el-option v-for="item in userModifyFormModel.groups" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" plain @click.native="userModifyFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" :loading="userModifyFormLoading" plain @click.native="userModifyFromSubmit">确 定</el-button>
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
        callback()
      }
    }
    let validatePwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userModifyFormModel.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userObj: {},
      allGroups: [],
      activeName: 'hasGroups',
      userUpdateFormTitle: '更新用户',
      userUpdateFormModel: '',
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
      userModifyFormTitle: '',
      userModifyFormVisible: false,
      userModifyFormLoading: false,
      userModifyFormObj: '',
      userModifyFormModel: '',
      joinGroupList: []
    }
  },
  methods: {
    get_users (username) {
      this.$http.get(`/accounts/users/?name=${username}`).then(response => {
        this.userObj = response.res
        this.userUpdateFormModel = this.$deepCopy(this.userObj)
      }, error => {
        this.$custom_message('error', error.res)
      })
    },
    get_groups () {
      this.$http.get('/accounts/groups/').then(response => {
        this.allGroups = response.res
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
          this.$http.put('/accounts/users/', this.userUpdateFormModel).then(response => {
            this.$custom_message('success', response.res)
            this.userUpdateFromVisible = false
            if (this.userUpdateFormModel.name === this.userObj.name) {
              this.get_users(this.userUpdateFormModel.name)
            } else {
              this.$router.push({ name: 'users_userEdit', params: { name: this.userUpdateFormModel.name } })
            }
          }, error => {
            this.$custom_message('error', error.res)
          }).finally(() => {
            this.userUpdateFromLoading = false
          })
        }
      })
    },
    resetPasswordShow () {
      this.userModifyFormTitle = '重置密码'
      this.userModifyFormObj = 'resetPwd'
      this.userModifyFormModel = {
        password: '',
        password2: ''
      }
      this.userModifyFormVisible = true
    },
    joinGroupsShow () {
      this.userModifyFormTitle = '选择要加入的用户组'
      this.userModifyFormObj = 'joinGroup'
      this.userModifyFormModel = { 'groups': this.allGroups }
      this.joinGroupList = []
      for (let key in this.userObj.groups) {
        if (this.userObj.groups.hasOwnProperty(key)) {
          this.joinGroupList.push(this.userObj.groups[key].id)
        }
      }
      this.userModifyFormVisible = true
    },
    userModifyFromSubmit () {
      this.$refs.userModifyFrom.validate((pass) => {
        if (pass) {
          this.userModifyFormLoading = true
          if (this.userModifyFormObj === 'resetPwd') {
            this.modifyUser({ 'id': this.userObj.id, 'password': this.userModifyFormModel.password })
          } else if (this.userModifyFormObj === 'joinGroup') {
            this.modifyUser({ 'id': this.userObj.id, 'groups': this.joinGroupList })
          }
          this.userModifyFormVisible = false
          this.userModifyFormLoading = false
        }
      })
    },
    enableOrDisable () {
      this.$confirm('You are sure?', '提示', { type: 'warning' }).then(() => {
        this.modifyUser({ 'id': this.userObj.id, 'status': !this.userObj.status })
      }).catch(() => {})
    },
    setOrMvAdmin () {
      this.$confirm('You are sure?', '提示', { type: 'warning' }).then(() => {
        this.modifyUser({ 'id': this.userObj.id, 'is_super': !this.userObj.is_super })
      }).catch(() => {})
    },
    modifyUser (data) {
      this.$http.patch('/accounts/users/', data).then(response => {
        this.$custom_message('success', response.res)
        this.get_users(this.userObj.name)
      }, error => {
        this.$custom_message('error', error.res)
      })
    }
  },
  created () {
    this.get_users(this.$route.params.name)
    this.get_groups()
  },
  watch: {
    '$route': function () {
      this.get_users(this.$route.params.name)
    }
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
