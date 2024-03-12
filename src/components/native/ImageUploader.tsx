import clsx from "clsx";
import { Upload } from "lucide-react";
import { Route } from "next";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { CLOUDINARY_UPLOAD_PRESET } from "../../../site-info";

enum UploadStatus {
  IDLE,
  LOADING,
  SUCCESS,
}

export default function ImageUploader({
  image,
  setImage,
  index,
  action,
}: {
  image?: string;
  setImage: (arg0?: string) => void;
  index?: number;
  action?: (index: number, image?: string) => void;
}): JSX.Element {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.IDLE
  );

  return (
    <>
      <div
        role="status"
        className="space-y-8 animate-pulse md:flex md:items-center md:space-y-0 md:space-x-8 rtl:space-x-reverse"
      >
        <div
          className={clsx(
            "flex justify-center items-center w-64 h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700",
            uploadStatus != UploadStatus.LOADING && "hidden"
          )}
        >
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
      <>
        <picture>
          <Image
            src={image ?? "/logo.png"}
            className={clsx(
              "w-72 rounded-md",
              uploadStatus === UploadStatus.LOADING && "w-0 h-0"
            )}
            height={400}
            width={400}
            alt="beautiful image"
            placeholder="empty"
            onLoad={() => {
              image && setUploadStatus(UploadStatus.SUCCESS);
            }}
          />
        </picture>
        {image && (
          <Link
            href={image as Route}
            className="mt-4  font-medium text-blue-500"
            target="_blank"
          >
            Image URL
          </Link>
        )}

        <CldUploadButton
          uploadPreset={CLOUDINARY_UPLOAD_PRESET}
          options={{
            multiple: false,
            maxFiles: 1,
            sources: ["local", "url", "google_drive", "dropbox", "unsplash"],
            cropping: true,
            croppingShowDimensions: true,
            minImageHeight: 296,
            minImageWidth: 256,
            validateMaxWidthHeight: true,
          }}
          onSuccess={(result) => {
            setUploadStatus(UploadStatus.LOADING);
            //@ts-expect-error;
            setImage(result.info.url);

            if (action && index !== undefined) {
              //@ts-expect-error;
              action(index, result.info.url);
            }
          }}
          onError={() => {
            toast.error("Error uploading");
          }}
        >
          <label
            htmlFor="uploadFile1"
            className="flex flex-col justify-center items-center mx-auto mt-4 w-80 h-24 text-base text-black bg-white rounded border-2 border-gray-300 border-dashed cursor-pointer font-[sans-serif]"
          >
            <Upload />
            Upload
            <p className="mt-2 text-xs text-gray-400">
              PNG, JPG SVG, WEBP, and GIF are Allowed.
            </p>
          </label>
        </CldUploadButton>
      </>
    </>
  );
}
