"use client";
import { cloudinaryUpload } from "@/actions/cloudinary-upload";
import ButtonGroup from "@/components/native/ButtonGroup";
import FormImageUploader from "@/components/native/FormImageUploader";
import { Input } from "@/components/ui/input";
import { AdminType } from "@/types/admin.t";
import { LocalResponse } from "@/types/response.t";
import showToast from "@/utils/ShowToast";
import { toast } from "sonner";

interface PropTypes extends Partial<AdminType> {
  adminRoles: string[];
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

export default function AdminUI(props: PropTypes) {
  const handleFormAction = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password") as string;
    const phone = formData.get("phone");
    const inactive = formData.get("inactive");
    const role = formData.get("role");
    const img = formData.get("img") as File;

    if (password.length < 6) {
      toast.error("password length is too short");
      return;
    }

    if (img.size <= 0 && !props.image && !inactive) {
      toast.error("select inactive or add an image");
      return;
    }

    const cloud = await cloudinaryUpload(formData, "img", "admin");

    const data = {
      _id: props._id,
      name: name,
      email: email,
      image: cloud?.url ?? props.image ?? undefined,
      password: password,
      phone: phone,
      role: role,
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
        <FormImageUploader name="img" image={props.image} />
      </div>

      <div className="flex flex-col gap-6 p-4">
        <label className="ml-1 font-medium">
          Name <span className="text-red-600">*</span>
          <Input
            type="text"
            name="name"
            placeholder="Jhon Doe"
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
            placeholder="Enter email"
            defaultValue={props.email}
            className="mt-1 bg-gray-100"
          />
        </label>

        <label className="ml-1 font-medium">
          Password <span className="text-red-600">*</span>
          <Input
            type="text"
            name="password"
            defaultValue={props.password}
            placeholder="Enter password"
            className="mt-1 bg-gray-100"
            required
          />
          <span className="text-xs mt-0.5">at least 6 characters</span>
        </label>

        <label className="ml-1 font-medium">
          Phone
          <Input
            type="tel"
            name="phone"
            defaultValue={props.phone}
            className="mt-1 bg-gray-100"
            placeholder="Enter phone number"
            required
          />
        </label>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="role"
          >
            Role <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            id="role"
            defaultValue={props.role ?? props.adminRoles[0]}
            className="mt-0.5 w-full p-2 bg-gray-100 rounded-md"
          >
            {props.adminRoles?.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <p className="mt-2 text-sm text-gray-500">Set the admin role</p>
        </div>

        <label className="ml-1 font-medium flex items-center gap-2">
          <Input
            type="checkbox"
            name="inactive"
            className="bg-gray-100 w-fit"
            defaultChecked={props.status === "INACTIVE"}
          />
          Inactive
          <span className="text-xs text-red-600">(default Active)</span>
        </label>

        <ButtonGroup />
      </div>
    </form>
  );
}
