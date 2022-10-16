import axios from 'axios'

// TODO secret 需要放在外部檔案增加安全性
// TODO 檢查 accessToken 是否合法的功能

const setAccessToken = async () => {
  const params = new URLSearchParams({
      grant_type:"client_credentials",
      client_id: "boll84011336-23529835-9ef6-47e5",
      client_secret: "9818e50b-5535-42bb-b0cf-a6ac8b83b99b"
  });
  const auth_url = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token"

  try {
    const res = await axios.post(auth_url, params)
    console.log('access_token', res.data.access_token)
    localStorage.setItem('access_token', res.data.access_token)
  } catch (err) {
    console.error(err)
    return err
  }
}

const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token')
  if(!accessToken) {
    await setAccessToken()
    return localStorage.getItem('access_token')
  }
  return accessToken
}

export const GetAuthorizationHeader = async () => {
  const accessToken = await getAccessToken()
  return { "Authorization": `Bearer ${accessToken}` }
}

// api 製造機 (無指定城市)
const APImaker = (type) => async ($top=30, $skip=0) => {
  const apiURL = `https://tdx.transportdata.tw/api/basic/v2/Tourism/${type}`
  try {
    const result = await axios.get(apiURL, {
      headers: await GetAuthorizationHeader(),
      params: { $top, $skip }
    })
    console.log(result)
    return result.data
  } catch(err) {
    console.log(err)
    return null
  }
}

// api 製造機 (指定城市)
const APImakerWithCity = (type) => async (city, $top=30, $skip=0) => {
  const cityList = ['Taipei', 'NewTaipei', 'Taoyuan', 'Taichung', 'Tainan', 'Kaohsiung', 'Keelung', 'Hsinchu', 'HsinchuCounty', 'MiaoliCounty', 'ChanghuaCounty', 'NantouCounty', 'YunlinCounty', 'ChiayiCounty', 'MiaoliCounty', 'Chiayi', 'PingtungCounty', 'YilanCounty', 'HualienCounty', 'TaitungCounty', 'KinmenCounty', 'PenghuCounty', 'LienchiangCounty']
  
  if (!cityList.includes(city)) {
    console.error(`城市 ${city} 不是台灣的縣市名`)
    return null
  }

  const apiURL = `https://tdx.transportdata.tw/api/basic/v2/Tourism/${type}/${city}`
  try {
    const result = await axios.get(apiURL, {
      headers: await GetAuthorizationHeader(),
      params: { $top, $skip }
    })
    console.log(result)
    return result.data
  } catch(err) {
    console.log(err)
    return null
  }
}

export const queryActivity = APImaker("Activity")
export const querySpot = APImaker("ScenicSpot")
export const queryRestaurant = APImaker("Restaurant")
export const queryHotel = APImaker("Hotel")

export const queryActivityWithCity = APImakerWithCity("Activity")
export const querySpotWithCity = APImakerWithCity("ScenicSpot")
export const queryRestaurantWithCity = APImakerWithCity("Restaurant")
export const queryHotelWithCity = APImakerWithCity("Hotel")
