import { ExtendBlog } from '@/utils/types';
import { ImageResponse } from 'next/og'

export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/${params.slug}`);
    const blog: ExtendBlog = await response.json();

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 48,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <picture>
                    <img
                        src={blog?.imageUrl as string}
                        alt={blog?.slug}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                    />
                </picture>
                {blog?.title}
            </div>
        ),
        {
            ...size,
        }
    )
}