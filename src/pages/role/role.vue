<template>
  <div>
    <el-button type="primary" @click="changeStatus">添加</el-button>
    <v-add :info='info' ref="one"></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
  data(){
     return{
      info:{
        isShow:false,
        isAdd:true,
        title:'角色添加'
      }
    }
  },
  components: {
    vAdd,
    vList
  },
  methods:{
    changeStatus(){
      this.info = {
        isShow : !this.info.isShow,
        isAdd:true,
        title:'角色添加'
      },
      this.$refs.one.reset()
    },
    edit(id){
      this.info = {
        isShow:true,
        isAdd:false,
        title:'角色编辑'
      }
      //获取一条数据 为编辑做准备
      this.$refs.one.look(id)

    }
  }
};
</script>
<style>
</style>