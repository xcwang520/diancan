<template lang="html">
  <el-row>
    <el-collapse accordion>
      <el-collapse-item title="密码管理" name="1">
        <el-form label-position="left" label-width="80px">
          <el-form-item label="新密码">
            <el-input v-model="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="changePass">立即修改</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="订阅管理" name="2">
        <div>
          <el-switch
            v-model="subscribe"
            on-text="开"
            off-text="关">
          </el-switch>
        </div>
        <div>打开订阅之后,每个工作日的下午四点你将会收到邮件订餐提醒。</div>
      </el-collapse-item>
    </el-collapse>
  </el-row>
</template>

<script>
import { updatePassword } from '../../api/api'
export default {
  data() {
    return {
      password: "",
      subscribe: false
    }
  },
  methods: {
    changePass() {
      if(this.password == "") return;
      updatePassword({password: this.password}).then(data => {
        if(data.code == 200) {
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: 'success'
          });
          this.password = "";
        }
      });
    }
  }
}
</script>

<style lang="scss">
</style>
