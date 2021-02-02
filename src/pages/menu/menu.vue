<template>
  <div>
    <el-button type="primary" @click="changeStatus">添加</el-button>
    <v-add :info='info' ref="one"></v-add>
    <v-list @edit='edit($event)'></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data(){
    return{
      info:{
        isShow:false,
        isAdd:true,
        title:'菜单添加'
      }
    }
  },
  methods:{
    changeStatus(){
      this.info = {
        isShow : !this.info.isShow,
        isAdd:true,
        title:'菜单添加'
      }
      this.$refs.one.empty() //清空表格
    },
    edit(id){
      this.info = {
        isShow:true,
        isAdd:false,
        title:'菜单编辑'
      }
      this.$refs.one.look({id})
    }   
  },
  
};
</script>
<style>
</style>