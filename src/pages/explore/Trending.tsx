import { Typography } from '../../components/element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
// import { useFetchPost } from '../../hooks/article/useFetchPost';

export const Trending = (): React.JSX.Element => {
   const { theme } = useThemeContext();

   // const {loading, trendingPosts } = useFetchPost();

   // console.log(trendingPosts, loading)

   return (
      <section
         className={`rounded-md m-8 tabletXS:m-3 h-full transition duration-500 ease-in-out 
         ${
            theme === 'lightMode'
               ? 'bg-white-50 text-black-950'
               : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         }
        `}
      >
         <Typography variant={1} className="text-3xl font-bold mb-3 px-8 pt-8 mobileXL:px-2">
            Trending
         </Typography>
         <div>
            {/* <div>
                    {posts.slice(0, 5).map((post) => {
                        const { id, title, description, datePosted } = post;
                        return (
                            <article className="border-b border-gray-300 p-8 mobileXL:px-2">
                                <div className=" flex items-center mb-3">
                                    <div className=" w-[100px] h-[100px] mobileXL:w-[50px] mobileXL:h-[50px] me-4 border border-gray-300 relative rounded-full object-cover">
                                        <img
                                            src="/images/hero.svg"
                                            alt="user"
                                            className=" rounded-full object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <Typography
                                            variant={1}
                                            className="font-bold text-2xl mobileXL:text-lg"
                                        >
                                            John Doe
                                        </Typography>
                                        <Typography
                                            variant={2}
                                            className=" font-semibold mobileXL:text-[12px] inline-flex flex-wrap"
                                        >
                                            <span> Product Manager </span>
                                            <span className=" ms-6 mobileXL:ms-3">
                                                {datePosted}
                                            </span>
                                        </Typography>
                                    </div>
                                </div>
                                <div key={id} className=" mb-3">
                                    <Typography
                                        variant={1}
                                        className=" text-3xl mobileXL:text-xl font-bold mb-2"
                                    >
                                        {title}
                                    </Typography>
                                    <p className=" max-w-[600px]">
                                        {description.substring(0, 100)}
                                    </p>
                                    <Typography
                                        variant={2}
                                        className="text-sm font-bold mb-3 text-pink-600"
                                    >
                                        Read More ...
                                    </Typography>
                                </div>
                            </article>
                        );
                    })}
                </div> */}
         </div>
      </section>
   );
};
