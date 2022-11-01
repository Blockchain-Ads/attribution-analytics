import {
  nanoid
} from "nanoid";
import axios from "axios";
import Cookies from "js-cookie";
import './id5.js';

const STATUS_OK = "OK";
const STATUS_FAIL = "FAIL";


import {
  ethers
} from "ethers";
import jwt_decode from "jwt-decode";

const cookieName = "BCA-universal-cookie";

function getHashIP() {
  // return promise
  return axios.get('https://www.cloudflare.com/cdn-cgi/trace')
    .then(function(response) {
      const data = response.data;
      const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
      const ip = data.match(ipRegex)[0];
      return ethers.utils.id(`${ip}`);
    })
    .catch(function(error) {
      // handle error
      console.error('bcaWeb3Connect getHashIP error >>> ', error);
    })
}

async function wait(ref) {
  return new Promise(async (resolve, reject) => {
    while (ref._userId == undefined) {
      await new Promise(r => setTimeout(r, 300));
    }
    resolve(ref._userId);
  });
}

function checkJwtDecode(token){
  try {
    return {value:jwt_decode(cookie), status: STATUS_OK};
  } catch (e) {
    return {value: undefined, status: STATUS_OK}
  }
}

export async function bcaWeb3Connect(address) {
  // return firebase token
  if (address === undefined) {
    throw new Error('bcaWeb3Connect: No address provided to bcaWeb3Connect library argument')
  }
  // ------- check if cookie need to create or update -----------

  const timeNow = Math.floor(Date.now() / 1000) // in seconds
  const oneHour = (60 * 60) // in seconds

  const cookie = Cookies.get(cookieName);
  console.log('COOKIE', cookie)
  if (cookie) {
    // cookie already exists
    // TODO check expired
    if (checkJwtDecode(cookie).status == STATUS_OK){
      // jwt decoded success
      const cookieDecoded = jwt_decode(cookie);
      const cookieIsExpired = (cookieDecoded.exp + oneHour) < timeNow
      if (!cookieIsExpired) {
        // Cookie not expired
        // Do nothing
        return
      }
      else {
        // Cookie has expired
        Cookies.remove(cookieName)
        // Continue to create a cookie
      }
    }
    else {
      // jwt decoded unsuccess
      Cookies.remove(cookieName)
      //   // Continue to create a cookie
    }
  }
  // else {
  // // undefined (cookie not exist before)
  // // Continue to create a cookie
  // }
  console.log('COOKIE undefined')

  // ------- prepare cookie data -----------
  const id5Status = await ID5.init({
    partnerId: 1238
  })
  const id5Device = await id5Status.onAvailable((status) => {
    return status.getUserId()
  });

  const promiseBatch = [nanoid(32), getHashIP(), wait(id5Device)]

  const resolvedBatch = await Promise.all(promiseBatch)
    .then(arr => arr)
    .catch(err => {
      throw new Error('bcaWeb3Connect: promiseBatch error >>>' + err)
    })

  const signupUrl = 'https://us-central1-web3-cookie.cloudfunctions.net/signup';
  const dataPackage = {
    uuid: `${resolvedBatch[0]}`,
    hashIp: `${resolvedBatch[1]}`,
    id5DeviceId: `${resolvedBatch[2]}`,
    address: address,
    hostname: window.location.hostname
  };

  const firebaseToken = await axios.post(signupUrl, {
    dataPackage: dataPackage,
  }).then((response) => {
    Cookies.set(cookieName, response.data.token, {
      expires: 365
    })
    window.localStorage.setItem(cookieName, response.data.token);
    return response.data.token
  }).catch(function(error) {
    throw new Error('bcaWeb3Connect: signup error >>> ' + error)
  });

  return firebaseToken;
}

export default {
  bcaWeb3Connect,
};
