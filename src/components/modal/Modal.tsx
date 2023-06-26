import React, { ReactNode, useEffect, useRef } from 'react';
import { Button } from '../element';

type ModalProps = {
   isOpen: boolean;
   onClose: () => void;
   onYes?: () => void;
   onNo?: () => void;
   children: ReactNode;
};

export const Modal = ({
   isOpen,
   onClose,
   onYes,
   onNo,
   children,
}: ModalProps): React.JSX.Element | null => {
   const modalRef = useRef<HTMLDivElement>(null);

   // close modal when click outside
   useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
         // if click outside modal and not toggle button
         if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node) &&
            !(event.target as HTMLElement).closest('.toggle-button')
         ) {
            onClose();
         }
      };

      if (isOpen) {
         window.addEventListener('click', handleOutsideClick);
         document.body.style.overflow = 'hidden'; // Disable scrolling
      } else {
         document.body.style.overflow = ''; // Enable scrolling
      }

      return () => {
         window.removeEventListener('click', handleOutsideClick);
         document.body.style.overflow = ''; // Enable scrolling when the modal is unmounted
      };
   }, [isOpen, onClose]);

   // handle yes action
   const handleYes = () => {
      if (onYes) {
         onYes();
      }
      onClose();
   };

   // handle no action
   const handleNo = () => {
      if (onNo) {
         onNo();
      }
      onClose();
   };

   // if modal is not open, return null
   if (!isOpen) {
      return null;
   }

   return (
      <div
         ref={modalRef}
         className={`
        drop-shadow-xl fixed w-[400px] top-[250px] left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-40
        rounded-md transition duration-500 ease-in-out h-[200px] p-4
        bg-white-50 text-black-950 mobileXL:w-[280px] mobileXL:h-[200px]
      `}
      >
         <div className="absolute top-0 right-0 p-4">
            <Button title="close" className="  text-black-900 font-bold p-2" onClick={onClose}>
               X
            </Button>
         </div>
         <div className="mt-8 text-center text-xl mobileXL:text-base">{children}</div>

         <div className="flex justify-between items-center mt-4">
            <Button
               title="delete"
               className="bg-red-600 rounded-[40px] font-bold w-24 p-2 text-white-50"
               onClick={handleYes}
            >
               Yes
            </Button>
            <Button
               title="cancel"
               className="bg-green-600 rounded-[40px] font-bold w-24 p-2 text-white-50"
               onClick={handleNo}
            >
               No
            </Button>
         </div>
      </div>
   );
};
