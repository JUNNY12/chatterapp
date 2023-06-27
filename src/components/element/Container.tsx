interface ContainerProps {
   children: React.ReactNode;
   className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
   return (
      <section role="section" className={` ${className} px-12 tabletM:px-8 tabletS:px-6`}>
         {children}
      </section>
   );
};
