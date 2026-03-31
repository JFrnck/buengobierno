import React from "react";

const Button = React.forwardRef(({ className = "", type = "button", ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 ${className}`}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };