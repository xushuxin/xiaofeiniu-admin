<template>
  <div class="Settings">
    <el-breadcrumb>
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>全局设置</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-card shadow="never">
      <el-form label-width="150px" v-model="formData">
        <el-form-item label="应用名称：">
          <el-input v-model="formData.appName"></el-input>
        </el-form-item>
        <el-form-item label="应用API网址：">
          <el-input v-model="formData.apiUrl"></el-input>
        </el-form-item>
        <el-form-item label="后台管理端网址：">
          <el-input v-model="formData.adminUrl"></el-input>
        </el-form-item>
        <el-form-item label="客户端App网址：">
          <el-input v-model="formData.appUrl"></el-input>
        </el-form-item>
        <el-form-item label="ICP备案号：">
          <el-input v-model="formData.icp"></el-input>
        </el-form-item>
        <el-form-item label="版权声明：">
          <el-input v-model="formData.copyright"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSave">保存修改</el-button>
          <el-button @click="doCancel">取消修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return{
      formData:{
        appName:'',
        apiUrl:'',
        adminUrl:'',
        appUrl:'',
        icp:'',
        copyright:'',
      }
    }
  },
  created(){
    //引用复制，两个变量指向同一个对象
    // this.formData=this.$store.state.globalSettings;
    this.formData.appName=this.$store.state.globalSettings.appName;
    this.formData.apiUrl=this.$store.state.globalSettings.apiUrl;
    this.formData.adminUrl=this.$store.state.globalSettings.adminUrl;
    this.formData.appUrl=this.$store.state.globalSettings.appUrl;
    this.formData.icp=this.$store.state.globalSettings.icp;
    this.formData.copyright=this.$store.state.globalSettings.copyright;
  },
  methods:{
    doSave(){
      var url=this.$store.state.globalSettings.apiUrl+'/admin/settings';
      this.$axios.put(url,this.formData).then(res=>{
        res.data.code==200?this.$message.success('全局设置修改成功'):this.$message.error('全局设置修改失败')
        // 修改$store中的全局设置；
        this.$store.commit('setGlobalSettings',JSON.parse(JSON.stringify(this.formData)));
      }).catch(err=>{
        console.log(err)
      })
    },
    doCancel(){
      this.formData.appName=this.$store.state.globalSettings.appName;
      this.formData.apiUrl=this.$store.state.globalSettings.apiUrl;
      this.formData.adminUrl=this.$store.state.globalSettings.adminUrl;
      this.formData.appUrl=this.$store.state.globalSettings.appUrl;
      this.formData.icp=this.$store.state.globalSettings.icp;
      this.formData.copyright=this.$store.state.globalSettings.copyright;
    }
  }
}
</script>
