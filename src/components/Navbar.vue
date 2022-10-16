<template>
  <div class="header">
    <img class="bgimg" src="../../photo/Rectangle 24.png" height="80px" alt="">
    <img class="bg" src="../../photo/Rectangle 2.png" alt="">
    <nav class="navbar">
      <a @click="goHome()" class="title">Taiwan 台灣旅遊</a>
      <div class="list">
          <a href="">旅遊景點</a>
          <a href="">推薦住宿</a>
          <a href="">美食饗宴</a>
      </div>
    </nav>
  </div>
</template>
<script>
export default {

  methods: {
    goHome() {  
      const vm = this;
      this.$router.push({path:'/'})
    },
  }
}

</script>


<style scoped>
  .header {      
      position: relative;
      width: 100%;
    }
  
    .bgimg {
      position: absolute;	
    }
  
    .header nav {
      position: absolute;
      top:0;
      display: flex;
      width: 100%;
      padding: 0 20px;
      margin-top: 20px;
    }
  
    .navbar .title {
      font-size: 48px;
    }
  
    .navbar .list {
      position: absolute;
      right: 75px;
  
    }
  
    .header a {
      text-decoration: none;
      color: white;
      font-size: 26px;
      line-height: 52px;
    }
  
    .header nav a {
      text-decoration: none;
      color: white;
      font-size: 26px;
      display: inline-block;
      padding: 0 20px;	
      line-height: 52px;
    }
  
    .header img {
      width: 100%;
      vertical-align: bottom; 
      /* 讓底部無空隙 */
    }
  </style>

<!-- Add "scoped" attribute to limit CSS to this component only -->

