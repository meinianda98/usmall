<template>
  <div id="page_login">
    <div id="center_box">
      <p id="login">登录</p>
      <div>
        <input type="text" v-model="user.username" placeholder="请输入用户名" />
      </div>
      <div>
        <input
          type="password"
          v-model="user.password"
          placeholder="请输入密码"
        />
      </div>
      <div>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { reqUserLogin } from "../../utils/request";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      reqUserLogin(this.user).then(
        (res) => {
          if (res.data.code == 200) {
            this.$router.push("/index/home");
          } else {
            alert(res.data.msg);
          }
        }
      );
    },
  },
};
</script>
<style>
#page_login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: -webkit-linear-gradient(left, #553444, #363c5b);
}
#center_box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 300px;
  border-radius: 15px;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
#center_box div,
p {
  margin-top: 20px;
  text-align: center;
}
#center_box p {
  font-size: 30px;
  font-weight: 600;
  margin-top: 30px;
}
#center_box div input,
button {
  width: 350px;
  height: 40px;
  font-size: 20px;
  border: 1px solid #dcdfe6;
}
#center_box div button {
  font-size: 15px;
  border-radius: 5px;
  color: #fff;
  background-color: #409eff;
  cursor: pointer;
}
#center_box div input::placeholder {
  font-size: 15px;
  color: #c0c4cc;
  text-indent: 0.5em;
}
</style>