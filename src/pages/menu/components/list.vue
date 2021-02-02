<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="150">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="200">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="warn" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click='edit(scope.row.id)'>编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqMenuDelete} from '../../../utils/request'
export default {
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    //给父组件传id,为了做编辑按钮
    edit(id){
      this.$emit('edit',id)
    },
    //删除一条数据
    del(id){
      reqMenuDelete({id}).then(res => {
        this.requestMenuList();//刷新
      })
    }
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  mounted() {
    this.requestMenuList();
  },
};
</script>
<style>
</style>