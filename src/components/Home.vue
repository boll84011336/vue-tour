<template>
  <div class="wrapper">
    <Navbar></Navbar>
    <div class="sub_title">
      <h3>觀光活動</h3>
      <a class="more btn" v-bind:href="moreurl+moreClass[0]">查看更多</a>
    </div>
    <div class="block1">
      <div class="card1" v-for="item in cards" :key="item.id">
        <!-- <div :style="{backgroundImage: `url(${item.Picture})`}"></div> -->
        <a v-bind:href="url+item.ActivityID+`&county=`+item.Address.substring(0,3)"><img src="http://picsum.photos/300/200/?random=2" alt=""/></a>
        <h4>{{item.ActivityName}}</h4>
        <p>{{item.Address.substring(0,6) }}</p>
        <p>{{item.SrcUpdateTime.substring(0,10).split('-').join('/')}} ~ 2021/12/26</p>
      </div>
    </div>

    <div class="sub_title">
      <h3>美食品嚐</h3>
      <a class="more btn" v-bind:href="moreurl+moreClass[1]">查看更多</a>
    </div>
    <div class="block1">
      <div class="card2" v-for="item in card2" :key="item.id">
        <!-- <div :style="{backgroundImage: `url(${item.Picture.PictureUrl1})`}"></div> -->
        <img src="http://picsum.photos/300/200/?random=2" alt="">
        <h4 style="display:inline-block">{{item.RestaurantName}}</h4>-<p style="display:inline-block">{{item.Class}}</p>
    
        <p>{{item.Address.substring(0,6) }}</p>
        <p>{{item.SrcUpdateTime.substring(0,10).split('-').join('/')}} ~ 2021/12/26</p>
      </div>
    </div>

    <div class="sub_title">
      <h3>住宿推薦</h3>
      <a class="more btn" v-bind:href="moreurl+moreClass[2]">查看更多</a>
    </div>
    <div class="block1">
      <div class="card3" v-for="item in card3" :key="item.id">
        <!-- <div :style="{backgroundImage: `url(${item.Picture.PictureUrl1})`}"></div> -->
        <img src="http://picsum.photos/300/200/?random=3" alt="">
        <h4>{{item.HotelName}}</h4>
        <p>{{item.Address.substring(0,6) }}</p>
        <p>{{item.SrcUpdateTime.substring(0,10).split('-').join('/')}} ~ 
          {{item.UpdateTime.substring(0,10).split('-').join('/')}}</p>
      </div>
    </div>

  </div>

</template>



<script>
import Navbar from './Navbar'
import { GetAuthorizationHeader } from "@/api/getApiToken.js";
import axios from 'axios'
import VueAxios from 'vue-axios'


export default {
  data() {
    return {
      cards:[],
      card2:[],
      card3:[],
      TourList:[],
      url:`http://localhost:8080/#/Main?tourId=`,
      moreurl: `http://localhost:8080/#/More?Class=`,
      moreClass: [1,2,3]
    }
  },
  methods: {
    //取得所有觀光活動資料
    getTourList() {
      const vm = this;
      axios.get(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=3&%24format=JSON`,
      {
        headers: GetAuthorizationHeader(),
      })
      .then((response) => {
        vm.cards = response.data
        //console.log("測試用", response.data); 
      })
      .catch((err) => {
        console.error(err);
      })
    },

    // 餐廳
    getRestaurantList() {
      const vm = this;
      axios.get(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=3&%24format=JSON`,
      {
        headers: GetAuthorizationHeader(),
      })
      .then((response) => {
        vm.card2 = response.data      
        console.log("餐廳測試用", response.data);
        console.log("photo", response.data[1].Picture.PictureUrl1) 
      })
      .catch((err) => {
        console.error(err);
      })
    },

    // 住宿
    getLodgingList() {
      const vm = this;
      axios.get(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel?%24top=3&%24format=JSON`,
      {
        headers: GetAuthorizationHeader(),
      })
      .then((response) => {
        vm.card3 = response.data      
        console.log("住宿測試用", response.data); 
      })
      .catch((err) => {
        console.error(err);
      })
    },

    TourMore() {  
      const vm = this;
      this.$router.push({path:'More'})
    },

    TourAdd() {  
      const vm = this;
      this.$router.push({path:'Main'})
    }
  
    

    // console.log(vm.cards)
    // this.$http.get("https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=30&%24format=JSON").then((response) => {
    //   console.log(response.data)
    // })
  },
  created() {
    this.getTourList();
    this.getLodgingList();
    this.getRestaurantList()
  },
  
  components: {
    Navbar
  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .small_icon {
    width:18px;
    height: 18px;
  }
  .more {
    font-size: 18px;
    background-color: #FD975E;
    border-radius: 18px;
    position: absolute;
    right: 2%;
    top:35px;	
  }

  .sub_title h3 {	
    text-align: center;
    font-weight: 600;
    font-size: 36px;
  }

  .btn {
    display: inline-block;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 1.25rem
  }

  .sub_title :first-child {
    margin-top: 20px;
  }

  .sub_title {
    display: flex;
    margin: auto;
    width: 960px;
    color: black;
    font-weight: 700;
    font-size: 40px;
    position: relative;
    padding:10px 0 10px 0;
    justify-content: center;
    align-items: center;
  }

  .block1 {
    display: flex;
    width: 960px;
    margin: auto;
  }

  .card1, .card2, .card3 {
    width: 300px;
    margin: 10px;
    padding: 10px;
    margin-bottom: 40px;		
  }

  .card1 img, .card2 img, .card3 img {
    width: 100%;
    border-radius: 10px;
  }
</style>
