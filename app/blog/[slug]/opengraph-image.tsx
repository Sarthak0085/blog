import { domain } from '@/lib/domain';
import { ExtendBlog } from '@/utils/types';
import { ImageResponse } from 'next/og'

export const size = {
    width: 1200,
    height: 630,
}

const MIME_TYPES: Record<string, string> = {
    png: 'image/png',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    avif: 'image/avif',
    bmp: 'image/bmp',
};

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
    const response = await fetch(`${domain}/api/blog/${params.slug}`);
    const blog: ExtendBlog = await response.json();

    const imageUrl = blog?.imageUrl as string;
    const extension = imageUrl.split('.').pop()?.toLowerCase() || 'png';
    const contentType = MIME_TYPES[extension] || 'image/png';
    const imageBuffer = await fetch(imageUrl).then((res) => res.arrayBuffer());

    const imageWidth = 1200;
    const imageHeight = 630;

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
                        src={imageBuffer as unknown as string}
                        alt={blog?.slug}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            filter: 'blur(8px)',
                        }}
                        width={imageWidth}
                        height={imageHeight}
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