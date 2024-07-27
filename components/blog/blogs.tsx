import { BlogCard } from "./blog-card";

export const Blogs = () => {
  return (
    <div className="flex flex-wrap items-center md:justify-normal justify-center px-auto w-full gap-x-4 gap-y-5">
      <BlogCard
        title="How to create nextjs project"
        slug="how-to-create-nextjs-project"
        content="This is the just for the test purpose so i have not read much content in this."
        image={"https://picsum.photos/id/237/200/300"}
        tags="NextJs React Javacsript"
        createdAt={"2023-03-23T10:30:00.000Z"}
      />
      <BlogCard
        title="How to create nextjs project"
        slug="how-to-create-nextjs-project"
        content="This is the just for the test purpose so i have not read much content in this."
        image={"https://picsum.photos/id/237/200/300"}
        tags="NextJs React Javacsript"
        createdAt={"2023-03-23T10:30:00.000Z"}
      />
      <BlogCard
        title="How to create nextjs project"
        slug="how-to-create-nextjs-project"
        content="This is the just for the test purpose so i have not read much content in this."
        image={"https://picsum.photos/id/237/200/300"}
        tags="NextJs React Javacsript"
        createdAt={"2023-03-23T10:30:00.000Z"}
      />
    </div>
  );
};
