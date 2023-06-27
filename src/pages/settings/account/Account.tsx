import { Button, Typography } from '../../../components/element';
import { useThemeContext } from '../../../hooks/theme/useThemeContext';
import { MetaTag } from '../../../components/metatag/MetaTag';
import { chatterImgUrl } from '../../../config/constants/url';
import { Modal } from '../../../components/modal';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { deleteAccount } from '../../../firebase/user';

export default function Account(): React.JSX.Element {
   const { theme } = useThemeContext();
   const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();

   //close modal
   const onClose = () => {
      setIsOpen(false);
   };

   // handle delete account
   const handleDelete = async () => {
      try {
         //delete user account
         await deleteAccount();
         //close modal
         setIsOpen(false);

         //navigate to onboard page
         setTimeout(() => {
            navigate('/onboard');
         }, 2000);
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <>
         <MetaTag
            title="Chatter "
            ogTitle="Manage your Account"
            description="Manage your account on our inclusive platform. Post diverse content, connect with like-minded individuals"
            image={chatterImgUrl}
            url="/settings/account"
            twitterTitle="Manage your Posts"
            twitterDescription="Manage your account on our inclusive platform. Post diverse content, connect with like-minded individuals"
            twitterImage={chatterImgUrl}
            twitterCard="summary_large_image"
            ogType="website"
            href="/settings/account"
         />
         <div
            className={` transition p-4 me-8  tabletL:ms-8 tabletXS:mx-4 duration-500 mb-4 rounded-md border border-gray-300 ease-in-out ${
               theme === 'lightMode'
                  ? 'bg-white-50 text-black-950'
                  : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            } `}
         >
            <div className="">
               <Typography
                  variant={1}
                  className="font-bold text-red-600 text-2xl mobileXL:text-lg p-4"
               >
                  Delete Account
               </Typography>

               <p className=" max-w-[800px] mb-4">
                  Your personal data will be deleted permanently when you delete your account on
                  Chatter. This action is irreversible.
               </p>

               <Button
                  disabled={true}
                  onClick={() => setIsOpen(true)}
                  className="toggle-button w-[200px] p-2 rounded-[40px] cursor-not-allowed opacity-60 text-white-50 bg-red-600 "
               >
                  {' '}
                  Delete Account
               </Button>
            </div>
         </div>
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            onYes={() => handleDelete()}
            onNo={() => setIsOpen(false)}
         >
            <p>Do you want to delete your account?</p>
         </Modal>
      </>
   );
}
