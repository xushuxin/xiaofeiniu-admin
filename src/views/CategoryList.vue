<template>
  <div class="xfn-category-list">
    <el-breadcrumb>
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜品类别</el-breadcrumb-item>
      <el-breadcrumb-item>类别列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-button type="primary" @click="addCategory">添加新的菜品类别</el-button>
    <br><br>
    <el-table :data="categoryList" stripe border>
      <el-table-column label="编号" prop="cid"></el-table-column>
      <el-table-column label="名称" prop="cname"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="updateCategory(row,$index)">修改</el-button>
          <el-button type="danger" size="mini" @click="deleteCategory(row,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return{
      categoryList:[]
    }
  },
  methods:{
    updateCategory(row,$index){
      this.$prompt('请输入您想修改的类别名：','提示',{inputValue:row.cname}).then(({value})=>{//inputValue输入框的初始值
        let url=this.$store.state.globalSettings.apiUrl+'/admin/category';
        row.cname=value;
        this.$axios.put(url,row).then(res=>{
          console.log(res.data)
          if(res.data.code==200){
            this.$message.success('修改菜品名成功！')
          }else{
            this.$message.error('修改菜品名出错：'+res.data.message);
          }
        }).catch(err=>{})
      }).catch((err)=>{
        console.log(err)
      })
    },
    deleteCategory(row,$index){
      this.$confirm('该操作会永久删除菜品"'+row.cname+'",是否继续？','提示信息',{
        type:'warning'
      }).then(()=>{
        let cid=row.cid;
        let url=this.$store.state.globalSettings.apiUrl+'/admin/category/'+cid;
        this.$axios.delete(url).then(res=>{
          if(res.data.code==200){
            this.categoryList.splice($index,1);
            this.$message.success('菜品类别删除成功！')
          }else{
            this.$message.error('类别删除出错：'+res.data.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      }).catch(()=>{
        this.$message.info('已取消删除！')
      })
    },
    addCategory(){
      this.$prompt('请输入新的菜品类别名：','提示',{type:'info'}).then(({value})=>{
        let url=this.$store.state.globalSettings.apiUrl+'/admin/category';
        this.$axios.post(url,{cname:value}).then(res=>{
          if(res.data.code==200){
            this.$message.success('添加菜品成功！');
            this.categoryList.push({cid:res.data.cid,cname:value})
          }else{
            this.$message.error('添加菜品出错！'+res.data.msg);
          }
        }).catch(err=>{

        })
      }).catch(()=>{})
    }
  },
  mounted(){
    var url=this.$store.state.globalSettings.apiUrl+'/admin/category';
    this.$axios.get(url).then(res=>{
      this.categoryList=res.data
    }).catch(err=>{
      console.log(err);
    })
  },
}
</script>
