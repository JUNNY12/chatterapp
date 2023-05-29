export const DropNavSkeleton = (): React.JSX.Element => {
    return (
        <div>
            <div className="animate-pulse flex justify-center items-center flex-col">
                <div className="bg-gray-300 h-[100px] w-[100px] rounded-full mb-3"></div>
                <div className="bg-gray-300 h-[25px] w-[200px] rounded-sm mb-3"></div>
                <div className="bg-gray-300 h-[25px] w-[200px] rounded-sm mb-3"></div>
                <div className="bg-gray-300 h-[25px] w-[200px] rounded-sm mb-3"></div>
                <div className="bg-gray-300 h-[25px] w-[200px] rounded-sm mb-3"></div>
            </div>
        </div>
    );
};
