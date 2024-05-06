"use server";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET_KEY,
  secure: true,
});

export async function cloudinaryUpload(
  formData: FormData,
  imageName: string,
  folder?: string,
): Promise<UploadApiResponse | undefined> {
  const file = formData.get(imageName) as File;

  if (!file.name || file.size <= 0) {
    return;
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const cloud: UploadApiResponse | undefined = await new Promise(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: folder,
          },
          (err, res) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(res);
          },
        )
        .end(buffer);
    },
  );

  return cloud;
}