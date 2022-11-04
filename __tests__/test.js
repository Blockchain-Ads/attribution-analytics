import { bcaWeb3Connect } from "../dist/index.module.js";
import {jest} from '@jest/globals';
import Cookies from "js-cookie";

/**
 * @jest-environment jsdom
 */
const cookieName = "BCA-universal-cookie";

let __cookies;
Object.defineProperty( window.document, 'cookie', {
    get: () => __cookies,
    set: v => __cookies = v,
    split: s => __cookies.split( s ),
} );

describe('index', () => {
  describe('bcaWeb3Connect', () => {
    it('should hadle incorrect address type', async () => {
      Cookies.set(cookieName, "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY2NzI4ODg5MywiZXhwIjoxNjY3MjkyNDkzLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay10dDlsNkB3ZWIzLWNvb2tpZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXR0OWw2QHdlYjMtY29va2llLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiT2hNS1diakZmVHFGZzFXMEc3cGFRWUlXZkN5UC1Dd20iLCJjbGFpbXMiOnsiY29va2llRGF0YSI6eyJkYXRhUGFja2FnZSI6eyJoYXNoSXAiOiIweGJlMWRjYjk5OTk0NTkxNTFkMzQ2N2NmZWIxZjc0ODU4Y2ZkYWJiYjY1ZjIxNWM4ZThlZjA5NDQyOWU4OGE1NGYiLCJpZDVEZXZpY2VJZCI6IklENSpUdFIwc0RVeERheXdvTUk4ZVZvWlFlVm13YzE0bEtPOGZYUEpoZjVtTkt3cGczeFZQZkRmMGU3U0x3MzR3Y3hEIiwiYWRkcmVzcyI6IjB4N0RhODFGQTYzRWUzNDNEZTljYTMzYWI3QTE2YmUzRDAyMjU0OTgyOCIsImhvc3RuYW1lIjoibG9jYWxob3N0In19fX0.Kvw15ZqqU3CGEz04dhywQeL0gHhbXE9qsVV3UqWFXy2oNQi6QiTbDDTRroLNb0EECFe9nMWbgX_Na_hYpPbLN75n0V5ShjGvI4vgOfvE7p3boWvfMEfSQe-uIQavha29rPtg2whilHMZkCXH0VheXdbSdGVmmg53W9dVrMTaRP-DK8PMTV9D1XXXNIsMjzRulO8bkCbUbWIQWstZumJ04rePg7EKPQf2Ca4muzB-lPUxW916alu5JvJrrTbfsXXWl4QiAgQmTDP_rsW9jPxMXXl0xkn6pqc5Rhz01W_vF9dpSIBRF_wtfQa47V95nLGWYSVqP_WyC_Mh2EH-EgVCnQ" , {
        expires: 365
      })
      const bcaWeb3ConnectResult = await bcaWeb3Connect(1);
      expect(bcaWeb3ConnectResult.status).toEqual({"errorCode": 1, "reason": "bcaWeb3Connect: No address provided to bcaWeb3Connect library argument"});
    });
    it('Should handle non parameter', async () => {
      Cookies.set(cookieName, "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY2NzI4ODg5MywiZXhwIjoxNjY3MjkyNDkzLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay10dDlsNkB3ZWIzLWNvb2tpZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXR0OWw2QHdlYjMtY29va2llLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiT2hNS1diakZmVHFGZzFXMEc3cGFRWUlXZkN5UC1Dd20iLCJjbGFpbXMiOnsiY29va2llRGF0YSI6eyJkYXRhUGFja2FnZSI6eyJoYXNoSXAiOiIweGJlMWRjYjk5OTk0NTkxNTFkMzQ2N2NmZWIxZjc0ODU4Y2ZkYWJiYjY1ZjIxNWM4ZThlZjA5NDQyOWU4OGE1NGYiLCJpZDVEZXZpY2VJZCI6IklENSpUdFIwc0RVeERheXdvTUk4ZVZvWlFlVm13YzE0bEtPOGZYUEpoZjVtTkt3cGczeFZQZkRmMGU3U0x3MzR3Y3hEIiwiYWRkcmVzcyI6IjB4N0RhODFGQTYzRWUzNDNEZTljYTMzYWI3QTE2YmUzRDAyMjU0OTgyOCIsImhvc3RuYW1lIjoibG9jYWxob3N0In19fX0.Kvw15ZqqU3CGEz04dhywQeL0gHhbXE9qsVV3UqWFXy2oNQi6QiTbDDTRroLNb0EECFe9nMWbgX_Na_hYpPbLN75n0V5ShjGvI4vgOfvE7p3boWvfMEfSQe-uIQavha29rPtg2whilHMZkCXH0VheXdbSdGVmmg53W9dVrMTaRP-DK8PMTV9D1XXXNIsMjzRulO8bkCbUbWIQWstZumJ04rePg7EKPQf2Ca4muzB-lPUxW916alu5JvJrrTbfsXXWl4QiAgQmTDP_rsW9jPxMXXl0xkn6pqc5Rhz01W_vF9dpSIBRF_wtfQa47V95nLGWYSVqP_WyC_Mh2EH-EgVCnQ" , {
        expires: 365
      })
      const bcaWeb3ConnectResult = await bcaWeb3Connect();
      expect(bcaWeb3ConnectResult.status).toEqual({"errorCode": 1, "reason": "bcaWeb3Connect: No address provided to bcaWeb3Connect library argument"});
    });
    it('should connect succesfully', async () => {
      Cookies.set(cookieName, "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY2NzI4ODg5MywiZXhwIjoxNjY3MjkyNDkzLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay10dDlsNkB3ZWIzLWNvb2tpZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXR0OWw2QHdlYjMtY29va2llLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiT2hNS1diakZmVHFGZzFXMEc3cGFRWUlXZkN5UC1Dd20iLCJjbGFpbXMiOnsiY29va2llRGF0YSI6eyJkYXRhUGFja2FnZSI6eyJoYXNoSXAiOiIweGJlMWRjYjk5OTk0NTkxNTFkMzQ2N2NmZWIxZjc0ODU4Y2ZkYWJiYjY1ZjIxNWM4ZThlZjA5NDQyOWU4OGE1NGYiLCJpZDVEZXZpY2VJZCI6IklENSpUdFIwc0RVeERheXdvTUk4ZVZvWlFlVm13YzE0bEtPOGZYUEpoZjVtTkt3cGczeFZQZkRmMGU3U0x3MzR3Y3hEIiwiYWRkcmVzcyI6IjB4N0RhODFGQTYzRWUzNDNEZTljYTMzYWI3QTE2YmUzRDAyMjU0OTgyOCIsImhvc3RuYW1lIjoibG9jYWxob3N0In19fX0.Kvw15ZqqU3CGEz04dhywQeL0gHhbXE9qsVV3UqWFXy2oNQi6QiTbDDTRroLNb0EECFe9nMWbgX_Na_hYpPbLN75n0V5ShjGvI4vgOfvE7p3boWvfMEfSQe-uIQavha29rPtg2whilHMZkCXH0VheXdbSdGVmmg53W9dVrMTaRP-DK8PMTV9D1XXXNIsMjzRulO8bkCbUbWIQWstZumJ04rePg7EKPQf2Ca4muzB-lPUxW916alu5JvJrrTbfsXXWl4QiAgQmTDP_rsW9jPxMXXl0xkn6pqc5Rhz01W_vF9dpSIBRF_wtfQa47V95nLGWYSVqP_WyC_Mh2EH-EgVCnQ" , {
        expires: 365
      })
      const bcaWeb3ConnectResult = await bcaWeb3Connect("0x7Da81FA63Ee343De9ca33ab7A16be3D022549828");
      expect(bcaWeb3ConnectResult.status).toBe("OK");
    });
    it('should hadle incorrect address type', async () => {
      Cookies.set(cookieName, "" , {
        expires: 365
      })
      const bcaWeb3ConnectResult = await bcaWeb3Connect(1);
      expect(bcaWeb3ConnectResult.status).toEqual({"errorCode": 1, "reason": "bcaWeb3Connect: No address provided to bcaWeb3Connect library argument"});
    });
    it('Should handle non parameter', async () => {
      Cookies.set(cookieName, "" , {
        expires: 365
      })
      const bcaWeb3ConnectResult = await bcaWeb3Connect();
      expect(bcaWeb3ConnectResult.status).toEqual({"errorCode": 1, "reason": "bcaWeb3Connect: No address provided to bcaWeb3Connect library argument"});
    });
    it('should connect succesfully', async () => {
      Cookies.set(cookieName, "" , {
        expires: 365
      })
      const bcaWeb3ConnectResult = await bcaWeb3Connect("0x7Da81FA63Ee343De9ca33ab7A16be3D022549828");
      expect(bcaWeb3ConnectResult.status).toBe("OK");
    });
  });
});
