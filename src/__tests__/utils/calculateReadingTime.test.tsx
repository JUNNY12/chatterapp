import { describe, it, expect } from 'vitest';
import { calculateReadingTime } from '../../utils';

describe('calculateReadingTime', () => {
   it('returns the correct reading time in minutes', () => {
      // Test cases with different input content
      expect(calculateReadingTime('Lorem ipsum dolor sit amet.')).toBe(1);
      expect(calculateReadingTime('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBe(
         1
      );
      expect(
         calculateReadingTime(
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias nisi, quaerat error, tenetur sunt similique distinctio porro, vitae debitis fuga expedita quod rerum doloribus blanditiis quae itaque pariatur deserunt beatae quidem cumque iste! Natus ex eum, beatae nam nulla quae quibusdam, eius ipsum quos perspiciatis repudiandae reiciendis assumenda voluptas, quam similique dolores dolor? Necessitatibus cumque iste optio dolorem sunt facilis dolor beatae ea! Vel velit, iusto est modi omnis itaque quas, tempore rem accusamus pariatur quis in voluptatum, ullam eligendi dolore explicabo? Libero ipsam ab iusto nulla soluta mollitia ullam vitae itaque adipisci beatae, ipsa et reiciendis tenetur, optio unde. Ex quam molestias consequuntur impedit? Vero neque odit excepturi id eligendi. Voluptas magni beatae voluptatibus nihil cumque laborum quis repudiandae nisi quaerat enim quidem reprehenderit, sunt ad hic earum eligendi ducimus porro tenetur corporis laudantium! Doloribus est placeat doloremque error rem minus molestias ducimus quos tempore voluptatem tempora odit, obcaecati soluta adipisci, cum illum, nesciunt aspernatur unde aperiam repellat blanditiis maxime dolore ut? Ducimus repellendus possimus ab, architecto excepturi laborum facilis dolor illum nostrum corrupti ipsam fuga, eum officia debitis quos temporibus vitae consectetur pariatur perspiciatis reprehenderit, deleniti iste hic! Iusto dicta distinctio officiis architecto excepturi, ducimus tempora quas illo.'
         )
      ).toBe(2);
   });
});
