<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menuList"
            show-checkbox
            ref="tree"
            node-key="id"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqRoleAdd, reqRoleInfo, reqRoleEdit } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      width: "120px",
      form: {
        status: 1,
        rolename: "",
        menus: [],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  components: {},
  methods: {
    //隐藏
    hide() {
      this.info.isShow = false;
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    //添加
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        this.requestRoleList();
        this.hide();
      });
    },
    //获取一条数据
    look(id) {
      reqRoleInfo({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.menus = this.$refs.tree.setCheckedKeys(
          JSON.parse(res.data.list.menus)
        );
      });
    },
    //修改
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.form).then((res) => {
        this.requestRoleList(); //刷新页面
        this.hide();
      });
    },
    //置空
    reset() {
      this.form = {
        status: 1,
        rolename: "",
        menus: []
      },
    this.$refs.tree.setCheckedKeys([])
    },

    //刷新
    ...mapActions({
      requestRoleList: "role/requestRoleList",
    }),
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.requestMenuList();
    }
  },
};
</script>
<style>
</style>