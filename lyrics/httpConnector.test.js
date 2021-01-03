import { getAsync } from './lyrics/httpConnector.js';

describe('get api response', () => {
    test('should get the correct number of duplicates', () => {
        expect(getAsync('test')).toBe("ok");
    });
});
