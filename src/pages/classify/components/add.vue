<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="width">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 下处是循环添加的 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { reqCateAdd, reqCateInfo, reqCateEdit } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      width: "120px",
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      imageUrl: "",
    };
  },
  methods: {
    //添加
    add() {
      reqCateAdd(this.form).then((res) => {
        this.requestCateList();
        this.hide();
      });
    },
    //获取一条信息
    look(id) {
      reqCateInfo({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id
        this.imageUrl = this.$url + this.form.img;
      });
    },
    //修改
    update() {
      reqCateEdit(this.form).then(res => {
        this.requestCateList()
        this.hide()
      })
    },
    //清空
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imageUrl = ''
    },
    //隐藏弹框
    hide() {
      this.info.isShow = false;
    },
    ...mapActions({
      requestCateList: "classify/requestCateList",
    }),

    //上传图片钩子
    changeImg(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.img = file.raw;
    },
  },

  computed: {
    ...mapGetters({
      cateList: "classify/list",
    }),
  },
  mounted() {
    this.requestCateList();
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  border: 1px dashed grey;
  border-radius: 5px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>