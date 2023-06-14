import { Typography, Input } from '../../../components/element';

interface SocialInfoProps {
   twitter: string;
   instagram: string;
   facebook: string;
   github: string;
   linkedIn: string;
   website: string;
   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const SocialInfo = ({
   twitter,
   instagram,
   facebook,
   github,
   linkedIn,
   website,
   handleChange,
}: SocialInfoProps): React.JSX.Element => {
   return (
      <div>
         <Typography variant={1} className="font-bold text-2xl mobileXL:text-lg">
            Social
         </Typography>

         <div className="flex  flex-col mb-4 ">
            <label htmlFor="twitter" className="block  font-normal mb-1 mt-3">
               Twiiter Profile
            </label>
            <Input
               type="url"
               className=" bg-white-100 rounded-md max-w-[600px]
                            transition duration-500 ease-in-out
                            focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold "
               placeholder="https://twitter.com/username"
               id="twitter"
               name="twitter"
               value={twitter}
               onChange={handleChange}
            />
         </div>

         <div className="flex  flex-col mb-4 ">
            <label htmlFor="instagram" className="block  font-normal mb-1 mt-3">
               Instagram Profile
            </label>
            <Input
               type="url"
               className=" bg-white-100 rounded-md max-w-[600px]
                            transition duration-500 ease-in-out
                            focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold "
               placeholder="https://instagram.com/username"
               id="instagram"
               name="instagram"
               value={instagram}
               onChange={handleChange}
            />
         </div>

         <div className="flex  flex-col mb-4 ">
            <label htmlFor="facebook" className="block  font-normal mb-1 mt-3">
               Facebook Profile
            </label>
            <Input
               type="url"
               className=" bg-white-100 rounded-md max-w-[600px]
                            transition duration-500 ease-in-out
                            focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold "
               placeholder="https://facebook.com/username"
               id="facebook"
               name="facebook"
               value={facebook}
               onChange={handleChange}
            />
         </div>

         <div className="flex  flex-col mb-4 ">
            <label htmlFor="github" className="block  font-normal mb-1 mt-3">
               Github Profile
            </label>
            <Input
               type="url"
               className=" bg-white-100 rounded-md max-w-[600px]
                            transition duration-500 ease-in-out
                            focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold "
               placeholder="https://github.com/username"
               id="github"
               name="github"
               value={github}
               onChange={handleChange}
            />
         </div>

         <div className="flex  flex-col mb-4 ">
            <label htmlFor="linkedin" className="block  font-normal mb-1 mt-3">
               Linkedin Profile
            </label>
            <Input
               type="url"
               className=" bg-white-100 rounded-md max-w-[600px]
                            transition duration-500 ease-in-out
                            focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold "
               placeholder="https://linkedin.com/username"
               id="linkedin"
               name="linkedIn"
               value={linkedIn}
               onChange={handleChange}
            />
         </div>

         <div className="flex  flex-col mb-4 ">
            <label htmlFor="website" className="block  font-normal mb-1 mt-3">
               Website Url
            </label>
            <Input
               type="url"
               className=" bg-white-100 rounded-md max-w-[600px]
                            transition duration-500 ease-in-out
                            focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold "
               placeholder="https://linkedin.com/username"
               id="website"
               name="website"
               value={website}
               onChange={handleChange}
            />
         </div>
      </div>
   );
};
