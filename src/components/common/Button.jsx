import { forwardRef } from "react";

const variants = {
  primary: "bg-forest text-cream hover:bg-forest-600 shadow-md",
  gold: "bg-gold text-cream hover:bg-gold-dark shadow-md",
  ghost: "bg-transparent text-forest border border-forest/20 hover:border-forest/50 hover:bg-forest/5",
  outlineLight: "bg-transparent text-cream border border-cream/40 hover:bg-cream/10",
};

const Button = forwardRef(
  ({ as: Component = "button", variant = "primary", className = "", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
export default Button;