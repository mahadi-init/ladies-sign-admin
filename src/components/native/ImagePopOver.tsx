import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

export function ImagepopOver({ img }: { img: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <CldImage
          className="w-10 rounded-full"
          width={250}
          height={250}
          crop="fill"
          src={img}
          alt="cell image"
          loading="lazy"
        />
      </PopoverTrigger>
      <PopoverContent className="w-[350px] rounded-lg">
        <Image src={img} width={1920} height={1080} alt="product" />
      </PopoverContent>
    </Popover>
  );
}
