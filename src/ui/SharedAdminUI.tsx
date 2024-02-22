"use client";
import DropdownSelect from "@/components/native/DropdownSelect";
import ImageUploader from "@/components/native/ImageUploader";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { AdminType } from "@/types/admin";
import { Response } from "@/types/response";
import { useState } from "react";
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
  ) => Promise<Response>;
}

export default function SharedAdminUI<T extends PropTypes>(props: T) {
  const [image, setImage] = useState(props.image);
  const [adminRole, setAdminRole] = useState(props.role ?? props.adminRoles[0]);

  const handleFormAction = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");
    const joiningDate = formData.get("joining");

    if (!image) {
      toast.error("select an image");
      return;
    }

    // FIXME: Joining has issues
    const data = {
      _id: props._id,
      name: name,
      email: email,
      image: image,
      password: password,
      phone: phone,
      joiningDate: joiningDate,
      role: adminRole,
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
        <ImageUploader image={image} setImage={setImage} />
      </div>

      <div className="flex flex-col gap-6 p-4">
        <label className="ml-1 font-medium">
          Name
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
            required
          />
        </label>

        <label className="ml-1 font-medium">
          Password
          <Input
            type="text"
            name="password"
            defaultValue={props.password}
            className="mt-1 bg-gray-100"
            required
          />
        </label>

        <label className="ml-1 font-medium">
          Phone
          <Input
            type="tel"
            name="phone"
            defaultValue={props.phone}
            className="mt-1 bg-gray-100"
            required
          />
        </label>

        <label className="ml-1 font-medium">
          Joining Date
          <Input
            type="date"
            name="joining"
            defaultValue={
              props.joiningDate &&
              new Date(props.joiningDate).toISOString().substring(0, 10)
            }
            className="mt-1 bg-gray-100"
            required
          />
        </label>

        <label className="ml-1 font-medium">
          Admin Role
          <DropdownSelect
            name="productType"
            placeholder="Select Product Type"
            style="w-full mt-1 bg-gray-100"
            items={props.adminRoles}
            selectedItem={adminRole}
            setSelectedItem={setAdminRole}
          />
        </label>

        <SubmitButton style="w-fit" />
      </div>
    </form>
  );
}
