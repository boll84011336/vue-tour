<template>
  <div class="wrapper">
    <div class="header">
      <img class="bgimg" src="../../photo/Rectangle 24.png" height="80px" alt="">
      <img class="bg" src="../../photo/Rectangle 2.png" alt="">
      <nav class="navbar">
        <a href="#" class="title">Taiwan 台灣旅遊</a>
        <div class="list">
            <a href="">旅遊景點</a>
            <a href="">推薦住宿</a>
            <a href="">美食饗宴</a>
        </div>
      </nav>

      <!-- 從網址列抓來的 -->
      <ul class="path">
        <li>觀光活動</li>
        <li>北部地區</li>
        <li>台北市</li>
      </ul>

      <h3 class="main_title">{{TourDetail.ActivityName}}</h3>
      <div class="banner">
        <img src="Rectangle 168.png" alt="">
      </div>

      <div class="describe">
        <h3>景點介紹</h3>
        <p>
          {{TourDetail.Description}}
        </p>

        <h3>活動地點</h3>
        <p>
        （一）長沙街二段以南、艋舺大道以北、昆明街以西、環河南路二段以東。<br><br>
        （二）長沙街二段(康定路至西寧南路）、漢中街、成都路(漢中街至昆明街）。<br><br>
        （三）和平青草園。<br><br>
        （四）主要場域：以臺鐵萬華車站萬華站前廣場為主要區域。
        </p>
      </div>
    </div>

    <div class="recommend">
      <div class="sub_title">
        <h3>周邊推薦美食</h3>
        <button class="more">查看更多</button>
      </div>

      <div class="wrap">
        <div class="item">
          <img src="http://picsum.photos/300/300/?random=1" alt="">
          <h2>2021台北燈節</h2>
          <p>台北市萬華區</p>
          <p>2021/12/17 ~ 2021/12/26</p>
        </div>
        <div class="item">
          <img src="http://picsum.photos/300/300/?random=2" alt="">
          <h2>2021台北燈節</h2>
          <p>台北市萬華區</p>
          <p>2021/12/17 ~ 2021/12/26</p>
        </div>
        <div class="item">
          <img src="http://picsum.photos/300/300/?random=3" alt="">
          <h2>2021台北燈節</h2>
          <p>台北市萬華區</p>
          <p>2021/12/17 ~ 2021/12/26</p>
        </div>
        <div class="item">
          <img src="http://picsum.photos/300/300/?random=4" alt="">
          <h2>{{TourDetail.ActivityName}}</h2>
          <p>台北市萬華區</p>
          <p>2021/12/17 ~ 2021/12/26</p>
        </div>
      </div>
      <!-- 第二層 -->
      <div class="sub_title">
        <h3>周邊住宿推薦</h3>
        <button class="more1">查看更多</button>
      </div>

      <div class="wrap">
        <div class="item">
          <img src="http://picsum.photos/300/300/?random=1" alt="">
          <h2>2021台北燈節</h2>
          <p>台北市萬華區</p>
          <p>2021/12/17 ~ 2021/12/26</p>
        </div>
        <div class="item">
          <img src="http://picsum.photos/300/300/?random=2" alt="">
          <h2>2021台北燈節</h2>
          <p>台北市萬華區</p>
          <p>2021/12/17 ~ 2021/12/26</p>
        </div>
        <div class="item">
          <img src="http://picsum.photos/300/300/?random=3" alt="">
          <h2>2021台北燈節</h2>
          <p>台北市萬華區</p>
          <p>2021/12/17 ~ 2021/12/26</p>
        </div>
        <div class="item">
          <img src="http://picsum.photos/300/300/?random=4" alt="">
          <h2>{{TourDetail.ActivityName}}</h2>
          <p>台北市萬華區</p>
          <p>2021/12/17 ~ 2021/12/26</p>
        </div>
      </div>

      <div class="footer">
        TAIWAN 台灣旅遊
      </div>
    </div>

  </div>

</template>



<script>
import Navbar from './Navbar'
import { getAccessToken } from "@/api/getApiToken.js";
import axios from 'axios'



export default {
  data() {
    return {
      TourDetail:[],
    }
  },
  methods: {
    //取得所有觀光活動資料
    async getTourList() {
      const vm = this;
      const accessToken = await getAccessToken()
      axios.get(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=13&%24format=JSON`,
      {
        headers: { "Authorization": `Bearer ${accessToken}` }
      })
      .then((response) => {
        vm.TourList = response.data
        console.log(response.data)
        // console.log("拿到的ID",this.$route.query.tourId)
        for(let i=0; i<response.data.length; i++) {
          if(this.$route.query.tourId == response.data[i].ActivityID) {
            vm.TourDetail = response.data[i]
          }
        }
      })
      .catch((err) => {
        console.error(err);
      })
    },
  },
  created() {
    this.getTourList();

  },


  components: {
    Navbar
  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    position: relative;
  }

  .header img {
    width: 100%;
  }

  .bgimg {
    position: absolute;

  }

  .bg {
    margin: -36% 0 0 0;
  }

  .header nav {
    position: absolute;
    top:0;
    display: flex;
    width: 100%;
    padding: 0 20px;
    margin-top: 20px;
  }

  nav .title  {
    font-size: 48px;
    padding-left: 25px;

  }


  nav .list {
    position: absolute;
    right: 75px;
  }

  nav .list a {
    font-size: 26px;
    line-height: 32px;
    display: inline-block;
    padding: 0 20px;	
  }

  .navbar a {
    text-decoration: none;
    color: white;
  }

  /* 麵包削 */
  .path {
    display: flex;
    padding:16px 20px;
    margin: 18px 0 0 70px;
  }


  .path li {
    padding: 6px 10px;
    position: relative;
    color: grey;
    font-size: 24px;
  }

  .path li + li::before {
    content: ">";
    color:grey;
    position: absolute;
    left: -5px;
  }

  /* 下方區塊 */
  .main_title {
    font-size: 48px;
    color: #FF650F;
    margin-left: 100px;
  }

  .banner img{
    margin-top: 30px;
    width: 100%;
  }

  .describe {
    display: flex;
    width: 960px;
    flex-direction: column;
    margin: auto;
  }

  .describe h3 {
    font-size: 24px;
    margin-top: 50px;
    color:#888888;
  }

  .describe p {
    margin-top: 16px;
    margin-bottom: 40px;
  }

  /* recommend區塊 */


  .sub_title {
    width: 1280px;
    display: flex;
    margin:auto;
    /* margin: auto;沒用 */
    /* 水平置中 */
    justify-content: center;
    /* 垂直置中 */
    align-items: center;
    font-size: 30px;
    color: black;
    position: relative;
    font-weight: 800;
    border: 1px solid saddlebrown;
    margin-bottom: 40px;

  }

  .more,.more1 {
    border: 1px solid saddlebrown;
    border-radius: 15px;
    background-color: #FD975E;
    color: #fff;
    font-size: 26px;
    position: absolute;
    right: 10px;	
  }

  h3 {
    font-size: 36px;
    /* align-items: center;
    justify-content: center; */
  }

  .wrap {
    width: 1280px;
    margin: auto;
  }

  .recommend .wrap {
    display: flex;

  }

  .recommend .wrap .item{
      width: 300px;
      margin: 0 10px;
      text-align: center;

  }

  .item img {
    width: 100%;
    border-radius: 15px;
  }

  .content {
    /* position: absolute;
    transform:  translate(-50%,-50%); */

  }


  .footer {
    text-align: center;
    background-color: #000;
    color: white;
    padding: 0 20px;
    line-height: 64px;
    font-weight: 700;
    font-size: 24px;
    margin-top: 20px;
  }
</style>