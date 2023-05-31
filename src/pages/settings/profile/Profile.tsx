import { useThemeContext } from '../../../hooks/theme/useThemeContext';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { BasicInfo, SocialInfo } from '.';
import { Button } from '../../../components/element';
import { useFormData } from '../../../hooks/form/useFormData';
import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { getUser } from '../../../firebase/user';
import { updateProfile } from '../../../firebase/user';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import firebaseApp from '../../../firebase/config';
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    getStorage,
} from 'firebase/storage';

export default function Profile(): React.JSX.Element {
    const { theme } = useThemeContext();
    const { user } = useAuthContext();
    const [loading, setLoading] = useState<boolean>(false);
    const imageRef = useRef<any>(null);
    const [image, setImage] = useState<string | null>(null);

    const storage = getStorage(firebaseApp);

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (!imageRef) return;

        // Get image file on change event
        const imageFile = imageRef.current?.files?.[0];

        // Storage ref for each user with their uid
        const storageRef = ref(
            storage,
            `${user?.uid}/profileImage/${imageFile?.name}`
        );

        // Check if the same file exists in storage
        try {
            const downloadURL = await getDownloadURL(storageRef);
            toast.error('File with the same name already exists!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
                hideProgressBar: true,
                closeButton: true,
                draggable: false,
                pauseOnHover: true,
                progress: undefined,
            });
            return;
        } catch (error) {
            // console.log(error);
        }

        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    setImage(downloadURL);

                    toast.success('Image uploaded successfully!', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeButton: true,
                        draggable: false,
                        pauseOnHover: true,
                        progress: undefined,
                    });

                    if (user) {
                        updateProfile(user.uid, {
                            photoUrl: downloadURL,
                        });
                    }
                });
            }
        );
    };

    //destructure form data
    const {
        values: {
            displayName,
            fullName,
            location,
            photoUrl,
            occupation,
            bio,
            availability,
            email,
            twitter,
            instagram,
            facebook,
            github,
            linkedIn,
            website,
        },
        handleChange,
        setValues,
    } = useFormData({
        displayName: '',
        fullName: '',
        location: '',
        photoUrl: '',
        occupation: '',
        bio: '',
        availability: '',
        email: '',
        twitter: '',
        instagram: '',
        facebook: '',
        github: '',
        linkedIn: '',
        website: '',
    });

    //get user details
    useEffect(() => {
        if (user) {
            const getUserDetails = async () => {
                const userData = await getUser(user.uid);
                // console.log(userData[0]?.data?.socialInfo);

                //if details are available, set form values else set empty string
                setValues({
                    displayName: userData[0]?.data?.displayName || '',
                    fullName: userData[0]?.data?.fullName || '',
                    email: userData[0]?.data?.email || '',
                    photoUrl: userData[0]?.data?.photoUrl || '',
                    occupation: userData[0]?.data?.occupation || '',
                    bio: userData[0]?.data?.bio || '',
                    location: userData[0]?.data?.location || '',
                    availability: userData[0]?.data?.availability || '',
                    twitter: userData[0]?.data?.socialInfo?.twitter || '',
                    instagram: userData[0]?.data?.socialInfo?.instagram || '',
                    facebook: userData[0]?.data?.socialInfo?.facebook || '',
                    github: userData[0]?.data?.socialInfo?.github || '',
                    linkedIn: userData[0]?.data?.socialInfo?.linkedIn || '',
                    website: userData[0]?.data?.socialInfo?.website || '',
                });
            };
            getUserDetails();
        }
    }, [user]);

    //handle user update
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //if user is logged in
        if (user) {
            try {
                setLoading(true);
                //update user profile
                await updateProfile(user.uid, {
                    displayName,
                    fullName,
                    occupation,
                    bio,
                    photoUrl,
                    location,
                    availability,
                    socialInfo: {
                        twitter,
                        instagram,
                        facebook,
                        github,
                        linkedIn,
                        website,
                    },
                });

                //toast success if successful
                toast.success('Profile updated successfully', {
                    position: 'top-center',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }

        console.log('update:');
    };

    return (
        <div
            className={` transition p-4 me-8  tabletL:ms-8 tabletXS:mx-4 duration-500 mb-4 rounded-md border border-gray-300 ease-in-out ${
                theme === 'lightMode'
                    ? 'bg-white-50 text-black-950'
                    : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            } `}
        >
            <form onSubmit={handleUpdate}>
                <div className="my-3">
                    <label
                        title="change picture"
                        htmlFor="photoUrl"
                        className="relative block cursor-pointer w-24 h-24  object-cover rounded-full"
                    >
                        <img
                            src={image || photoUrl}
                            className=" w-full h-full rounded-full"
                            alt=""
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                            <MdOutlinePhotoCamera className=" text-2xl" />
                        </div>
                    </label>
                    <input
                        ref={imageRef}
                        type="file"
                        className="hidden"
                        id="photoUrl"
                        onChange={handleImageUpload}
                        name="photoUrl"
                    />
                </div>
                <div className="flex tabletXS:flex-col">
                    {/* Basic Info */}
                    <div className=" w-1/2 tabletXS:w-full">
                        <BasicInfo
                            fullName={fullName}
                            displayName={displayName}
                            email={email}
                            location={location}
                            occupation={occupation}
                            bio={bio}
                            availability={availability}
                            handleChange={handleChange}
                        />
                    </div>
                    {/* Social Info */}
                    <div className=" w-1/2 ms-8 tabletXS:w-full tabletXS:ms-0">
                        <SocialInfo
                            twitter={twitter}
                            instagram={instagram}
                            facebook={facebook}
                            github={github}
                            linkedIn={linkedIn}
                            website={website}
                            handleChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-center">
                    <Button className=" w-[200px] p-2 rounded-[40px] font-bold text-white-50 bg-pink-600 ">
                        {' '}
                        {loading ? (
                            <BeatLoader size={10} color={'#fff'} />
                        ) : (
                            'Update'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
