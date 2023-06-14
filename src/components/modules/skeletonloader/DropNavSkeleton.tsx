export const DropNavSkeleton = (): React.JSX.Element => {
   return (
      <div>
         <div className=" flex items-center cursor-pointer font-semibold mb-4 pb-3 border-b border-black-300">
            <div className=" relative w-16 me-4  animate-pulse h-16 bg-gray-300 object-cover rounded-full "></div>
            <div>
               <div className="bg-gray-300 h-[25px] w-[100px] rounded-sm mb-3"></div>
               <div className="bg-gray-300 h-[25px] w-[80px] rounded-sm mb-3"></div>
            </div>
         </div>
         <div className="animate-pulse flex justify-center items-center flex-col">
            <div className="bg-gray-300 h-[25px] w-[150px] rounded-sm mb-3"></div>
            <div className="bg-gray-300 h-[25px] w-[150px] rounded-sm mb-3"></div>
            <div className="bg-gray-300 h-[25px] w-[150px] rounded-sm mb-3"></div>
            <div className="bg-gray-300 h-[25px] w-[100px] p-4 rounded-[40px] mb-3"></div>
         </div>
      </div>
   );
};
