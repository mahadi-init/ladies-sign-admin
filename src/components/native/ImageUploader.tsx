import clsx from "clsx";
import { PenBoxIcon } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { toast } from "sonner";
import { CLOUDINARY_UPLOAD_PRESET } from "../../site-info";

export default function ImageUploader({
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
    <div className={style}>
      <Image
        src={image ?? "/logo.png"}
        className={clsx("w-72 rounded-md")}
        height={400}
        width={400}
        alt="beautiful image"
      />

      <CldUploadButton
        uploadPreset={CLOUDINARY_UPLOAD_PRESET}
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
        <PenBoxIcon
          size={64}
          className="relative bottom-[70px] left-1 opacity-0 hover:opacity-80"
        />
      </CldUploadButton>
    </div>
  );
}
