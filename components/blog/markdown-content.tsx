"use client";

import Image from "next/image";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import RemarkGfm from "remark-gfm";
import RehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { v4 as uuid } from "uuid";
import { useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export const MarkdownContent = ({
  content,
}: {
  content: string | undefined;
}) => {

  // markdown code highlighter
  const Code = ({ node, inline, className, children, ...props }: any) => {
    const [copied, setCopied] = useState<{ [key: string]: boolean }>({});
    const uniqueId = useMemo(() => uuid(), []);
    const match = /language-(\w+)/.exec(className || "");
    console.log({ node, inline }, typeof children, children)

    const handleCopy = useCallback((id: string) => {
      navigator.clipboard.writeText(children);
      setCopied((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    }, [children]);

    if (inline) {
      return <code className="bg-[#b6b6b6]">{String(children).trim()}</code>;
    } else {
      return (
        <div id={`code-block-${uniqueId}`} className={cn("relative my-2 border-l-4  border-[blueviolet]")}>
          {match && (
            <div className="flex items-center justify-between px-2 py-1 h-[44px] bg-black text-white rounded-tr-md">
              <span className="font-semibold px-2">{match[1]}</span>
            </div>
          )}
          <div className="overflow-x-auto">
            <SyntaxHighlighter
              language={match ? match[1] : ''}
              style={dracula}
              PreTag="pre"
              codeTagProps={{
                style: {
                  paddingLeft: '4px',
                  borderRadius: '0 0 10px 10px',
                  whiteSpace: 'pre-wrap',
                  width: '100%',
                },
              }}
              customStyle={{
                margin: "0 !important",
                borderRadius: "0",
                borderBottomRightRadius: "5px !important",
              }}
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          </div>
          <Button
            variant={"icon"}
            className="absolute top-2 right-1 z-1 text-white "
            onClick={() => handleCopy(uniqueId)}
            aria-label={"Copy Button"}
          >
            {copied[uniqueId] ? <TbCopyCheck size={20} /> : <TbCopy size={20} />}
          </Button>
        </div>
      )
    }
  };


  return (
    <ReactMarkdown
      remarkPlugins={[RemarkGfm]}
      rehypePlugins={[RehypeRaw]}
      components={{
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
            className="text-[blue] hover:underline  hover:underline-offset-2"
          >
            {children}
          </a>
        ),
        img: ({ src, alt }) => (
          <div className="flex flex-col items-center justify-center my-2">
            <Image
              src={
                src ??
                "https://imgs.search.brave.com/bEdhPwVY999DtrOvmIRnmmMKJrDrxNNcMabCyDXr8Ss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVibGljZG9tYWlu/cGljdHVyZXMubmV0/L3BpY3R1cmVzLzI4/MDAwMC92ZWxrYS9u/b3QtZm91bmQtaW1h/Z2UtMTUzODM4NjQ3/ODdsdS5qcGc"
              }
              alt={alt || "image"}
              layout="responsive"
              width={"100"}
              height={"100"}
              className="w-full h-auto py-2 !rounded"
            />
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
          <Button variant={"ghost"} className="bg-blue-400" {...rest} />
        ),
        code: Code,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
