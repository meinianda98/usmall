<template>
  <div>
    <el-table
      :data="cateList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称"> </el-table-column>
      <el-table-column label="图片">
        <!-- <img :src="$url + cateList.img" alt=""> -->
        <template slot-scope="scope">
          <img :src="$url + scope.row.img" alt="" />
        </template>

      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="warn" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import {reqCateDelete} from '../../../utils/request'
export default {
  data() {
    return {
     
    };
  },
  methods: {
    //获取
    edit(id) {
      this.$emit('edit',id)
    },
    //删除
    del(id) {
      reqCateDelete({id}).then(res => {
        this.requestCateList()
      })
    },
    ...mapActions({
      requestCateList:'classify/requestCateList'
    })
  },
  computed:{
    ...mapGetters({
      cateList:'classify/list'
    })
  },
  mounted(){
    this.requestCateList()
  }
};
</script>
<style>
  img{
    width: 80px;
    height: 80px;
  }
</style>