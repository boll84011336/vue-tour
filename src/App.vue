<template>
  <div id="app">
      <!-- <nav class="navbar" style="z-indent:2;top:0;">
        <div class="navbar-list">台灣旅遊</div>       
        <div class="navbar-list">
          <a href="">旅遊景點</a>
          <a href="">旅遊景點</a>
          <a href="">旅遊景點</a>
        </div>
      </nav>
     <img src="../photo/Rectangle 2.png">
    <HelloWorld/> -->
    <router-view></router-view>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'


export default {
  // name: 'App',
  // created() {
  //   const api = 'https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?%24top=30&%24format=JSON';
  //   this.$http.get(api).then((response) => {
  //     console.log(response.data)
  //   })
  // },
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
@import "bootstrap/dist/css/bootstrap";
</style>

<style>
  .app{
    position:relative;
    
  }

  .navbar {
    display: flex;
    position:absolute;
    right:20px;
    justify-content: space-between;
  }

  .navbar-list {
    font-size: 20px;
    font-weight: 600; 
    display: flex;
    /* justify-content: center;*/
    cursor: pointer;
    color: black;
    text-decoration: none;
  }

  .navbar-list a {
    color: black;
    margin-right: 10px;
    text-decoration: none;
  }


</style>
