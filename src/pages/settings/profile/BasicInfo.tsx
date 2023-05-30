import { Typography, Input } from '../../../components/element';

export const BasicInfo = (): React.JSX.Element => {
    return (
        <div className="">
            <Typography
                variant={1}
                className="font-bold text-2xl mobileXL:text-lg"
            >
                Basic Info
            </Typography>

            <div className="flex  flex-col mb-4 ">
                <label
                    htmlFor="fullName"
                    className="block  font-normal mb-1 mt-3"
                >
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
                />
            </div>

            <div className="flex  flex-col mb-4 ">
                <label
                    htmlFor="displayName"
                    className="block  font-normal mb-1 mt-3"
                >
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
                />
            </div>

            <div className="flex  flex-col mb-4">
                <label
                    htmlFor="Location"
                    className="block  font-normal mb-1 mt-3"
                >
                    Location
                </label>
                <Input
                    type="text"
                    id="Location"
                    name="Location"
                    className=" bg-white-100
                            transition duration-500 ease-in-out
                            rounded-md focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold max-w-[600px] "
                    placeholder="Lagos, Nigeria"
                />
            </div>

            <div className="flex  flex-col mb-4">
                <label
                    htmlFor="occupation"
                    className="block  font-normal mb-1 mt-3"
                >
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
                />
            </div>

            <div className="flex  flex-col mb-4">
                <label
                    htmlFor="available"
                    className="block  font-normal mb-1 mt-3"
                >
                    I am available for
                </label>
                <textarea
                    className="h-[80px] max-w-[600px]
                            outline-none focus:border focus:border-pink-600 indent-3 placeholder:text-black-400 text-black-900 font-semibold
                            transition duration-500 ease-in-out
                            rounded-md bg-white-100"
                    id="available"
                    placeholder="I am available for mentoring ..."
                    name="available"
                />
            </div>
        </div>
    );
};
