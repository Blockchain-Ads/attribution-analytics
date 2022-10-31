import { bcaWeb3Connect } from "../dist/index.module.js";
/**
 * @jest-environment jsdom
 */

describe('index', () => {
  describe('bcaWeb3Connect', () => {
    it('should return a string containing the message', async () => {
      const result = await bcaWeb3Connect("0x7Da81FA63Ee343De9ca33ab7A16be3D022549828");
console.log('RESULT', result)
    });
  });
});
