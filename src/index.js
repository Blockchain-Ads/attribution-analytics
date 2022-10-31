import {
  nanoid
} from "nanoid";
import axios from "axios";
import Cookies from "js-cookie";
// import ID5 from '@id5io/id5-api.js';
import './id5.js';


const cookieName = "BCA-universal-cookie";

function getIP() {
  return axios.get('https://www.cloudflare.com/cdn-cgi/trace')
    .then(function(response) {
      const data = response.data;
      const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
      const ip = data.match(ipRegex)[0];
      return ip
    })
    .catch(function(error) {
      // handle error
      console.error('error >>> ', error);
    })
}

async function wait(ref){
  return new Promise(async (resolve, reject) => {
    while (ref._userId == undefined){
      await new Promise(r => setTimeout(r, 300));
    }
    resolve(ref._userId);
  });
}

export async function bcaWeb3Connect() {
  const uuid = '';

  const cookie = Cookies.get(cookieName);
  console.log("ID5 >>>",ID5)
  const id5Status = await ID5.init({ partnerId: 1238 })
  const id5Device = await id5Status.onAvailable((status) => {
    return status.getUserId()
  });
  const id5DeviceId = await wait(id5Device);
console.log('ID5DEVICEID', id5DeviceId)


  const promisePackage = [getIP(), nanoid(32)]



  await Promise.all(promisePackage)
    .then(res => console.info('success', res))
    .catch(err => console.error('error >>> ', err))
  return '';
}

export default {
  bcaWeb3Connect,
};
