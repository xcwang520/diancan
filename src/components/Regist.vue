<template>
  <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="0px" class="demo-form login-container">
    <h3 class="title">注册</h3>
    <el-form-item prop="name">
      <el-input type="text" v-model="form.name" auto-complete="off" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input type="text" v-model="form.email" auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="department">
      <el-select v-model="form.department" placeholder="请选择部门">
        <el-option
          v-for="item in departments"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="loading">注册</el-button>
    </el-form-item>
    <el-row>
      <a class="regist" href="#login">登录</a>
    </el-row>
  </el-form>
</template>

<script>
  import { regist, getDepartments } from '../api/api';
  import NProgress from 'nprogress'
  export default {
    data() {
      return {
        loading: false,
        departments: [],
        form: {
          name: '王学成',
          email: 'xuecheng.wang@docqian.com',
          department: null
        },
        rules: {
          name: [
            { required: true, pattern: /^[\u4e00-\u9fa5]{2,3}$/, message: '请输入真实姓名', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'string', pattern: /^[a-z]+\.[a-z]+@(docqian|cloudscreen).com$/, message: '请输入正确的员工邮箱', trigger: 'blur' }
          ],
          department: [
            { type: 'number', required: true, message: '请选一个部门', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      initDepartments() {
        getDepartments().then(data => {
          this.departments = data;
        });
      },
      handleSubmit(ev) {
        var _this = this;
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true;
            NProgress.start();
            regist(this.form).then(data => {
              this.loading = false;
              NProgress.done();
              let { msg, code } = data;
              if (code !== 200) {
                this.$notify({
                  title: '错误',
                  message: msg,
                  type: 'error'
                });
              } else {
                this.$notify({
                  title: '成功',
                  message: "注册成功,密码发送到你的邮箱,请用户密码登录",
                  type: 'success'
                });
                _this.$router.replace('/login');
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted() {
      this.initDepartments();
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .forgot {
      float: right;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
