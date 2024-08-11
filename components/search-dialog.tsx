"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Blog } from "@prisma/client";
import { SearchBlogListSkeleton } from "./loader/search-blog-list-skeleton";
import { formatDate } from "@/lib/date-format";

interface SearchDialogProps {
    blogs: Blog[];
    isLoading: boolean;
    error: string;
}

export function SearchDialog({ blogs, isLoading, error }: SearchDialogProps) {
    const scrollableContainerRef = useRef<HTMLDivElement>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [input, setInput] = useState("");
    const [searchBlogs, setSearchBlogs] = useState(blogs);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [shortcut, setShortcut] = useState("Ctrl K");

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.code === "KeyK" && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                setDialogOpen(true);
            } else if (event.code === "ArrowDown") {
                event.preventDefault();
                setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, searchBlogs.length - 1));
            } else if (event.code === "ArrowUp") {
                event.preventDefault();
                setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            } else if (event.code === "Enter" && selectedIndex !== -1) {
                event.preventDefault();
                document.getElementById(`blog-link-${selectedIndex}`)?.click();
            }
            if (event.code === "ArrowDown" || event.code === "ArrowUp") {
                event.preventDefault();
                const container = scrollableContainerRef.current;
                if (container) {
                    if (selectedIndex > 3) {
                        const scrollAmount = event.code === "ArrowDown" ? 85 : -80;
                        container.scrollBy({ top: scrollAmount, behavior: "smooth" });
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [searchBlogs, selectedIndex]);

    useEffect(() => {
        const filterBlogs = blogs.filter((blog) => {
            return (
                blog.title.toLowerCase().includes(input.toLowerCase()) ||
                blog.shortSummary.toLowerCase().includes(input.toLowerCase()) ||
                blog.content.toLowerCase().includes(input.toLowerCase())
            );
        });
        setSearchBlogs(filterBlogs);
        setSelectedIndex(-1);
    }, [blogs, input]);

    useEffect(() => {
        const isMacOS = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        setShortcut(isMacOS ? "Cmd K" : "Ctrl K");
    }, []);

    function handleClose(open?: boolean) {
        if (!open) setDialogOpen(false);
        setInput("");
        setSelectedIndex(-1);
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={handleClose}>
            <DialogTitle hidden>Search</DialogTitle>
            <Button variant="outline" className="pr-2 !bg-transparent border border-black shadow" onClick={() => setDialogOpen(true)}>
                <div className="items-center gap-2 flex">
                    <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]" />
                    Search title, slug...
                    <kbd className="bg-white/15 p-1.5 rounded-sm text-xs leading-3">{shortcut}</kbd>
                </div>
                <div className="block md:hidden">
                    <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]" />
                </div>
            </Button>
            <DialogContent className="max-w-2xl z-[200] gap-0 p-0 ">
                <div className="flex items-center px-4 py-2 border-b">
                    <MagnifyingGlassIcon className="h-[1.5rem] w-[1.5rem]" />
                    <Input
                        type="text"
                        placeholder="Type title"
                        className="text-base border-none shadow-none focus-visible:outline-none focus-visible:ring-0"
                        value={input}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                    />
                </div>
                <div className="h-[400px] overflow-y-scroll" ref={scrollableContainerRef}>
                    {isLoading && <SearchBlogListSkeleton />}
                    {error && <div className="flex items-center justify-center text-3xl text-[red]">
                        {error}
                    </div>}
                    {!isLoading && !error && searchBlogs.length > 0 ? searchBlogs.map((blog, index) => (
                        <div key={blog.id} className={`p-2 ${index === selectedIndex ? "bg-blue-500/40" : ""}`} onClick={() => handleClose()}>
                            <Link href={`/blog/${blog?.slug}`} passHref>
                                <p id={`blog-link-${index}`} tabIndex={-1} style={{ display: "none" }}>
                                    Navigate
                                </p>
                            </Link>
                            <Link href={`/blog/${blog?.slug}`}>
                                <div className="flex gap-2 px-4 py-2 border-b hover:bg-slate-100 dark:hover:bg-slate-800">
                                    <picture>
                                        <img
                                            src={blog.imageUrl ?? ""}
                                            alt={blog?.slug}
                                            className="max-w-full w-16 object-cover aspect-square rounded"
                                            width={12}
                                            height={12}
                                        />
                                    </picture>
                                    <div className="w-[85%]">
                                        <div className="text-lg truncate">{blog.title}</div>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{blog?.shortSummary}</p>
                                        <p className="text-[11px] text-muted-foreground">{formatDate(blog?.createdAt)}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )) :
                        <div className="flex h-full items-center justify-center text-3xl text-[blue]">
                            No Blog Found
                        </div>
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}