"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Button } from "@/components/ui/button";
import remarkGfm from "remark-gfm";
import { Code } from "./code";

export const MarkdownContent = ({
  content,
}: {
  content: string | undefined;
}) => {

  const customSanitizeSchema = {
    tagNames: [
      'div', 'span', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'b', 'i', 'hr', 'table', 'thead',
      'tbody', 'tr', 'th', 'td', 'ul', 'ol', 'li', 'strong', 'em', 'br', 'button', 'code', 'pre'
    ],
    attributes: {
      '*': ['style', 'href', 'target', 'class'],
      'a': ['href', 'target'],
      'img': ['src', 'alt'],
      'button': ['type', 'onclick', 'disabled', 'class'],
      'pre': ['class', 'className'],
      'code': ['class', 'className'],
    },
    protocols: {
      href: ['http', 'https', 'mailto'],
    },
    allowComments: true,
  };


  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw as any, [rehypeSanitize, customSanitizeSchema]]}
      components={{
        code: Code,
        h1: ({ node, ...rest }) => (
          <h1 className="text-[26px] font-bold py-1" {...rest} />
        ),
        h2: ({ node, ...rest }) => (
          <h2 className="text-[24px] font-semibold py-1" {...rest} />
        ),
        h3: ({ node, ...rest }) => (
          <h3 className="text-[22px] font-medium py-1" {...rest} />
        ),
        h4: ({ node, ...rest }) => (
          <h4 className="text-[20px] font-medium py-1" {...rest} />
        ),
        h5: ({ node, ...rest }) => (
          <h5 className="text-[18px] font-normal py-1" {...rest} />
        ),
        h6: ({ node, ...rest }) => (
          <h6 className="text-[16px] font-normal py-1" {...rest} />
        ),
        p: ({ node, ...rest }) => (
          <p className="text-[16px] font-normal leading-normal" {...rest} />
        ),
        i: ({ node, ...rest }) => (
          <i className="text-muted-foreground" {...rest} />
        ),
        em(props) {
          const { node, ...rest } = props
          return <i className="text-muted-foreground" {...rest} />
        },
        b: ({ children, ...rest }) => (
          <b className="text-bold" {...rest} >{children}</b>
        ),
        ul: ({ children }) => (
          <ul className="my-[1rem] mx-0 pl-3 list-disc py-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-[1rem] mx-0 pl-3 list-decimal py-1">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-[16px] font-normal">{children}</li>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="!text-[blue] hover:underline  hover:underline-offset-2"
          >
            {children}
          </a>
        ),
        img: ({ src, alt }) => (
          <div className="flex flex-col items-center px-1 !rounded-md justify-center my-2">
            <picture>
              <img
                src={
                  src ?? ""
                }
                alt={alt || "image"}
                className="w-full h-auto py-2 !rounded"
                width={"100"}
                height={"100"}
              />
            </picture>
            {alt && <span className="text-muted-foreground text-sm">{alt}</span>}
          </div>
        ),
        div(props) {
          const { node, ...rest } = props
          return <div className="my-[1em]" {...rest} />
        },
        span: ({ children }) => (
          <span>{children}</span>
        ),
        hr: () => (
          <div className="my-3 flex items-center justify-center">
            <hr className="h-[1px] bg-black border-none w-[90%]" />
          </div>
        ),
        table: ({ children }) => (
          <table className="w-full md:w-[80%] border-collapse mx-auto my-4">
            {children}
          </table>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-100/80 border border-muted-foreground">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="bg-white/20 border border-muted-foreground">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="border border-muted-foreground">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="p-2 text-center font-medium border border-muted-foreground">{children}</th>
        ),
        td: ({ children }) => (
          <td className="p-2 text-center border border-muted-foreground">{children}</td>
        ),
        blockquote: ({ node, ...rest }) => (
          <blockquote className="border-l-4 border-gray-300 my-4 text-gray-600 bg-gray-100 rounded-lg p-4" {...rest} />
        ),
        button: ({ node, ...rest }) => (
          <Button variant={"outline"} className="bg-transparent my-2 shadow-md hover:bg-blue-500" {...rest} />
        ),
      }}
    >
      {String(content)}
    </ReactMarkdown>
  );
};
