import { X } from "lucide-react";
import { Button, Icon } from "@/components/ui";

export function DismountButton() {
  function handleDismount(e: React.MouseEvent) {
    e.stopPropagation();
    window.dispatchEvent(new Event("lines-overlay-dismount"));
  }

  return (
    <Button
      asChild
      size="icon-sm"
      variant="transparent"
      onClick={handleDismount}
      className="text-white bg-red-600 ml-1.5 rounded-sm"
    >
      <div>
        <Icon Icon={X} size="3xl" color="red" strokeWidth="light" />
      </div>
    </Button>
  );
}
