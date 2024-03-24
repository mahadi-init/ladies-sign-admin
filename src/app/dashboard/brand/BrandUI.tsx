"use client";
import { cloudinaryUpload } from "@/actions/cloudinary-upload";
import ButtonGroup from "@/components/native/ButtonGroup";
import FormImageUploader from "@/components/native/FormImageUploader";
import { Input } from "@/components/ui/input";
import { BrandType } from "@/types/brand.t";
import { LocalResponse } from "@/types/response.t";
import showToast from "@/utils/ShowToast";
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
  ) => Promise<LocalResponse>;
}

export default function BrandUI(props: PropTypes) {
  const handleFormAction = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const website = formData.get("website");
    const location = formData.get("location");
    const inactive = formData.get("inactive");
    const logo = formData.get("logo") as File;

    if (logo.size <= 0 && !props.logo && !inactive) {
      toast.error("select inactive or add an image");
      return;
    }

    const cloud = await cloudinaryUpload(formData, "logo", "brand");

    const data = {
      _id: props._id,
      logo: cloud?.url ?? props.logo ?? undefined,
      name: name,
      email: email,
      website: website,
      location: location,
      status: inactive === "on" ? "INACTIVE" : "ACTIVE",
    };

    const res = await props.serverAction(
      data,
      props.queryUrl,
      props.validationTag,
      props.successMessage
    );

    showToast(res);
  };

  return (
    <form action={handleFormAction} className="w-full xl:w-7/12">
      <div className="flex flex-col justify-center items-center my-8 w-full">
        <FormImageUploader name="logo" image={props.logo} />
      </div>

      <div className="flex flex-col gap-6 p-4">
        <label className="ml-1 font-medium">
          Name <span className="text-red-600">*</span>
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
          />
        </label>

        <label className="ml-1 font-medium flex items-center gap-2">
          <Input
            type="checkbox"
            name="inactive"
            className="bg-gray-100 w-fit"
            defaultChecked={props.status === "INACTIVE"}
          />
          Inactive
          <span className="text-xs text-red-600">(default active)</span>
        </label>

        <ButtonGroup />
      </div>
    </form>
  );
}
