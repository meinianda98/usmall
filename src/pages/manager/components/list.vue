<template>
  <div>
    <el-table :data="managerList" style="width: 100%" border>
      <el-table-column prop="id" label="用户编号" width="120">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="300">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="300">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="warn" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="managerSize"
      :current-page="managerPage"
      :pager-count="11"
      layout="prev, pager, next"
      :total="managerTotal"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqUserDelete } from "../../../utils/request";
export default {
  data() {
    return {};
  },
  methods: {
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(uid) {
      reqUserDelete({ uid }).then((res) => {
        this.requestUserList();
        //重新获取总页数
        this.requestUserCount()
        //强制回到第一页
        if(this.managerList.length == 1){
         
          this.changeCurrentsPages(1)
        }
      });
    },
    //获取当前页数
    changePage(e){
      this.changeCurrentsPages(e)
    },
    ...mapActions({
      requestUserList: "manager/requestUserList",
      requestUserCount: "manager/requestUserCount",
      changeCurrentsPages:"manager/changeCurrentsPages" //获取当前页数
    }),
  },
  computed: {
    ...mapGetters({
      managerList: "manager/list",
      managerTotal: "manager/total",
      managerSize: "manager/size",
      managerPage: "manager/page"
    }),
  },
  mounted() {
    this.requestUserList();
    this.requestUserCount();
  },
};
</script>
<style>
.el-pagination {
  position: absolute;
  bottom: 25px;
  right: 17px;
}
</style>