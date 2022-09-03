import { GetAuthorizationHeader } from "./getApiToken.js";
import axios from 'axios'
import VueAxios from 'vue-axios'
// user.js
const tourRequest = axios.create({
  baseURL: 'https://tdx.transportdata.tw/api/basic',
  headers: GetAuthorizationHeader()
})

//all 觀光景點
export const getTourList = () => tourRequest.get('/v2/Tourism/Activity?%24top=3&%24format=JSON', data)
// export const postUserLogout = data => userRequest.post('/signOut', data)
// export const postUserSignUp = data => userRequest.post('/signUp', data)