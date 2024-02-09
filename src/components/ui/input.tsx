import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    contClassName?: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, contClassName, ...props }, ref) => {
    return (
      <div className={contClassName}>
        {label && 
        <p className="text-xs text-muted-foreground ml-2 mb-1">
          {label}<span className="text-rose-500"> *</span>
        </p>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-xl bg-bgel px-6 py-6 text-xl font-light file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
