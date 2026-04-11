import type { StateSetter } from "@/types";
import { Button, Icon, Separator } from "@/components/ui";
import { ChevronDown, ChevronUp, EyeOff } from "lucide-react";
import { DismountButton } from "./dismount-button";

interface Props {
  open: boolean;
  onToggleConfig: () => void;
  setShowLines: StateSetter<boolean>;
}

export function ConfigButton({ onToggleConfig, open, setShowLines }: Props) {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: number,
  ) => {
    if (item === 1) {
      onToggleConfig();
    } else {
      e.stopPropagation();
      setShowLines((v) => !v);
    }
  };

  return (
    <div className="fixed bottom-2 right-2 z-9999 pointer-events-auto h-10 border border-slate-400/50 bg-white text-black shadow-sm flex items-center pl-3.5 pr-1 rounded-sm">
      <span
        className="font-semibold tracking-wide pr-2 text-sm select-none"
        onClick={(e) => {
          e.stopPropagation();
          onToggleConfig();
        }}
      >
        Configurar
      </span>

      <div className="h-full flex items-center pr-0.5 gap-1">
        {[1, 2, 3].map((item) =>
          item !== 2 ? (
            <Button
              className="outline-1 text-black"
              variant={"transparent"}
              size="icon-sm"
              data-black
              key={item}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(e, item);
              }}
            >
              {item === 1 ? (
                <Icon
                  Icon={open ? ChevronDown : ChevronUp}
                  size={"3xl"}
                  strokeWidth="thin"
                  color="#000"
                />
              ) : (
                <Icon
                  Icon={EyeOff}
                  size="xl"
                  strokeWidth="thin"
                  color="#000"
                />
              )}
            </Button>
          ) : (
            <Separator orientation="vertical" className="h-[66%]" key={item} />
          ),
        )}
        <DismountButton />
      </div>
    </div>
  );
}
