import clsx from "clsx";
import { Upload } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { toast } from "sonner";
import { site } from "../../site-config";

export default function ImageUploader({
  image = "/logo.png",
  setImage,
  folder,
  style,
}: {
  image?: string;
  setImage: (arg0?: string) => void;
  folder?: string;
  style?: string;
}): JSX.Element {
  return (
    <div className={clsx(style, "flex flex-col items-center")}>
      <Image
        src={image}
        className={clsx("w-72 rounded-md")}
        height={400}
        width={400}
        alt="beautiful image"
        priority
      />

      <CldUploadButton
        uploadPreset={site.CLOUDINARY_UPLOAD_PRESET}
        options={{
          multiple: false,
          maxFiles: 1,
          sources: ["local", "url", "google_drive", "dropbox", "unsplash"],
          cropping: true,
          croppingShowDimensions: true,
          minImageHeight: 300,
          minImageWidth: 250,
          folder: folder,
        }}
        onSuccess={(result) => {
          //@ts-expect-error;
          setImage(result.info.url);
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
    </div>
  );
}
