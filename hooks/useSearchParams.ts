import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useCustomSearchParams = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [params, setParams] = useState<{ [key: string]: string }>({
        category: searchParams.get("category") || "",
        tags: searchParams.get("tags") || "",
        date: searchParams.get("date") || "",
        time: searchParams.get("time") || "",
        author: searchParams.get("author") || "",
        orderby: searchParams.get("orderby") || "",
    });

    useEffect(() => {
        const updatedParams = {
            category: searchParams.get("category") || "",
            tags: searchParams.get("tags") || "",
            date: searchParams.get("date") || "",
            time: searchParams.get("time") || "",
            author: searchParams.get("author") || "",
            orderby: searchParams.get("orderby") || "",
        };
        setParams(updatedParams);
    }, [searchParams]);

    const updateParam = (key: string, value?: any) => {
        const updatedParams = new URLSearchParams(searchParams.toString());

        if (key === 'tags') {
            const currentTags = params.tags ? params.tags.split(',') : [];
            console.log(currentTags, params[key], value);

            if (value === params[key]) {
                updatedParams.delete(key);
            }
            if (typeof value === 'string') {
                // Single tag to add or remove
                const tagSet = new Set(currentTags);

                if (tagSet.has(value)) {
                    tagSet.delete(value); // Remove tag
                } else {
                    tagSet.add(value); // Add tag
                }

                updatedParams.set(key, Array.from(tagSet).join(','));
            } else if (value === null) {
                updatedParams.delete(key);
            }
        } else if (Array.isArray(value)) {
            updatedParams.set(key, value.join(','));
        } else if (value === null || value === undefined || value === '' || value === params[key]) {
            updatedParams.delete(key);
        } else {
            updatedParams.set(key, value);
        }

        router.push(`/blogs?${updatedParams.toString()}`);
    };

    return {
        params,
        updateParam
    }
}   