"use client";
import ImageUploader from "@/components/native/ImageUploader";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { BrandType } from "@/types/brand";
import { Response } from "@/types/response";
import { useState } from "react";
import { toast } from "sonner";

interface PropTypes extends Partial<BrandType> {
  queryUrl: string;
  validationTag: string;
  successMessage: string;
  serverAction: <T>(
    data: T,
    queryUrl: string,
    validationTag: string,
    successMessage: string
  ) => Promise<Response>;
}

export default function SharedBrandUI<T extends PropTypes>(props: T) {
  const [logo, setLogo] = useState(props.logo);

  const handleFormAction = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const website = formData.get("website");
    const location = formData.get("location");

    const data = {
      _id: props._id,
      logo: logo,
      name: name,
      email: email,
      website: website,
      location: location,
    };

    const res = await props.serverAction(
      data,
      props.queryUrl,
      props.validationTag,
      props.successMessage
    );
    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form action={handleFormAction} className="w-full">
      <div className="flex flex-col justify-center items-center my-8 w-full">
        <ImageUploader image={logo} setImage={setLogo} />
      </div>

      <div className="flex flex-col gap-6 p-4">
        <label className="ml-1 font-medium">
          Name
          <Input
            type="text"
            name="name"
            placeholder="sony"
            defaultValue={props.name}
            className="mt-1 bg-gray-100"
            required
          />
        </label>

        <label className="ml-1 font-medium">
          Email
          <Input
            type="email"
            name="email"
            placeholder="sony@gmail.com"
            defaultValue={props.email}
            className="mt-1 bg-gray-100"
            required
          />
        </label>

        <label className="ml-1 font-medium">
          Website
          <Input
            type="url"
            name="website"
            placeholder="https://sony.com"
            defaultValue={props.website}
            className="mt-1 bg-gray-100"
            required
          />
        </label>

        <label className="ml-1 font-medium">
          Location
          <Input
            type="text"
            name="location"
            placeholder="USA"
            defaultValue={props.location}
            className="mt-1 bg-gray-100"
            required
          />
        </label>

        <SubmitButton style="w-fit" />
      </div>
    </form>
  );
}
