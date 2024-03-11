import ImageUploader from "@/components/native/ImageUploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductCategory } from "./product-category";

export default function GeneralInformation({
  image,
  parent,
  selectedChildrens,
  setImage,
  setParent,
  setSelectedChildrens,
}: {
  image?: string;
  parent?: string;
  selectedChildrens: string[];
  setImage: (arg0?: string) => void;
  setParent: (arg0?: string) => void;
  setSelectedChildrens: (arg0: string[]) => void;
}) {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">General</h2>
        <div className="flex flex-col  xl:flex-row justify-evenly pb-2 xl:items-center">
          <div className=" flex flex-col items-center">
            <ImageUploader image={image} setImage={setImage} />
          </div>
          <div className="flex flex-col gap-4 xl:w-1/2">
            <ProductCategory
              parent={parent}
              setParent={setParent}
              selectedChildrens={selectedChildrens}
              setSelectedChildrens={setSelectedChildrens}
            />
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Tags
              <Input
                id="tags"
                placeholder="Enter tags"
                name="tags"
                className="mt-1.5"
                type="text"
              />
              <p className="text-xs text-gray-500 mt-1">
                set tags for the product (comma separated)
              </p>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="title"
              placeholder="Product Title"
              name="title"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              placeholder="Your Description"
              name="description"
              required
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="price">
              Price <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              id="price"
              placeholder="Product price"
              name="price"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Set the base price of product.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="sku">
              SKU
            </label>
            <Input type="text" id="sku" placeholder="SKU" name="sku" />
            <p className="text-xs text-gray-500 mt-1">Enter the product SKU.</p>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="quantity"
            >
              Quantity <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              id="quantity"
              placeholder="Quantity"
              name="quantity"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the product quantity.
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="discount"
            >
              Discount Percentage <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              id="discount"
              placeholder="Discount"
              name="discount"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Set the customer Discount.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="seller-discount"
          >
            Seller Percentage <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            id="seller-discount"
            placeholder="Seller Discount"
            name="seller-discount"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Set the seller Discount.</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="video-id">
            Youtube Video Id
          </label>
          <Input type="url" id="video-id" placeholder="video id" name="video" />
          <p className="text-xs text-gray-500 mt-1">
            Set the video id of product.
          </p>
        </div>
        {/* <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="start-end-date"
            >
              Start And End Date
            </label>
            <Input
              type="date"
              id="start-end-date"
              placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
            />
            <p className="text-xs text-gray-500 mt-1">
              set the product offer and end date
            </p>
          </div> */}
      </div>
    </div>
  );
}
