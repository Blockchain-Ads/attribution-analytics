import { bcaWeb3Connect } from "../dist/index.module.js";
/**
 * @jest-environment jsdom
 */

describe('index', () => {
  describe('bcaWeb3Connect', () => {
    it('should return a string containing the message', async () => {
      const result = await bcaWeb3Connect();
    });
  });
});
