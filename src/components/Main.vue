<template>
  <div class="wrapper">
    <div class="header">
      <img
        class="bgimg"
        src="../../photo/Rectangle 24.png"
        height="80px"
        alt=""
      />
      <img class="bg" src="../../photo/Rectangle 2.png" alt="" />
      <nav class="navbar">
        <a @click="goHome()" class="title">Taiwan 台灣旅遊</a>
        <div class="list">
          <a href="">旅遊景點</a>
          <a href="">推薦住宿</a>
          <a href="">美食饗宴</a>
        </div>
      </nav>

      <!-- 從網址列抓來的 -->
      <ul class="path">
        <li>{{ TourDetail.Class1 }}</li>
        <li>{{showCounty}}地區</li>
        <li>{{ county }}</li>
      </ul>

      <h3 class="main_title">{{ TourDetail.ActivityName }}</h3>
      <div class="banner">
        <img src="Rectangle 168.png" alt="" />
      </div>

      <div class="describe">
        <h3>景點介紹</h3>
        <p>
          {{ TourDetail.Description }}
        </p>

        <h3>活動地點</h3>
        <p>
          {{ TourDetail.TravelInfo }}
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
          <img src="http://picsum.photos/300/300/?random=1" alt="" />
          <h2>2021台北燈節</h2>
          <p>台北市萬華區</p>
          <p>2021/12/17 ~ 2021/12/26</p>
        </div>
        <div class="item">
          <img src="http://picsum.photos/300/300/?random=2" alt="" />
          <h2>2021台北燈節</h2>
          <p>台北市萬華區</p>
          <p>2021/12/17 ~ 2021/12/26</p>
        </div>
        <div class="item">
          <img src="http://picsum.photos/300/300/?random=3" alt="" />
          <h2>2021台北燈節</h2>
          <p>台北市萬華區</p>
          <p>2021/12/17 ~ 2021/12/26</p>
        </div>
        <div class="item">
          <img src="http://picsum.photos/300/300/?random=4" alt="" />
          <h2>{{ TourDetail.ActivityName }}</h2>
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
        <div class="item" v-for="item in NearHouse" :key="item.HotelID">
          <!-- <img src="http://picsum.photos/300/300/?random=1" alt="" /> -->
          <img :src="item.Picture.PictureUrl1" title=""/>
          <h2>{{item.HotelName}}</h2>
          <p>{{item.Address.substring(0,6)}}</p>
          <p>電話:{{item.Phone}}</p>
        </div>
      </div>

      <div class="footer">
        TAIWAN 台灣旅遊
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import { GetAuthorizationHeader } from "@/api/getApiToken.js";
import axios from "axios";

export default {
  data() {
    return {
      TourDetail: [],
      county: "",
      NearHouse: [],
      NearFood: [],
      showCounty: "",
      
    };
  },
  methods: {
    //取得所有觀光活動資料
    getTourList() {
      const vm = this;
      axios
        .get(
          `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=13&%24format=JSON`,
          {
            headers: GetAuthorizationHeader()
          }
        )
        .then(response => {
          vm.TourList = response.data;
          console.log(response.data);
          // console.log("拿到的ID",this.$route.query.tourId)
          //網址上的ID = 找到的ID =>就把資料傳進去TourDetail
          for (let i = 0; i < response.data.length; i++) {
            if (this.$route.query.tourId == response.data[i].ActivityID) {
              vm.TourDetail = response.data[i];
              vm.county = vm.TourDetail.Address.substring(0, 3);
              console.log("我是縣市", vm.TourDetail.Address);
              vm.showCounty = this.getCountyClass(vm.county)
              console.log("分區顯示",vm.showCounty)
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    

    //縣市中英文轉換 拿到的會是中文
    getToEngCounty(county) {

      const locationMapping = { 
        "臺北市": "Taipei", 
        "高雄市": "Kaohsiung",
        "澎湖縣": "PenghuCounty"
      }

      
      console.log("測試中",locationMapping[county])
      return locationMapping[county]
      // const converLocation = (location) => locationMapping[location]
      
      // console.log(converLocation(county))
    },
   
    //取得附近民宿
    getNearHouse() {
      const vm = this;
      let county = vm.$route.query.county
      let EngCounty = this.getToEngCounty(county)

      axios
        .get(
          `https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/${EngCounty}?%24top=4&%24format=JSON`,
          {
            headers: GetAuthorizationHeader()
          }
        )
        .then(response => {
          vm.NearHouse = response.data;
          //console.log("附近民宿",response.data)       
        })
        .catch(err => {
          console.error(err);
        });   
    },

    //取得附近美食
    getNearFood() {
      const vm = this;
      let county = vm.$route.query.county
      let EngCounty = this.getToEngCounty(county)
      axios
        .get(
          `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${EngCounty}?%24top=4&%24format=JSON`,
          {
            headers: GetAuthorizationHeader()
          }
        )
        .then(response => {
          if (response.data.length <= 0) {
            this.getNearOtherFood()
          }
          vm.NearFood = response.data;
          console.log("附近美食",response.data)       
        })
        .catch(err => {
          console.error(err);
        });   
    },

    //取得附近美食 額外處理沒資料
    getNearOtherFood() {
      const vm = this;
      let county = vm.$route.query.county
      axios
        .get(
          `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/NewTaipei?%24top=4&%24format=JSON`,
          {
            headers: GetAuthorizationHeader()
          }
        )
        .then(response => {
          vm.NearFood = response.data;
          // console.log("附近美食",response.data)       
        })
        .catch(err => {
          console.error(err);
        });   
    },

   


    //縣市分區
    getCountyClass(county) {
      const vm = this;
      switch (county) {
        case "基隆市":
        case "宜蘭縣":
        case "臺北市":
        case "新北市":
        case "新竹市":
        case "桃園市":
        case "新竹縣":
          console.log("北部");
          break;
        case "臺中市":
        case "苗栗縣":
        case "彰化縣":
        case "南投縣":
        case "雲林縣":
          console.log("中部");
          break;
        case "高雄市":
        case "臺南市":
        case "嘉義縣":
        case "嘉義市":
        case "屏東縣":
          console.log("南部");
          break;
        case "臺中市":
        case "花蓮縣":
        case "台東縣":
        case "南投縣":
        case "雲林縣":
          console.log("東部");
          break;
        case "澎湖縣":
        case "連江縣":
        case "金門縣":
          return ("外島");
          break;
        default:
          console.log(`Sorry, we are out of ${county}.`);
          break;
      }
    },

    goHome() {  
      const vm = this;
      this.$router.push({path:'/'})
    },
  },
  created() {
    this.getTourList();
    this.getNearHouse();
    this.getNearFood();
    //this.getNearHousePhoto();

  },

  components: {
    Navbar
  }
};
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
  top: 0;
  display: flex;
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
}

nav .title {
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
  padding: 16px 20px;
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
  color: grey;
  position: absolute;
  left: -5px;
}

/* 下方區塊 */
.main_title {
  font-size: 48px;
  color: #ff650f;
  margin-left: 100px;
}

.banner img {
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
  color: #888888;
}

.describe p {
  margin-top: 16px;
  margin-bottom: 40px;
}

/* recommend區塊 */

.sub_title {
  width: 1280px;
  display: flex;
  margin: auto;
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

.more, .more1 {
  border: 1px solid saddlebrown;
  border-radius: 15px;
  background-color: #fd975e;
  color: #fff;
  font-size: 26px;
  position: absolute;
  right: 10px;
}

h3 {
  font-size: 36px;
}

.wrap {
  width: 1280px;
  margin: auto;
}

.recommend .wrap {
  display: flex;
  flex-direction: row;
}

.recommend .wrap .item {
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
