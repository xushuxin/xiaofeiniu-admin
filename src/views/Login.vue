<template>
  <div class="login">
    <el-card class="xfn-login-card">
      <div slot="header">管理员登录</div>
      <div>
        <el-form label-width="85px">
          <el-form-item label="管理员名：">
            <el-input placeholder="请输入管理员名" v-model="formData.aname" @keyup.enter.native="doLogin"></el-input>
          </el-form-item>
          <el-form-item label="登录密码：">
            <el-input type="password" placeholder="请输入管理员密码" v-model="formData.apwd" @keyup.enter.native="doLogin"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doLogin">登录</el-button>
            <el-button @click="doCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script scope>
export default {
  data() {
    //普通组件的模型数据是函数返回值
    return {
      formData: {
        //表单中用户输入的两个数据
        aname: "admin",
        apwd: "123456"
      }
    };
  },
  methods: {
    doLogin() {
      //执行登录
      var aname = this.formData.aname;
      var apwd = this.formData.apwd;
      var url =this.$store.state.globalSettings.apiUrl + `/admin/login/${aname}/${apwd}`;
      if (aname.trim() != "" && apwd.trim() != "") {
        this.$axios
          .get(url)
          .then(res => {
            if (res.data.code == 200) {
              this.$store.commit("setAdminName", aname);
              this.$router.push("/main");
            } else {
              this.$alert("用户名或密码错误", "登录失败", {
                type: "error"
                // ,showClose: false//不显示X
              }).then(()=>{}).catch(()=>{});//点击X调用catch
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    doCancel() {
      //清除用户的输入
      this.formData.aname = "";
      thi.formData.apwd = "";
    }
  },
  mounted() {
    //当前组件挂载完成后需要异步请求全局配置数据
    var url = this.$store.state.globalSettings.apiUrl + "/admin/settings";
    this.$axios
      .get(url)
      .then(res => {
        this.$store.commit("setGlobalSettings", res.data); //将全局设置存储到Vuex存储仓库
      })
      .catch(err => {
        console.log(err);
      });
    window.onkeyup=function(){

    }
  }
};
</script>

<style lang="scss">
.xfn-login-card {
  width: 450px;
  margin: 200px auto;
  .el-card__header {
    text-align: center;
    font-size: 1.5em;
  }
}
</style>
