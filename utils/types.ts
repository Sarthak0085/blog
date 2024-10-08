import { ExtendUser } from "@/nextauth";
import { Blog, Category, Comment, CommentLike, Dislike, Favourite, Like, SavedPost, User, UserRole } from "@prisma/client";

export type ExtendBlog = Blog & {
    category: {
        id: string;
        name: string;
    };
    comments: Omit<ExtendComment, "blog">[];
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
    savedPosts: {
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

export type ExtendUserWithoutOAuth = Omit<ExtendUser, 'OAuth'> & {
    'blogs': ExtendBlog[],
};

export type ExtendCategory = Category & {
    blogs: Blog[]
};

export type ExtendLike = Like & {
    user: User,
    blog: Blog,
};

export type ExtendDislike = Dislike & {
    user: User,
    blog: Blog,
};

export type ExtendFavourites = Favourite & {
    user: User,
    blog: Blog,
};

export type ExtendSavedPost = SavedPost & {
    user: User,
    blog: Blog,
};

export type ExtendComment = Comment & {
    user: User,
    blog: Blog,
    likes: CommentLike[]
};

