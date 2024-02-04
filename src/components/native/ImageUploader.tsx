import { CLOUDINARY_UPLOAD_PRESET } from "@/consts/site-info";
import { Upload } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { toast } from "sonner";

export default function ImageUploader({
  image,
  setImage,
}: {
  image?: string;
  setImage: (arg0?: string) => void;
}) {
  return (
    <>
      <picture>
        <Image
          src={image ?? "/logo.png"}
          className="w-64 rounded-md"
          height={400}
          width={400}
          alt="beautiful image"
          placeholder="empty"
        />
      </picture>

      <CldUploadButton
        uploadPreset={CLOUDINARY_UPLOAD_PRESET}
        options={{
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result) => {
          if (result.info) {
            toast.success("Image uploaded");
            //@ts-ignore
            setImage(result.info.url);
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
  );
}
