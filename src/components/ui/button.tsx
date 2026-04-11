import * as React from "react";

type ButtonVariant = "default" | "ghost" | "transparent";
type ButtonSize = "default" | "sm" | "icon" | "icon-sm";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  selected?: boolean;
  disabled?: boolean;
  closeButton?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses =
  "w-auto inline-flex items-center justify-center gap-2 rounded-sm border-none relative outline-none font-semibold text-sm transition-colors";

const variants: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground",
  ghost: "bg-transparent text-slate-900 border border-slate-300",
  transparent: "bg-transparent",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-10 px-3 py-2.5",
  sm: "h-9 px-3 py-2.5",
  icon: "w-9 h-9 p-0",
  "icon-sm": "w-7 h-7 p-0",
};

export function getButtonClasses({
  variant = "default",
  size = "default",
  selected = false,
  disabled = false,
  closeButton = false,
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  selected?: boolean;
  disabled?: boolean;
  closeButton?: boolean;
  className?: string;
}): string {
  return [
    baseClasses,
    variants[variant],
    sizes[size],
    disabled && "opacity-60 cursor-not-allowed",
    selected && "border-2 border-[#60a5faef] text-[#1a6b8f] bg-[#3b82f6]/10",
    closeButton && "text-slate-900",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, style, ...slotProps }, ref) => {
    if (!children || !React.isValidElement(children)) {
      return null;
    }

    const child = children as React.ReactElement<any>;
    const mergedClassName = [className, child.props.className]
      .filter(Boolean)
      .join(" ");
    const mergedStyle = { ...style, ...child.props.style };

    return React.cloneElement(child, {
      ...slotProps,
      ...child.props,
      className: mergedClassName || undefined,
      style: mergedStyle,
      ref,
    });
  }
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      selected = false,
      disabled = false,
      closeButton = false,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const classes = getButtonClasses({
      variant,
      size,
      selected,
      disabled,
      closeButton,
      className,
    });

    return (
      <Comp
        ref={ref}
        className={classes}
        disabled={disabled}
        style={style}
        {...props}
      />
    );
  }
);
