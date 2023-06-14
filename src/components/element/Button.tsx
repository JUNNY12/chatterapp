interface ButtonProps {
   children: React.ReactNode;
   className?: string;
   onClick?: () => void;
   title?: string;
   role?: string;
   arialabel?: string;
   disabled?: boolean;
}

export const Button = ({
   children,
   className,
   onClick,
   title,
   role,
   arialabel,
   disabled,
}: ButtonProps) => {
   return (
      <button
         disabled={disabled}
         onClick={onClick}
         title={title}
         role={role}
         aria-label={arialabel}
         className={` ${className} `}
      >
         {children}
      </button>
   );
};
