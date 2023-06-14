interface CardProps {
   children: React.ReactNode;
   className?: string;
}

export const Card = ({ children, className }: CardProps) => {
   return (
      <article className={` ${className} bg-white-100 shadow-md shadow-black-900`}>
         {children}
      </article>
   );
};
