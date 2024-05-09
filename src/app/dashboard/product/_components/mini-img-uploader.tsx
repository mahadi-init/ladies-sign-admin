import { site } from "@/site-config";
import clsx from "clsx";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { toast } from "sonner";

export default function MiniImageUploader({
  image,
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
        src={image ?? "/logo.png"}
        className={clsx("w-72 rounded-md")}
        height={400}
        width={400}
        alt="beautiful image"
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
      />
    </div>
  );
}
