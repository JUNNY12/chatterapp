import { describe, it, expect } from 'vitest';
import { greetings } from '../../utils/greetings';

describe('greetings', () => {
   it('returns the correct greeting based on the current hour', () => {
      const date = new Date();
      const hour = date.getHours();
      let expectedGreeting = '';

      if (hour >= 0 && hour < 12) {
         expectedGreeting = 'Good Morning';
      } else if (hour >= 12 && hour < 15) {
         expectedGreeting = 'Good Afternoon';
      } else if (hour >= 15 && hour < 24) {
         expectedGreeting = 'Good Evening';
      }
      expect(greetings()).toBe(expectedGreeting);
   });
});
