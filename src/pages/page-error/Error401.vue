<script setup>

</script>

<template>
  <div class="building-container">
    <div class="building">
      <div class="bullshit">
        <h2>抱歉，您没有访问权限</h2>
        <div class="bullshit__info">
          请联系管理员，或者点击下面的按钮返回主页
        </div>
        <el-button
          class="bullshit__return-home"
          round size="small" type="primary" @click="$router.push('/home')"
        >
          返回首页
        </el-button>
        <el-button
          class="bullshit__return-home"
          round size="small" @click="$router.go(-1)"
        >
          返回上一级
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.building-container {
  display: grid;
  place-items: center;
  height: 100vh;
  transform: translateY(-10%);
}

.building {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;

  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;

    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }

    &__return-home {
      opacity: 0;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }

    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
