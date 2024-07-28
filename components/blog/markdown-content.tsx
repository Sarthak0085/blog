"use client";

import Image from "next/image";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import RemarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";

export const MarkdownContent = ({
  content,
}: {
  content: string | undefined;
}) => {
  const [copied, setCopied] = useState(false);

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
            {copied ? <TbCopyCheck /> : <TbCopy />}
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

  return (
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
          <p className="text-[16px] font-normal leading-normal">{children}</p>
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
      {content}
    </ReactMarkdown>
  );
};
