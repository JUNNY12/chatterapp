import { Typography } from '../../components/element';
import { render } from '@testing-library/react';

describe('Typography', () => {
   it('renders the correct heading element and props', () => {
      const children = 'Hello, World!';
      const title = 'Heading Title';
      const role = 'heading';
      const ariaLabel = 'Heading';
      const variant = 2;
      // const onClickMock = jest.fn();

      const { getByRole } = render(
         <Typography
            variant={variant}
            title={title}
            role={role}
            ariaLabel={ariaLabel}
            // onClick={onClickMock}
         >
            {children}
         </Typography>
      );

      const heading = getByRole('heading', { level: variant });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(children);
      expect(heading).toHaveAttribute('title', title);
      expect(heading).toHaveAttribute('role', role);
      expect(heading).toHaveAttribute('aria-label', ariaLabel);

      // fireEvent.click(heading);
      // expect(onClickMock).toHaveBeenCalledTimes(1);
   });
});
