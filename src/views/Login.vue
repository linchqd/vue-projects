<template>
  <div class="app-login">
    <el-row class="login-card">
      <div class="login-logo">DockerUI管理平台</div>
      <el-card>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="form.username" :autofocus="true" placeholder="username">
              <template slot="prepend">
                <font-awesome-icon icon="user" fixed-width></font-awesome-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="password" >
                <template slot="prepend">
                  <font-awesome-icon icon="user-lock" fixed-width></font-awesome-icon>
                </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" @click="login_submit" type="primary" style="width: 100%">登录</el-button>
          </el-form-item>
      </el-form>
      </el-card>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'dashboard',
  data () {
    return {
      loading: false,
      error_message: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 16 }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login_submit () {
      this.error_message = ''
      this.$refs['form'].validate(res => {
        if (!res) {
          return false
        }
        this.loading = true
        this.$http.post('/accounts/login/', this.form).then(res => {
          console.log(res)
        })
      })
    }
  }
}
</script>
