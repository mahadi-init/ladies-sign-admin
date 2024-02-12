"use client";
import SubmitButton from "@/components/native/SubmitButton";
import { Response } from "@/types/response";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { UserType } from "@/types/user";
import ResetButton from "@/components/native/ResetButton";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface PropTypes extends UserType {
  queryUrl: string;
  validationTag: string;
  successMessage: string;
  serverAction: <T>(
    data: T,
    queryUrl: string,
    validationTag: string,
    successMessage: string,
  ) => Promise<Response>;
}

// FIXME: User can't create because of email confirmation
export default function SharedUserUI<T extends PropTypes>(props: T) {
  const handleFormAction = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const primaryPhone = formData.get("primaryPhone");
    const secondaryPhone = formData.get("secondaryPhone");
    const address = formData.get("address");
    const shippingAddress = formData.get("shipping-address");
    const bio = formData.get("bio");

    const data = {
      _id: props._id,
      name: name,
      email: email,
      password: password,
      primaryPhone: primaryPhone,
      secondaryPhone: secondaryPhone,
      address: address,
      shippingAddress: shippingAddress,
      bio: bio,
    };

    const res = await props.serverAction(
      data,
      props.queryUrl,
      props.validationTag,
      props.successMessage,
    );
    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form action={handleFormAction} className="w-full">
      <div className="flex flex-col justify-center items-center my-4 w-full">
        <Image src="/blocked-sign.png" height={300} width={300} alt="blocked" />
        <p className="text-sm text-red-700">Image Upload not available</p>
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
          Email <span className="text-red-600">*</span>
          <Input
            type="email"
            name="email"
            placeholder="xyz@gmail.com"
            defaultValue={props.email}
            className="mt-1 bg-gray-100"
            required
          />
        </label>

        {/* <label className="ml-1 font-medium"> */}
        {/*   Password <span className="text-red-600">*</span> */}
        {/*   <Input */}
        {/*     type="password" */}
        {/*     name="password" */}
        {/*     placeholder="123456" */}
        {/*     defaultValue={props.email} */}
        {/*     className="mt-1 bg-gray-100" */}
        {/*     required */}
        {/*   /> */}
        {/* </label> */}

        <label className="ml-1 font-medium">
          Primary Phone
          <Input
            type="tel"
            name="primary-phone"
            placeholder="01312345323"
            defaultValue={props.phone}
            className="mt-1 bg-gray-100"
          />
        </label>

        <label className="ml-1 font-medium">
          Secondary Phone
          <Input
            type="tel"
            name="secondary-phone"
            placeholder="013123345332"
            defaultValue={props.secondaryPhone}
            className="mt-1 bg-gray-100"
          />
        </label>

        <label className="ml-1 font-medium">
          Address
          <Input
            type="text"
            name="address"
            placeholder="Dhanmondi 32, Dhaka, 1213"
            defaultValue={props.address}
            className="mt-1 bg-gray-100"
          />
        </label>

        <label className="ml-1 font-medium">
          Shipping Address
          <Input
            type="text"
            name="shipping-address"
            placeholder="Sobhanbag boro mosjid, Dhanmondi 32"
            defaultValue={props.shippingAddress}
            className="mt-1 bg-gray-100"
          />
        </label>

        <label className="ml-1 font-medium">
          Bio
          <Textarea
            name="bio"
            rows={2}
            placeholder="I'm a software enginner"
            defaultValue={props.bio}
            className="mt-1 bg-gray-100"
          />
        </label>

        <div className="flex gap-8 mt-4">
          <ResetButton />
          <SubmitButton style="w-fit" />
        </div>
      </div>
    </form>
  );
}
