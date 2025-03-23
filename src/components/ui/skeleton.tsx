
import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse-bg rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
