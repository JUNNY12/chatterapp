import { Typography, Input } from '../../../components/element';
import { SearchTag } from '../../onboard';
import { useState } from 'react';

//interface BasicInfoProps {
interface BasicInfoProps {
   fullName: string;
   displayName: string;
   location: string;
   occupation: string;
   bio: string;
   availability: string;
   email: string;
   tags: string[];
   setValues: (values: any) => void;
   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const BasicInfo = ({
   fullName,
   displayName,
   email,
   location,
   occupation,
   bio,
   availability,
   tags,
   setValues,
   handleChange,
}: BasicInfoProps): React.JSX.Element => {
   const [query, setQuery] = useState<string>('');

   // Handle tag query
   const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
   };

   // Check if tag is selected
   const isSelected = (tag: string) => {
      return tags.includes(tag);
   };

   // Handle add tag
   const handleAddTag = (tag: string) => {
      const updatedTags = [...tags, tag];

      // Check if tag is already selected
      if (isSelected(tag)) {
         const updatedTags = tags.filter((t) => t !== tag);
         setValues((prevValues: any) => ({
            ...prevValues,
            tags: updatedTags,
         }));
      }
      // If not selected, add tag
      else {
         setValues((prevValues: any) => ({
            ...prevValues,
            tags: updatedTags,
         }));
      }
      setQuery(' ');
   };

   return (
      <div className="">
         <Typography variant={1} className="font-bold text-2xl mobileXL:text-lg">
            Basic Info
         </Typography>

         <div className="flex  flex-col mb-4 ">
            <label htmlFor="fullName" className="block  font-normal mb-1 mt-3">
               Full Name
            </label>
            <Input
               type="text"
               className=" bg-white-100 rounded-md max-w-[600px]
                            transition duration-500 ease-in-out
                            focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold "
               placeholder="John Doe"
               id="fullName"
               name="fullName"
               value={fullName}
               onChange={handleChange}
            />
         </div>

         <div className="flex  flex-col mb-4 ">
            <label htmlFor="displayName" className="block  font-normal mb-1 mt-3">
               Display Name
            </label>
            <Input
               type="text"
               className=" bg-white-100 rounded-md max-w-[600px]
                            transition duration-500 ease-in-out
                            focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold "
               placeholder="John"
               id="displayName"
               name="displayName"
               value={displayName}
               onChange={handleChange}
            />
         </div>
         <div className="flex  flex-col mb-4 ">
            <label htmlFor="email" className="block  font-normal mb-1 mt-3">
               Email
            </label>
            <Input
               type="email"
               className=" bg-white-100 rounded-md max-w-[600px]
                            transition duration-500 ease-in-out
                            focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold "
               placeholder="John"
               id="email"
               name="email"
               value={email}
               disabled={true}
               onChange={handleChange}
            />
            <div className=" text-red-600 italic">Note: You cannot change your email address</div>
         </div>

         <div className="flex  flex-col mb-4">
            <label htmlFor="Location" className="block  font-normal mb-1 mt-3">
               Location
            </label>
            <Input
               type="text"
               id="Location"
               name="location"
               className=" bg-white-100
                            transition duration-500 ease-in-out
                            rounded-md focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold max-w-[600px] "
               placeholder="Lagos, Nigeria"
               value={location}
               onChange={handleChange}
            />
         </div>

         <div className="flex  flex-col mb-4">
            <label htmlFor="occupation" className="block  font-normal mb-1 mt-3">
               Occupation
            </label>
            <Input
               type="text"
               id="occupation"
               name="occupation"
               className=" bg-white-100
                            transition duration-500 ease-in-out
                            rounded-md focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold max-w-[600px] "
               placeholder="Software Engineer"
               value={occupation}
               onChange={handleChange}
            />
         </div>

         <div className="flex  flex-col mb-4">
            <label htmlFor="bio" className="block  font-normal mb-1 mt-3">
               Bio: Tell us who you are
            </label>
            <textarea
               className="h-[80px] max-w-[600px]
                            outline-none focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold
                            transition duration-500 ease-in-out
                            rounded-md bg-white-100"
               id="bio"
               placeholder="Tell us who you are"
               name="bio"
               value={bio}
               onChange={handleChange}
            />
         </div>

         <div className="flex  flex-col mb-4">
            <label htmlFor="available" className="block  font-normal mb-1 mt-3">
               I am available for
            </label>
            <textarea
               className="h-[80px] max-w-[600px]
                            outline-none focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold
                            transition duration-500 ease-in-out
                            rounded-md bg-white-100"
               id="available"
               placeholder="I am available for mentoring ..."
               name="availability"
               value={availability}
               onChange={handleChange}
            />
         </div>

         <div>
            {query && (
               <SearchTag query={query} handleAddTag={handleAddTag} isSelected={isSelected} />
            )}
         </div>
         <div className="flex  flex-col mb-4">
            <label htmlFor="tag" className="block  font-normal mb-1 mt-3">
               Interested tags
            </label>
            <Input
               type="search"
               onChange={handleQuery}
               id="tag"
               name="tag"
               className=" bg-white-100 transition duration-500 ease-in-out
               rounded-md focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold max-w-[600px] "
               placeholder="Add more tags"
            />
         </div>
      </div>
   );
};
