import React from 'react';

interface TypographyProps {
   children: React.ReactNode;
   className?: string;
   title?: string;
   role?: string;
   ariaLabel?: string;
   variant: 1 | 2 | 3 | 4 | 5 | 6;
   onClick?: () => void;
}

export const Typography = ({
   children,
   className,
   title,
   role,
   ariaLabel,
   variant,
   onClick,
}: TypographyProps) => {
   const Tag = `h${variant}` as keyof React.JSX.IntrinsicElements;

   return (
      <Tag
         title={title}
         onClick={onClick}
         role={role}
         aria-label={ariaLabel}
         className={`${className} rounded-sm border-none`}
      >
         {children}
      </Tag>
   );
};
