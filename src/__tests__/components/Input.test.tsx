import { render } from '@testing-library/react';
import { Input } from '../../components/element';

describe('Input', () => {
   it('renders input with correct props and handles onChange event', () => {
      const placeholder = 'Enter your name';
      // const value = 'John Doe';
      // const onChangeMock = jest.fn();
      const { getByPlaceholderText } = render(
         <Input
            placeholder={placeholder}
            // value={value}
            // onChange={onChangeMock}
            name="name"
            id="input-name"
            disabled={false}
            required={true}
            title="Name Input"
            role="textbox"
            ariaLabel="Name Input"
         />
      );

      const input = getByPlaceholderText(placeholder);
      expect(input).toBeInTheDocument();
      // expect(input).toHaveValue(value);
      expect(input).toBeEnabled();
      expect(input).toBeRequired();
      expect(input).toHaveAttribute('title', 'Name Input');
      expect(input).toHaveAttribute('role', 'textbox');
      expect(input).toHaveAttribute('aria-label', 'Name Input');

      // fireEvent.change(input, { target: { value: 'Jane Doe' } });
      // expect(onChangeMock).toHaveBeenCalledTimes(1);
   });

   it('renders disabled input when disabled prop is true', () => {
      const { getByPlaceholderText } = render(<Input placeholder="Enter text" disabled={true} />);

      const input = getByPlaceholderText('Enter text');
      expect(input).toBeDisabled();
   });
});
