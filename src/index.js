import {
  nanoid
} from "nanoid";
import axios from "axios";
import Cookies from "js-cookie";

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

export async function bcaWeb3Connect() {
  const uuid = '';

  const cookie = Cookies.get(cookieName);

  const = ID5.init({
    partnerId: 1238
  }).then((status) => {
    status.onAvailable((status: any) => {
      return status.getUserId()
    })
  })
  // const getUserId = id5Status.onAvailable((status: any) => {return status.getUserId()})
  const promisePackage = [getIP(), nanoid(32)]



  await Promise.all(promisePackage)
    .then(res => console.info('success', res))
    .catch(err => console.error('error >>> ', err))
  return '';
}

export default {
  bcaWeb3Connect,
};
