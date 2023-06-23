import { describe, it, expect } from 'vitest';
import { getTimeDifferenceString } from '../../utils/getTimeDifference';

describe('getTimeDifferenceString', () => {
   it('returns the correct time difference string for different time differences', () => {
      // Test cases with different time differences
      expect(getTimeDifferenceString(1000)).toBe('1 second ago');
      expect(getTimeDifferenceString(60000)).toBe('1 minute ago');
      expect(getTimeDifferenceString(3600000)).toBe('1 hour ago');
      expect(getTimeDifferenceString(86400000)).toBe('1 day ago');
      expect(getTimeDifferenceString(604800000)).toBe('1 week ago');
      expect(getTimeDifferenceString(2592000000)).toBe('1 month ago');

      // Additional test cases
      expect(getTimeDifferenceString(2000)).toBe('2 seconds ago');
      expect(getTimeDifferenceString(120000)).toBe('2 minutes ago');
      expect(getTimeDifferenceString(7200000)).toBe('2 hours ago');
      expect(getTimeDifferenceString(172800000)).toBe('2 days ago');
      expect(getTimeDifferenceString(1209600000)).toBe('2 weeks ago');
      expect(getTimeDifferenceString(5184000000)).toBe('2 months ago');
   });
});
