import { BookmarkPosts } from "."

export default function Bookmark():React.JSX.Element{
    return(
        <section className={` bg-white-100`}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
                <BookmarkPosts />
            </div>
        </section>
    )
}