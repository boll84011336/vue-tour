<template>
  <div class="wrapper">
    <Navbar></Navbar>
    <div class="container">
      <div class="sub_title">
        <h3>台北</h3>
        <div class="button__list">
          <button class="more">全部</button>
          <button class="popular">熱門</button>
          <button class="recommend">推薦</button>
        </div>
      </div>

      <div class="wrap">
        <div class="item" v-for="item in TourList" :key="item.id">
          <img src="http://picsum.photos/385/200/?random=1" alt="">
          <h4>{{item.ActivityName}}</h4>
          <p style="font-weight:600;color:brown">地址:{{item.Address }}</p>
          <p>{{item.SrcUpdateTime.substring(0,10).split('-').join('/')}} ~ 
          {{item.UpdateTime.substring(0,10).split('-').join('/')}}</p>
        </div>
      </div>

    </div>

  <div class="footer">
    TAIWAN 台灣旅遊
  </div>


    
   
  </div>

</template>

<style scoped>
  /* .wrap h4 {
    line-height: 30px;
    
  }
  .wrap > p {
    line-height: 30px;
  } */
/* header start */
.header {
  position: relative;
}

.header img {
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
	line-height: 52px;
  display: inline-block;
	padding: 0 20px;	
}

.navbar a {
  text-decoration: none;
	color: white;
}


.header .list a:hover {
	background-color: #fa0;
}

/* header結束 */

.sub_title > h3 {
  font-size: 48px;
}

.sub_title {
  width: 960px;
  display: flex;
  margin: auto;
  font-size: 30px;
	color: black;
	font-weight: 800;
  /* 水平置中 */
  justify-content: center; 
  /* 垂直置中 */
  align-items: center;
  /* border: 1px solid saddlebrown; */
	margin-bottom: 20px;
  margin-top: 40px;
  position: relative;
}

.button__list {
  position: absolute;
  right: 0;
}

.button__list button {
  border: 1px solid saddlebrown;
  border-radius: 15px;
	background-color:#fff;
	color:#FD975E;
	font-size: 26px;
  margin-right: 12px;
  width: 80px;
}

.button__list button:hover {
	background-color:#FD975E;
  color:#fff;
}

.container{
  border: 1px solid saddlebrown;
  width: 100%;

}
	
.container .wrap {
	display: flex;
	margin: auto;
  flex-wrap:wrap;
  width: 960px;
  margin-bottom: 40px;
  border: 1px solid saddlebrown;
}

.container .wrap .item{
  width: 300px;
  /* width: calc(100%/3 -42px); */
  margin: 0 5px;
  padding: 10px 5px;
	border-radius: 15px;
}

.wrap .item img {
	width: 100%;
	border-radius: 15px;
}

.footer {
	text-align: center;
	background: #FD975E;
	color: white;
	padding: 0 20px;
	line-height: 64px;
	font-weight: 700;
	font-size: 24px;
	margin-top: 20px;
}

</style>

<script>
import Navbar from './Navbar'
import { GetAuthorizationHeader } from "@/api/getApiToken.js";
import axios from 'axios'
import VueAxios from 'vue-axios'


export default {
  data() {
    return {
      TourList:[],     
    }
  },
  methods: {
    //剩兩個功能，如果分類是123就給相對應的More，如果是給縣市，就跑下面那支API。
    //取得指定觀光景點
    getDesignatedCounty() {
      const vm = this;
      let county = vm.$route.query.county
      let EngCounty = this.getToEngCounty(county)

      axios
        .get(
          `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${EngCounty}?%24top=30&%24format=JSON`,
          {
            headers: GetAuthorizationHeader()
          }
        )
        .then(response => {
          vm.TourList = response.data
          console.log("查看更多", response.data);    
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
  },
  created() {
    this.getDesignatedCounty();
  }
  ,
  components: {
    Navbar
  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->


</style>