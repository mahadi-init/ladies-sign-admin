import ResetButton from "./ResetButton";
import SubmitButton from "./SubmitButton";

export default function ButtonGroup() {
  return (
    <div className="flex gap-8">
      <ResetButton />
      <SubmitButton style="w-fit" />
    </div>
  );
}
