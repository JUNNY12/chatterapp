import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';

// Function to handle image upload to Firebase storage and return the download URL
export const handleCustomImageUpload = async (storageRef: any, imageFile: any) => {
   return new Promise((resolve, reject) => {
      try {
         // Check if the same file exists in storage
         getDownloadURL(storageRef)
            .then(() => {
               reject('File with the same name already exists!');
            })
            .catch(() => {
               // File does not exist, proceed with upload

               // Upload the image file to Firebase storage
               const uploadTask = uploadBytesResumable(storageRef, imageFile);

               // Track upload progress
               uploadTask.on(
                  'state_changed',
                  (snapshot) => {
                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                     console.log('Upload progress:', progress);
                  },
                  (error) => {
                     console.error('Error during upload:', error);
                     reject('Error during image upload');
                  },
                  () => {
                     // Image upload complete
                     getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                           console.log('Image download URL:', downloadURL);
                           resolve(downloadURL);

                           toast.success('Image uploaded successfully!', {
                              position: toast.POSITION.TOP_CENTER,
                              autoClose: 1000,
                              hideProgressBar: true,
                              closeButton: true,
                              draggable: false,
                              pauseOnHover: true,
                              progress: undefined,
                           });
                        })
                        .catch((error) => {
                           console.error('Error getting download URL:', error);
                           reject('Error getting image download URL');
                        });
                  }
               );
            });
      } catch (error) {
         console.error('Error during image upload:', error);
         reject('Error during image upload');
      }
   });
};
