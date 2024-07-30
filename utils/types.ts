import { Blog, Category, UserRole } from "@prisma/client";

export type ExtendBlog = Blog & {
    category: {
        id: string;
        name: string;
    };
    comments: {
        id: string;
        content: string;
        userId: string;
        blogId: string;
        createdAt: Date;
    }[];
    likes: {
        id: string;
        userId: string;
        blogId: string;
    }[];
    dislikes: {
        id: string;
        userId: string;
        blogId: string;
    }[];
    favourites: {
        id: string;
        userId: string;
        blogId: string;
    }[];
    user: {
        id: string;
        name: string | null;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        password: string | null;
        bio: string | null;
        role: UserRole;
        isTwoFactorEnabled: boolean;
    }
}

export type ExtendCategory = Category & {
    blogs: Blog[]
};