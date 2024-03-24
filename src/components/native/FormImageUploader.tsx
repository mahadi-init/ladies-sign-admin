"use client";
import clsx from "clsx";
import { Upload } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { Input } from "../ui/input";

enum UploadStatus {
  IDLE,
  LOADING,
  SUCCESS,
}

export default function FormImageUploader({
  name,
  image,
  isRequired,
}: {
  name?: string;
  image?: string;
  isRequired?: boolean;
}): JSX.Element {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.IDLE
  );
  const [img, setImg] = useState<string | undefined>(image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadStatus(UploadStatus.LOADING);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result as string);
        setUploadStatus(UploadStatus.SUCCESS);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        role="status"
        className="space-y-8 animate-pulse md:flex md:items-center md:space-y-0 md:space-x-8 rtl:space-x-reverse"
      >
        <div
          className={clsx(
            "flex justify-center items-center w-72 h-72 bg-gray-300 rounded sm:w-96 dark:bg-gray-700",
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
        {img ? (
          <CldImage
            src={img}
            className={clsx(
              "w-72 h-72 rounded-md",
              uploadStatus === UploadStatus.LOADING && "w-0 h-0"
            )}
            height={400}
            width={400}
            crop="fill"
            alt="beautiful image"
            placeholder="empty"
            onLoad={() => {
              image && setUploadStatus(UploadStatus.SUCCESS);
            }}
          />
        ) : (
          <div className="grid place-items-center w-80 h-80 bg-gray-600 rounded-lg">
            <p className="text-xl font-medium text-white">
              Image will be shown here
            </p>
          </div>
        )}

        <label
          htmlFor="uploadFile1"
          className="flex flex-col justify-center items-center mx-auto mt-4 w-80 h-24 text-base text-black bg-white rounded border-2 border-gray-300 border-dashed cursor-pointer font-[sans-serif]"
        >
          <Input
            id="uploadFile1"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name={name}
            className="opacity-0"
            required={isRequired}
          />
          <div className="relative bottom-3 flex flex-col items-center">
            <Upload />
            Upload
            <p className="mt-2 text-xs text-gray-400">
              PNG, JPG SVG, WEBP, and GIF are Allowed.
            </p>
          </div>
        </label>
      </>
    </>
  );
}
