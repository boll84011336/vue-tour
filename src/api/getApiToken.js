// $(function () {
//   GetAuthorizationHeader();
  
//   GetApiResponse();    
// });

import JsSHA from "jssha";
import axios from 'axios'
import VueAxios from 'vue-axios'
import jquery from 'jquery'
window.jquery = jquery

// export const GetAuthorizationHeader = () => {
//     const AppID = "boll84011336-23529835-9ef6-47e5";
//     const AppKey = "9818e50b-5535-42bb-b0cf-a6ac8b83b99b";
//     const GMTString = new Date().toGMTString();
//     const ShaObj = new JsSHA("SHA-1", "TEXT");
//     ShaObj.setHMACKey(AppKey, "TEXT");
//     ShaObj.update(`x-date: ${GMTString}`);
//     const HMAC = ShaObj.getHMAC("B64");
//     const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
//     return { Authorization, "X-Date": GMTString };
//   };





export function GetAuthorizationHeader() {    
  const parameter = {
      grant_type:"client_credentials",
      client_id: "boll84011336-23529835-9ef6-47e5",
      client_secret: "9818e50b-5535-42bb-b0cf-a6ac8b83b99b"
  };
  
  let auth_url = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
      
  jquery.ajax({
      type: "POST",
      url: auth_url,
      crossDomain:true,
      dataType:'JSON',                
      data: parameter,
      async: false,       
      success: function(data){            
        jquery("#accesstoken").text(JSON.stringify(data));                            
      },
      error: function (xhr, textStatus, thrownError) {
          
      }
  });          
}

export function GetApiResponse(){    
  let accesstokenStr = $("#accesstoken").text();    

  let accesstoken = JSON.parse(accesstokenStr);    

  if(accesstoken !=undefined){
    
    jquery.ajax({
          type: 'GET',
          url: 'https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/LiveTrainDelay?$top=30&$format=JSON',            
          headers: {
              "authorization": "Bearer " + accesstoken.access_token,                
            },            
          async: false,
          success: function (Data) {
            jquery('#apireponse').text(JSON.stringify(Data));                
              console.log('Data', Data);
          },
          error: function (xhr, textStatus, thrownError) {
              console.log('errorStatus:',textStatus);
              console.log('Error:',thrownError);
          }
      });
  }
}