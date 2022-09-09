<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
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
