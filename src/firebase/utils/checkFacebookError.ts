import { toast } from 'react-toastify';

export const checkFacebookError = (error: any) => {
   toast.error(error.code, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
   });
};
