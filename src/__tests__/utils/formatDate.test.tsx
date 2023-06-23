import { describe, it, expect } from 'vitest';
import { formatDate } from '../../utils/formatDate';

describe('formatDate', () => {
   it('returns the correctly formatted date string', () => {
      // Test cases with different input dates
      expect(formatDate('2023-06-23')).toBe('June 23, 2023');
      expect(formatDate('2022-12-25')).toBe('December 25, 2022');
      expect(formatDate(new Date('2023-02-14'))).toBe('February 14, 2023');
   });
});
