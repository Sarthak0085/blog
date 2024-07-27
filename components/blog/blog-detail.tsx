"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CopyIcon, SlashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AuthorAndDateDisplay } from "./author-date-display";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { TbCopyCheck } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import RemarkGfm from "remark-gfm";

const data = {
  id: 1,
  title: "Understanding Markdown for Documentation",
  slug: "understanding-markdown-for-documentation",
  content: `
# Understanding Markdown

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. It is often used for README files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Why Use Markdown?

Markdown allows you to write using an easy-to-read and easy-to-write plain text format, which can be converted to HTML and many other formats. Here are some benefits of using Markdown:

- **Simplicity**: It is easy to learn and use.
- **Flexibility**: You can convert it to various formats, including HTML and PDF.
- **Portability**: Markdown files are plain text files, making them easy to share and version control.

## Basic Syntax

Markdown has a simple syntax that allows you to format text. Here are some common elements:

### Headers

You can create headers by using the # symbol. The number of # symbols indicates the level of the header:


### Lists

You can create ordered and unordered lists:

- Item 1
- Item 2
  - Subitem 2.1

1. First item
2. Second item

### Links

To create a link, use the following syntax:

[Link Text](https://example.com)

### Images

To add an image, use this syntax:

![Alt Text]()

### Code Blocks

You can include code blocks by using backticks. For inline code, use a single backtick:

Here is some inline code: \`console.log('Hello, World!');\`

For multi-line code blocks, use triple backticks:

\`\`\`javascript
function greet() {
    console.log('Hello, World!');
}

greet();
\`\`\`

## Conclusion

Markdown is a powerful tool for writing formatted text. Its simplicity and versatility make it a popular choice for documentation and content creation. By mastering Markdown, you can enhance your writing and make your documents more appealing and easier to read.

### Further Reading

- [Markdown Guide](https://www.markdownguide.org)
- [CommonMark](https://commonmark.org)
`,
  category: "Documentation",
  tags: ["Markdown", "Documentation", "Writing"],
  status: "published",
  createdAt: "2023-07-30T12:00:00.000Z",
  image: "https://picsum.photos/id/237/200/300",
  author: {
    name: "Jane Doe",
    bio: "Jane is a technical writer with a passion for making complex topics accessible. She enjoys writing about programming, web development, and documentation.",
    profileImage: "https://picsum.photos/id/240/200/200",
    socialLinks: {
      twitter: "https://twitter.com/janedoe",
      linkedin: "https://linkedin.com/in/janedoe",
    },
  },
  shortSummary:
    "A comprehensive guide to using Markdown for writing and formatting documentation, including its benefits and basic syntax.",
};

export const BlogDetails = ({ slug }: { slug: string | string[] }) => {
  const [copied, setCopied] = useState(false);
  //   const fetchData = () => {
  //     const data = {
  //       title: "How to Start with NextJs",
  //     };
  //     return data;
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, [slug]);

  // markdown code highlighter
  const Code = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");

    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

    if (inline) {
      return <code>{inline}</code>;
    } else if (match) {
      return (
        <div className="relative my-2">
          <SyntaxHighlighter
            style={a11yDark}
            language={match[1]}
            PreTag={"pre"}
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            className="absolute top-0 right-0 z-1 bg-[#3d3d3d] text-white p-3"
            onClick={handleCopy}
            aria-label={"Copy Button"}
            title={"Copy Button"}
          >
            {copied ? <TbCopyCheck /> : <CopyIcon />}
          </button>
        </div>
      );
    } else {
      return (
        <code className="bg-[#3d3e3e] text-white px-2 py-1" {...props}>
          {children}
        </code>
      );
    }
  };

  const backgroundImageUrl =
    "https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif";
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
      className="relative bg-cover bg-center min-h-screen w-full bg-fixed flex justify-center items-center"
    >
      <div className="relative w-full md:w-[70%] lg:w-[60%] xl:w-[50%] flex flex-col space-y-4 px-10 py-10">
        <div>
          <Breadcrumb className="text-start">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-[purple] font-semibold"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/blogs?category=${data.category}`}
                  className="text-[purple] font-semibold"
                >
                  {data.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/blog/${slug}`}
                  className="text-[purple] font-semibold"
                >
                  {data.slug}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
        </div>
        <AuthorAndDateDisplay
          author={data.author.name}
          date={data.createdAt}
          content={data.content}
          category={data.category}
        />
        <div className="text-muted-foreground">{data.shortSummary}</div>
        <Image
          src={data.image}
          alt={`image of :- ${data.slug}`}
          className="w-full h-auto object-cover rounded-md"
          width={500}
          height={500}
        />

        <div className="text-black">
          <ReactMarkdown
            remarkPlugins={[RemarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-[26px] font-bold py-1">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-[24px] font-semibold py-1">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-[22px] font-semibold py-1">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-[20px] font-normal py-1">{children}</h4>
              ),
              h5: ({ children }) => (
                <h5 className="text-[18px] font-normal py-1">{children}</h5>
              ),
              h6: ({ children }) => (
                <h6 className="text-[16px] font-normal py-1">{children}</h6>
              ),
              p: ({ children }) => (
                <p className="text-[16px] font-normal leading-normal">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="my-[1rem] mx-0 pl-3 list-disc py-1">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="my-[1rem] mx-0 pl-3 list-decimal py-1">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-[16px] font-normal">{children}</li>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[blue] hover:underline"
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <Image
                  src={
                    src ??
                    "https://imgs.search.brave.com/bEdhPwVY999DtrOvmIRnmmMKJrDrxNNcMabCyDXr8Ss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVibGljZG9tYWlu/cGljdHVyZXMubmV0/L3BpY3R1cmVzLzI4/MDAwMC92ZWxrYS9u/b3QtZm91bmQtaW1h/Z2UtMTUzODM4NjQ3/ODdsdS5qcGc"
                  }
                  alt={alt || "image"}
                  width={"100"}
                  height={"100"}
                  className="w-full h-auto py-2 rounded-md"
                />
              ),
              div: ({ children }) => (
                <div style={{ margin: "1em 0" }}>{children}</div>
              ),
              code: Code,
            }}
          >
            {data.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
