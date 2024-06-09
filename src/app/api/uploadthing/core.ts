import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  product: f({ image: { maxFileSize: "4MB", maxFileCount: 15 } })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url };
    }),

  category: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url };
    }),

  brand: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url };
    }),

  user: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url };
    }),

  coupon: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url };
    }),

  admin: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url };
    }),

  seller: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;