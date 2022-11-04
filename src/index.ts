import {
  nanoid
} from "nanoid";
import axios from "axios";
import Cookies from "js-cookie";
import './id5.js';
declare let ID5: any;

import {
  ethers
} from "ethers";
import jwtDecode, { JwtPayload } from "jwt-decode";

const cookieName: string = "BCA-universal-cookie";

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

async function wait(ref): Promise<string> {
  return new Promise(async (resolve, reject) => {
    while (ref._userId == undefined) {
      await new Promise(r => setTimeout(r, 300));
    }
    resolve(ref._userId);
  });
}

function checkJwtDecode(token: string) {
  try {
    return { value: jwtDecode<JwtPayload>(token), status: STATUS_OK };
  } catch (error) {
    return { result: "", status: { errorCode: ERROR_CODE.GENERIC, reason: `${error}` } };

  }
}
type status_ok = string
const STATUS_OK = "OK";

type ErrorCode = 1 | 4
const ERROR_CODE = {
  ADDRESS: 1,
  GENERIC: 2,
  PROMISE_ALL: 3,
  SIGNUP: 4
}

type TypeStatus = status_ok | Error;
type Error = {
  errorCode: number;
  reason: string;
};

type BcaConnectResult = {
  result: string | Array<any>;
  status: TypeStatus;
};

export async function bcaWeb3Connect(address: string): Promise<BcaConnectResult> {
  // return firebase token
  if ((address === undefined) || (typeof address != "string")) {
    return { result: "", status: { errorCode: ERROR_CODE.ADDRESS, reason: "bcaWeb3Connect: No address provided to bcaWeb3Connect library argument" } };
  }
  // ------- check if cookie need to create or update -----------

  const timeNow = Math.floor(Date.now() / 1000) // in seconds
  const oneHour = (60 * 60) // in seconds

  const cookie = Cookies.get(cookieName);
  if (cookie) {
    // cookie already exists
    // TODO check expired
    const checkedJwt = checkJwtDecode(cookie)
    if (checkedJwt.status == STATUS_OK) {
      // jwt decoded success
      const cookieDecoded = checkedJwt.value;
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

  // ------- prepare cookie data -----------
  const id5Status = await ID5.init({
    partnerId: 1238
  })
  const id5Device = await id5Status.onAvailable((status) => {
    return status.getUserId()
  });
  const uuid: string = nanoid(32)
  const promiseBatch: [Promise<string | void>, Promise<string>] = [getHashIP(), wait(id5Device)]

  const resolvedBatch: BcaConnectResult = await Promise.all(promiseBatch)
    .then((array:Array<any>):BcaConnectResult => {
      return { result: array, status: STATUS_OK };
    }).catch((error:any):BcaConnectResult => {
      return { result: "", status: { errorCode: ERROR_CODE.PROMISE_ALL, reason: `${error}` } };
    })

  if(resolvedBatch.status != STATUS_OK){
    return resolvedBatch
  }

  const signupUrl: string = 'https://us-central1-web3-cookie.cloudfunctions.net/signup';

  type DataPackage = {
    uuid: string;
    hashIp: string;
    id5DeviceId: string;
    address: string;
    hostname: string;
  }
  const dataPackage: DataPackage = {
    uuid: `${uuid}`,
    hashIp: `${resolvedBatch.result[0]}`,
    id5DeviceId: `${resolvedBatch.result[1]}`,
    address: address,
    hostname: window.location.hostname
  };

  const bcaConnectResult: BcaConnectResult = await axios.post(signupUrl, {
    dataPackage: dataPackage,
  }).then((response): BcaConnectResult => {
    const token: string = response.data.token
    Cookies.set(cookieName, token, {
      expires: 365
    })
    window.localStorage.setItem(cookieName, token);
    return { result: token, status: STATUS_OK };
  }).catch(function(error): BcaConnectResult {
    return { result: "", status: { errorCode: ERROR_CODE.SIGNUP, reason: `${error}` } };
  });

  return bcaConnectResult
}

export default {
  bcaWeb3Connect,
};
