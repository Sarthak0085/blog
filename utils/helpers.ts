import { v2 as cloudinary } from 'cloudinary';
import { randomUUID } from 'crypto';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface Result {
    public_id: string | undefined;
    url: string | undefined;
}

export const uploadFilesToCloudinary = async (file: string, slug: string): Promise<Result> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            {
                resource_type: "auto",
                public_id: `blog/${slug}/${randomUUID()}`,
            },
            (error, result) => {
                if (error) return reject(error);
                const formattedResult = {
                    public_id: result?.public_id,
                    url: result?.secure_url,
                };
                resolve(formattedResult);
            }
        );
    });
};

export const deleteImage = async (publicId: string) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

