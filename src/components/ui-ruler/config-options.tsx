import { RotateCw } from "lucide-react";
import { Button, Icon } from "@/components/ui";
import { type ConfigOptionsProps, NUMBER_FIELDS, colorOptions } from "@/data/data";

export function ConfigOptions(props: ConfigOptionsProps) {
  const fieldBindings = {
    lines: { value: props.lines, set: props.setLines },
    gap: { value: props.gap, set: props.setGap },
    opacity: { value: props.opacity, set: props.setOpacity },
  };

  return (
    <div className="fixed bottom-13 right-2 z-1000 pointer-events-auto bg-white/94 backdrop-blur-sm shadow-md border border-slate-400/30 rounded-md px-3 py-2.5 w-auto flex flex-col items-end gap-1">
      {NUMBER_FIELDS.map((field) => {
        const binding = fieldBindings[field.key];

        return (
          <div className="w-full mb-3 flex flex-col gap-2" key={field.key}>
            <div className="flex items-end gap-2 rounded-sm">
              <div className="w-26">
                <label className="block font-medium mb-1.25 text-sm">{field.label}</label>
                <input
                  className="w-full h-8 rounded-sm border border-gray-200 px-2 box-border text-sm text-black bg-white/50"
                  type="number"
                  step={field.step}
                  value={binding.value}
                  onChange={(e) => binding.set(+e.target.value)}
                />
              </div>
              <div className="flex gap-1.5 mt-1">
                {field.quick.map((v) => {
                  return (
                    <Button
                      selected={binding.value === v}
                      key={v}
                      data-option
                      variant="ghost"
                      size="icon-sm"
                      className="font-medium rounded-full bg-white/50"
                      onClick={() => binding.set(v)}
                    >
                      {v}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      <div className="mb-3">
        <span className="block font-medium mb-1 text-sm">Cor</span>
        <div className="flex gap-2">
          {colorOptions.map((c) => (
            <Button
              className="rounded-full"
              key={c.value}
              variant="ghost"
              size="icon-sm"
              title={c.name}
              onClick={() => props.setColor(c.value)}
            >
              <span className="block w-[80%] h-[80%] rounded-full" style={{ backgroundColor: c.value }} />
            </Button>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-full"
        onClick={() => {
          if (props.rotate === 0) {
            props.setRotate(90);
          } else {
            props.setRotate(0);
          }
        }}
      >
        <Icon Icon={RotateCw} size="xl" strokeWidth="light" /> Rotacionar
      </Button>
    </div>
  );
}
