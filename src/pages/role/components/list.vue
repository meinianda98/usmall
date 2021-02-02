<template>
  <div>
    <el-table :data="roleList" style="width: 100%" border>
      <el-table-column prop="id" label="角色编号" width="120"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="500"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type='primary' v-if="scope.row.status == 1">启用</el-button>
          <el-button type='warn' v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type='primary' @click="edit(scope.row.id)">编辑</el-button>
          <el-button type='danger' @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqRoleDelete} from '../../../utils/request'
export default {
  data() {
    return {

    }
  },
  methods: {
    ...mapActions({
      requestRoleList:'role/requestRoleList'
    }),
    //点编辑按钮传ID
    edit(id) {
      this.$emit('edit',id)
    },

    //删除
    del(id) {
      reqRoleDelete({id}).then(res => {
        this.requestRoleList() //刷新
      })
    },
  },
  computed:{
    ...mapGetters({
      roleList:'role/list'
    })
  },
  mounted() {
    this.requestRoleList()
  },
};
</script>
<style>
</style>