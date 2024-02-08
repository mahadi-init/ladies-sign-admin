"use client";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PageTop from "@/components/native/PageTop";
import ImageUploader from "@/components/native/ImageUploader";
import { useState } from "react";

export default function Component() {
  const [image, setImage] = useState<string>();

  return (
    <div className="px-4 mt-12 lg:mt-4 lg:ml-72">
      <PageTop title="Profile" />
      <div className="flex flex-col gap-8 mt-8 xl:flex-row">
        <div className="flex flex-col items-center">
          <ImageUploader image={image} setImage={setImage} />
        </div>
        <div className="grid grid-cols-1 gap-8 w-full">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-4">
                  <Label htmlFor="name">
                    Name
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="mt-2 bg-gray-100"
                    />
                  </Label>

                  <Label htmlFor="email">
                    Email
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      className="mt-2 bg-gray-100"
                    />
                  </Label>

                  <Label htmlFor="phone">
                    Phone
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="mt-2 bg-gray-100"
                    />
                  </Label>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save</Button>
            </CardFooter>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-4">
                  <div className="flex flex-col">
                    <Label htmlFor="current-password">
                      Current Password
                      <Input
                        id="current-password"
                        type="password"
                        name="current-password"
                        placeholder="Current Password"
                        className="mt-2 bg-gray-100"
                        required
                      />
                    </Label>
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="new-password">
                      New Password
                      <Input
                        id="new-password"
                        type="password"
                        name="new-password"
                        placeholder="New Password"
                        className="mt-2 bg-gray-100"
                        required
                      />
                    </Label>
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      name="confirm-password"
                      placeholder="Confirm Password"
                      className="mt-2 bg-gray-100"
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
