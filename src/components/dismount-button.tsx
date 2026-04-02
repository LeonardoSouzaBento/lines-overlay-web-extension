import { X } from "lucide-react";
import { Button, Icon } from "../ui";

export function DismountButton({
  onDismount,
}: {
  onDismount: (e: React.MouseEvent) => void;
}) {
  return (
    <Button
      asChild
      size="icon-sm"
      variant="transparent"
      onClick={onDismount}
      style={{ color: "red" }}
    >
      <div>
        <Icon Icon={X} size="xl" color="red" />
      </div>
    </Button>
  );
}
