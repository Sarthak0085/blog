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
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <picture>
                    <img
                        src={blog?.imageUrl as string}
                        alt={blog?.slug}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            filter: 'blur(8px)',
                            zIndex: 0,
                        }}
                    />
                </picture>
                <div
                    style={{
                        position: 'relative',
                        color: 'white',
                        fontSize: '48px',
                        textAlign: 'center',
                        padding: '0 20px',
                        zIndex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        borderRadius: '8px',
                    }}
                >
                    {blog?.title}
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}