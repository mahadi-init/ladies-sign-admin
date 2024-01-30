import SharedBrandUI from "../_shared/ui";
import { addBrand } from "./_action";

export default async function AddBrand() {
  return <SharedBrandUI serverAction={addBrand} />;
}
