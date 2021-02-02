<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changeType"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 下处是循环添加的 -->
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option label="admin" value="el-icon-user">
              <i class="el-icon-user"></i>
            </el-option>
            <el-option label="star" value="el-icon-star-off">
              <i class="el-icon-star-off"></i>
            </el-option>
            <el-option label="bell" value="el-icon-bell">
              <i class="el-icon-bell"></i>
            </el-option>
            <el-option label="phone" value="el-icon-phone-outline">
              <i class="el-icon-phone-outline"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="'/' + item.path"
              :value="item.name"
            >
            </el-option>
          </el-select>
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
import { indexRouters } from "../../../router/index"; //面包屑导航
import { reqMenuAdd, reqMenuInfo, reqMenuEdit } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  data() {
    return {
      width: "120px",
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 0,
        url: "",
        status: 1,
      },
      indexRouters,
    };
  },
  components: {},
  methods: {
    //取消和确定按钮隐藏框框
    hide() {
      this.info.isShow = false;
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    //添加
    add() {
      reqMenuAdd(this.form).then(res => {
        this.requestMenuList(); //刷新页面
        this.hide();
      });
    },
    //改变上级菜单类型的同时改变菜单类型
    changeType() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    //编辑按钮
    look(id) {
      reqMenuInfo(id).then(res => {
        this.form = res.data.list;
        this.form.id = id.id;
      });
    },
    //修改按钮
    update() {
      reqMenuEdit(this.form).then(res => {
        this.requestMenuList(); //刷新页面
        
        this.hide();//隐藏表格
      });
    },
    //清空
    empty() {
       this.form = {
        pid: '',
        title: "",
        icon: "",
        type: 0,
        url: "",
        status: 1,
       }
    },
  }
}
</script>
<style>
</style>