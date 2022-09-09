import axios from 'axios'

// TODO secret 需要放在外部檔案增加安全性
async function setAccessToken() {
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

export async function getAccessToken() {
  const accessToken = localStorage.getItem('access_token')
  if(!accessToken) {
    await setAccessToken()
    return localStorage.getItem('access_token')
  }
  return accessToken
}

// TODO 檢查 accessToken 是否合法的功能