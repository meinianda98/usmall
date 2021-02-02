<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- 下处是循环添加的 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
import { reqUserAdd, reqUserInfo, reqUserEdit } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      width: "120px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  components: {},
  methods: {
    //添加
    add() {
      reqUserAdd(this.form).then((res) => {
        this.requestUserList();
        this.hide();
        this.requestUserCount()
      });
    },
    //获取一条信息
    look(uid) {
      reqUserInfo({ uid }).then((res) => {
        this.form = res.data.list;
      });
    },
    //修改
    update() {
      reqUserEdit(this.form).then((res) => {
        this.hide();
        this.requestUserList()
      })
    },
    //清空
    empty(){
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      }
    },
    //隐藏弹框
    hide() {
      this.info.isShow = false;
    },
    ...mapActions({
      requestRoleList: "role/requestRoleList",
      requestUserList: "manager/requestUserList",
      requestUserCount: "manager/requestUserCount",
    }),
  },

  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.requestRoleList();
    }
  },
};
</script>
<style>
</style>