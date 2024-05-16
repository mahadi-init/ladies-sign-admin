import { useUploadThing } from "@/utils/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { useCallback, useEffect, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { FolderPlus } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export function ImageUploader({
  endpoint,
  imgUrl,
  setImgUrl,
  setIsLoading,
}: {
  endpoint:
    | "category"
    | "brand"
    | "product"
    | "coupon"
    | "user"
    | "admin"
    | "seller";
  imgUrl?: string;
  setImgUrl: (arg0?: string) => void;
  setIsLoading: (arg0: boolean) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      setImgUrl(res[0].url);
      setIsLoading(false);
      toast.dismiss();
      toast.success("Image uploaded successfully");
    },
    onUploadError: () => {
      setIsLoading(false);
      toast.dismiss();
      toast.error("Image upload failed");
    },
    onUploadBegin: () => {
      toast.dismiss();
      toast.loading("Image uploading...");
    },
  });

  useEffect(() => {
    if (files.length > 0) {
      setIsLoading(true);
      startUpload(files);
    }
  }, [files, startUpload]);

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="w-fit mx-auto flex flex-col items-center"
    >
      <Image
        src={
          (files[0] && URL.createObjectURL(files[0])) ?? imgUrl ?? "/logo.png"
        }
        alt="preview"
        width={300}
        height={300}
        className="rounded-md"
        priority
      />
      <label
        htmlFor="uploadFile1"
        className="flex flex-col justify-center items-center mx-auto mt-4 w-80 h-24 text-base text-black bg-white rounded border-2 border-gray-300 border-dashed cursor-pointer font-[sans-serif]"
      >
        <div className="flex flex-col items-center justify-center">
          <FolderPlus />
          Select
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Drag and drop or select file
        </p>
      </label>
      <input id="uploadfile1" {...getInputProps()} />
    </div>
  );
}
