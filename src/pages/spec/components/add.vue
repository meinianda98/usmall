<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          :label-width="width"
          v-for="(item, index) in allAttrs"
          :key="index"
        >
          <el-row>
            <el-col :span="18">
              <el-input v-model="item.value" autocomplete="off"> </el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" v-if="index == 0" @click="addAttr"
                >新增规格属性</el-button
              >
              <el-button type="danger" v-else @click="delAttr(index)"
                >删除</el-button
              >
            </el-col>
          </el-row>
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
import { reqSpecsAdd, reqSpecsInfo, reqSpecsEdit} from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      width: "120px",
      allAttrs: [{ value: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  methods: {
    addAttr() {
      this.allAttrs.push({ value: "" });
    },
    delAttr(index) {
      this.allAttrs.splice(index, 1);
    },

    //添加
    add() {
      this.form.attrs = JSON.stringify(this.allAttrs.map((item) => item.value));
      reqSpecsAdd(this.form).then((res) => {
        this.requestSpecsList();
        this.hide();
      });
    },
    //获取一条信息
    look(id) {
      reqSpecsInfo({id}).then(res => {
        //"["40码","39码"]" allAttrs: [{ value: "" }],
        this.form = res.data.list[0]
        this.allAttrs = JSON.parse(this.form.attrs).map(item => {
          return {value:item}
        })
      })
    },
    //修改
    update() {
       this.form.attrs = JSON.stringify(this.allAttrs.map((item) => item.value));
      reqSpecsEdit(this.form).then(res => {
        this.requestSpecsList()
        this.hide()
      })
    },
    //清空
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      },
      this.allAttrs = [
        { value: "" }
      ]     
    },
    //隐藏弹框
    hide() {
      this.info.isShow = false;
    },
    ...mapActions({
      requestSpecsList: "spec/requestSpecsList",
    }),
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
};
</script>
<style>
</style>