import React from "react";
import type { LucideIcon } from "lucide-react";
import { Loader } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon: LucideIcon;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  icon: Icon,
  ...props
}) => {
  return (
    <button
      {...props}
      className="w-full flex justify-center py-2 px-4 border border-transparent 
                 rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
                 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
          Loading...
        </>
      ) : (
        <>
          <Icon className="mr-2 h-5 w-5" aria-hidden="true" />
          {children}
        </>
      )}
    </button>
  );
};
