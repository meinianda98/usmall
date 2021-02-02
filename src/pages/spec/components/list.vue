<template>
  <div>
    <el-table :data="specList" style="width: 100%; margin-bottom: 20px" border>
      <el-table-column prop="id" label="规格编号" width="120">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="120">
      </el-table-column>
      <el-table-column label="规格属性" width="700">
        <template slot-scope="scope">
          <el-tag type="warning" v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
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
import { mapActions, mapGetters } from "vuex";
import { reqSpecsDelete } from "../../../utils/request";
export default {
  data() {
    return {};
  },
  methods: {
    //获取
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      reqSpecsDelete({ id }).then((res) => {
        this.requestSpecsList();
      });
    },
    ...mapActions({
      requestSpecsList: "spec/requestSpecsList"
    }),
  },
  computed: {
    ...mapGetters({
      specList: "spec/list",
    }),
  },
  mounted() {
    this.requestSpecsList();
  },
};
</script>
<style>
</style>