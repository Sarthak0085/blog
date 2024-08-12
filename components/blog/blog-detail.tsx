"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { AuthorAndDateDisplay } from "./author-date-display";
import { ExtendBlog } from "@/utils/types";
import Link from "next/link";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { BlogBreadCrumb } from "@/components/blog/blog-bread-crumb";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Features } from "./features";
import * as z from "zod";
import { likeBlog } from "@/actions/likes/like-blog";
import { toast } from "sonner";
import { DislikeSchema, FavouriteSchema, LikeSchema, SavedPostSchema } from "@/schemas";
import { dislikeBlog } from "@/actions/dislikes/dislike-blog";
import { addOrRemoveToFavourite } from "@/actions/favourites/add-to-favourite";
import { savedBlogPost } from "@/actions/savedpost/saved-blog-post";
import { BlogComments } from "./blog-comments";
import { incrementViewCount } from "@/actions/blog/get-blogs";
import { AboutAuthor } from "./about-author";
import { User } from "@prisma/client";
import { Separator } from "../ui/separator";
import { AiOutlineTag } from "react-icons/ai";

const markdown = `
*emphasis*
A paragraph with and **strong importance**.

> A block quote with ~strikethrough~  ~~Hello~~ and a URL: [React](https://reactjs.org).

* Lists
* [ ] todo
* [x] done

A table:

| c | d |
| --- | --- |
| fs | gd |

\` Hello \` Bye this is fun

<h1 style="font-size: 20px; color: blue;">Hello</h1>
<h2>Bye</h2>

The lift coefficient ($C_L$) is a dimensionless coefficient

<div style="color: red;">This is raw HTML in Markdown.</div>

<b className="animate pulse text-blue-500 hover:text-blue-100">Hello Guys</b>
<button onClick="()=>{const targetElement = document.getElementById('targetElement');
    targetElement.scrollIntoView({ behavior: 'smooth' });}">Hello</button>

<button onClick="() => console.log('hello')">Hello</button>



  <hr />

\`\`\`js
function add(a, b) {
  return a + b;
}
\`\`\`

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        // Print "Hello, World!" to the console
        System.out.println("Hello, World!");
    }
}
\`\`\`

\`\`\`jsx
npm run dev
\`\`\`

\`\`\`
npm run dev
\`\`\`

*emphasis*

<div>
_Hello_ <i>Bye</i>
</div>

*This text is italic using Markdown*

<div class="custom-html">
  <!-- Markdown content for HTML tags is not processed -->
  <span class="inner-markdown">
    **This text should be italic but won't be processed inside this HTML tag**
  </span>
</div>

<div class="note">
  Some  and <strong>strong</strong>!
</div>

<i id="targetElement">Why are </i>

<h1>Hello</h1>
`

export const BlogDetails = ({ data }: { data: ExtendBlog | null }) => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [displayComment, setDisplayComment] = useState(false);

  const commentSectionRef = useRef<HTMLDivElement>(null);
  const handleCommentButtonClick = () => {
    setDisplayComment(true);
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [like, setLike] = useState({
    isLiked: !!data?.likes.find((item) => item.userId === user?.id),
    count: data?.likes?.length,
  });
  const [dislike, setDislike] = useState({
    isDisliked: !!data?.dislikes.find((item) => item.userId === user?.id),
    count: data?.dislikes?.length,
  });
  const [favourites, setFavourites] = useState({
    isFavourite: !!data?.favourites.find((item) => item.userId === user?.id),
    count: data?.favourites?.length,
  });
  const [savedPost, setSavedPost] = useState({
    isSaved: !!data?.savedPosts.find((item) => item.userId === user?.id),
    count: data?.savedPosts?.length,
  });

  const handleLike = (values: z.infer<typeof LikeSchema>) => {
    const prevLike = like;
    setLike((prev) => ({
      isLiked: !prev.isLiked,
      count: prev.isLiked ? (prev.count || 1) - 1 : (prev.count || 0) + 1,
    }));

    startTransition(() => {
      likeBlog(values)
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
          }
          if (data?.error) {
            setLike(prevLike);
            toast.error(data?.error);
          }
        })
        .catch((error) => {
          setLike(prevLike);
          toast.error(error);
        });
    });
  };

  const handleDislike = (values: z.infer<typeof DislikeSchema>) => {
    const prevDislike = dislike;
    setDislike((prev) => ({
      isDisliked: !prev.isDisliked,
      count: prev.isDisliked ? (prev.count || 1) - 1 : (prev.count || 0) + 1,
    }));

    startTransition(() => {
      dislikeBlog(values)
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
          }
          if (data?.error) {
            setDislike(prevDislike);
            toast.error(data?.error);
          }
        })
        .catch((error) => {
          setDislike(prevDislike);
          toast.error(error);
        });
    });
  };

  const toggleFavourite = (values: z.infer<typeof FavouriteSchema>) => {
    const prevFav = favourites;
    setFavourites((prev) => ({
      isFavourite: !prev.isFavourite,
      count: prev.isFavourite ? (prev.count || 1) - 1 : (prev.count || 0) + 1,
    }));

    startTransition(() => {
      addOrRemoveToFavourite(values)
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
          }
          if (data?.error) {
            setFavourites(prevFav);
            toast.error(data?.error);
          }
        })
        .catch((error) => {
          setFavourites(prevFav);
          toast.error(error);
        });
    });
  };

  const handleSavedPost = (values: z.infer<typeof SavedPostSchema>) => {
    const prevSavedPost = savedPost;
    setSavedPost((prev) => ({
      isSaved: !prev.isSaved,
      count: prev.isSaved ? (prev.count || 1) - 1 : (prev.count || 0) + 1,
    }));

    startTransition(() => {
      savedBlogPost(values)
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
          }
          if (data?.error) {
            setSavedPost(prevSavedPost);
            toast.error(data?.error);
          }
        })
        .catch((error) => {
          setSavedPost(prevSavedPost);
          toast.error(error);
        });
    });
  };

  useEffect(() => {
    const incrementViews = async () => {
      const result = await incrementViewCount(data?.id as string);
      if (result.error) {
        console.error(result.error);
      }
    };

    incrementViews();
  }, [data]);

  const backgroundImageUrl =
    "https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif";

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
      className="relative bg-cover bg-center min-h-screen w-full bg-fixed flex justify-center items-center"
    >
      <div className="relative w-full md:w-[75%] lg:w-[65%] xl:w-[55%] flex flex-col space-y-4 px-10 py-10">
        <div>
          <BlogBreadCrumb category={data?.category?.name} slug={data?.slug} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{data?.title}</h1>
        </div>
        <AuthorAndDateDisplay
          author={data?.user as User}
          date={data?.createdAt}
          time={data?.read_time}
          category={data?.category?.name}
        />
        <Features
          like={like}
          dislike={dislike}
          favourites={favourites}
          savedPost={savedPost}
          handleLike={handleLike}
          handleDislike={handleDislike}
          toggleFavourite={toggleFavourite}
          handleSavedPost={handleSavedPost}
          isPending={isPending}
          handleCommentButtonClick={handleCommentButtonClick}
          data={data}
        />
        <div className="text-muted-foreground bold">{data?.shortSummary}</div>
        <Image
          src={data?.imageUrl || ""}
          alt={`image of: - ${data?.slug} `}
          className="w-full h-auto object-cover rounded-md"
          layout="responsive"
          width={500}
          height={500}
        />

        <div className="text-black">
          <MarkdownContent content={markdown} />
        </div>
        <Separator />
        <div className="flex gap-4 flex-wrap">
          {data?.tags.map((item, index) => (
            <Link
              key={index}
              href={`/ blogs ? tag = ${item} `}
              className="border p-1 border-collapse text-primary flex gap-1 text-sm border-[purple] rounded-md cursor-pointer hover:bg-[purple] hover:text-white"
            >
              <AiOutlineTag size={20} /> {item}
            </Link>
          ))}
        </div>
        <div className="pt-[70px]">
          <AboutAuthor user={data?.user as User} />
        </div>
        {displayComment && <div className="text-black">
          <BlogComments ref={commentSectionRef} blogId={data?.id} />
        </div>}
      </div>
    </div>
  );
};
