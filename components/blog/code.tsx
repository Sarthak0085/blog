import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold, dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { v4 as uuid } from "uuid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import { FaMoon, FaSun } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export const Code = ({ node, inline, className, children, ...props }: any) => {
    const uniqueId = useMemo(() => uuid(), []);
    const [copied, setCopied] = useState<{ [key: string]: boolean }>({});
    const [theme, setTheme] = useState<{ [key: string]: string }>({ [uniqueId]: "dark" });
    const match = /language-(\w+)/.exec(className || '');

    const handleCopy = useCallback((id: string) => {
        navigator.clipboard.writeText(String(children));
        setCopied((prev) => ({ ...prev, [id]: true }));
        setTimeout(() => {
            setCopied((prev) => ({ ...prev, [id]: false }));
        }, 2000);
    }, [children]);

    useEffect(() => {
        setTheme((prev) => ({ ...prev, [uniqueId]: "dark" }))
    }, [uniqueId])

    const handleTheme = useCallback((id: string) => {
        setTheme((prev) => ({ ...prev, [id]: prev[id] === "light" ? "dark" : "light" }))
    }, []);

    if (inline) {
        return <code className="bg-gray-400 px-2">{String(children).trim()}</code>;
    } else {
        return (
            <div id={`code-block-${uniqueId}`} className={cn("relative my-2 border-l-4  border-[blueviolet]")}>
                {match && (
                    <div className={cn("flex items-center justify-between px-2 py-1 h-[44px] rounded-tr-md",
                        theme[uniqueId] === "dark" ?
                            "bg-black text-white" :
                            "bg-white text-black"
                    )}>
                        <span className="font-semibold px-2">{match[1]}</span>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <SyntaxHighlighter
                        language={match ? match[1] : ''}
                        style={theme[uniqueId] === "dark" ? dracula : coldarkCold}
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
                    className={cn("absolute top-1 right-1 z-1", theme[uniqueId] === "light" ? "text-black" : "text-white")}
                    onClick={() => handleCopy(uniqueId)}
                    aria-label={"Copy Button"}
                >
                    {copied[uniqueId] ? <TbCopyCheck size={20} /> : <TbCopy size={20} />}
                </Button>
                <Button
                    variant={"icon"}
                    className={cn("absolute top-1 right-8 z-1", theme[uniqueId] === "light" ? "text-black" : "text-white")}
                    onClick={() => handleTheme(uniqueId)}
                    aria-label={"Copy Button"}
                >
                    {theme[uniqueId] === "light" ? <FaMoon size={19} /> : <FaSun size={19} />}
                </Button>
            </div>
        )
    }
}