import { Input } from "@/components/ui/input";
import { Card } from "flowbite-react";
import { ColorTable } from "./color-table";
import { SizeTable } from "./table";

export default function ExtraForm({
  colors,
  sizes,
  setRerender,
}: {
  colors: { name: string; code: string }[];
  sizes: string[];
  setRerender: (arg0: number) => void;
}) {
  const colorAction = (formData: FormData) => {
    const name = formData.get("name");
    const code = formData.get("code");
    const newColor = { name, code };

    let colors = localStorage.getItem("colors");
    let colorsArray = [];

    if (colors) {
      colorsArray = JSON.parse(colors);
    }

    colorsArray.push(newColor);
    localStorage.setItem("colors", JSON.stringify(colorsArray));
    setRerender(Math.random());
  };

  const sizeAction = (formData: FormData) => {
    const size = formData.get("size");

    let sizes = localStorage.getItem("sizes");
    let sizesArray = [];

    if (sizes) {
      sizesArray = JSON.parse(sizes);
    }

    sizesArray.push(size);
    localStorage.setItem("sizes", JSON.stringify(sizesArray));
    setRerender(Math.random());
  };

  return (
    <div className="mt-8 flex flex-col gap-2 xl:flex-row">
      <form action={colorAction} className="w-full">
        <Card className="w-full p-2">
          <p className="text-center text-lg font-medium">Colors</p>
          <ColorTable
            heads={["NAME", "CODE", "COLOR"]}
            data={colors}
            setRerender={setRerender}
          />
          <div className="mt-2.5 flex items-center gap-2">
            <div className="w-full">
              <Input
                className="bg-gray-100"
                name="name"
                placeholder="Add color name"
              />
            </div>
            <div className="mt-1 w-full">
              <input
                className="h-12 w-full bg-gray-100"
                type="color"
                name="code"
                placeholder="Enter color code"
              />
            </div>
          </div>
        </Card>
      </form>

      <form action={sizeAction} className="w-full">
        <Card className="w-full p-2">
          <p className="text-center text-lg font-medium">Sizes</p>
          <SizeTable data={sizes} heads={["SIZE"]} setRerender={setRerender} />
          <Input
            className="mt-2.5 bg-gray-100"
            name="size"
            placeholder="Add new Product Type"
          />
        </Card>
      </form>
    </div>
  );
}
