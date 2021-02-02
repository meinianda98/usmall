<template>
  <div>
    <el-button type="primary" @click="changeStatus">添加</el-button>
    <v-add :info='info' ref="one"></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  data(){
    return{
      info:{
        isShow:false,
        isAdd:true,
        title:'商品分类添加'
      }
    }
  },
  methods:{
    changeStatus(){
      this.info = {
        isShow:true,
        isAdd:true,
        title:'商品分类添加'
      }
      this.$refs.one.empty()
    },
    edit(e){
      this.info = {
        isShow:true,
        isAdd:false,
        title:'商品分类编辑'
      },
      this.$refs.one.look(e)

    }
  },
  components: {
    vAdd,
    vList
  },
};
</script>
<style>
</style>