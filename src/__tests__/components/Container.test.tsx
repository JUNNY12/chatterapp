import { render } from '@testing-library/react';
import { Container } from '../../components/element';

describe('Container', () => {
   it('renders container with correct children and className', () => {
      const className = 'custom-class';
      const childText = 'This is the child element';
      const { getByRole } = render(
         <Container className={className}>
            <div>{childText}</div>
         </Container>
      );

      const container = getByRole('section');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass(className);
      expect(container).toHaveTextContent(childText);
   });
});
