interface inputProps {
   className?: string;
   placeholder?: string;
   type?: string;
   value?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   name?: string;
   id?: string;
   required?: boolean;
   title?: string;
   role?: string;
   ariaLabel?: string;
   disabled?: boolean;
}

export const Input = ({
   className,
   placeholder,
   type,
   value,
   disabled,
   onChange,
   name,
   id,
   required,
   title,
   role,
   ariaLabel,
}: inputProps) => {
   return (
      <input
         className={` ${className}  outline-none  p-2`}
         placeholder={placeholder}
         type={type}
         value={value}
         onChange={onChange}
         name={name}
         id={id}
         disabled={disabled}
         required={required}
         title={title}
         role={role}
         aria-label={ariaLabel}
      />
   );
};
