"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const sidebarMenuButtonVariants = cva(
  "flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-gray-800 cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export function Sidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <aside
      className={cn("flex h-screen w-64 flex-col bg-gray-900 text-white", className)}
      {...props}
    />
  )
}

export function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-y-auto px-2 py-4", className)} {...props} />
}

export function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b border-gray-700 p-2", className)} {...props} />
}

export function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t border-gray-700 p-2", className)} {...props} />
}

export function SidebarGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />
}

export function SidebarGroupLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-3 text-xs font-semibold uppercase text-gray-400", className)}
      {...props}
    />
  )
}

export function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("space-y-1", className)} {...props} />
}

export function SidebarMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />
}

export interface SidebarMenuButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
}

export function SidebarMenuButton({
  className,
  size,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp className={cn(sidebarMenuButtonVariants({ size, className }))} {...props} />
  )
}

export function SidebarMenuButtons({
  className,
  size,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp className={cn(sidebarMenuButtonVariants({ size, className }))} {...props} />
  )
}

export function SidebarMenuSub({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("ml-4 space-y-1 border-l border-gray-700 pl-2", className)} {...props} />
}

export function SidebarMenuSubItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />
}

export function SidebarMenuSubButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }) {
  const { isActive, ...rest } = props
  return (
    <a
      className={cn(
        "block rounded px-3 py-1.5 text-sm hover:bg-gray-800",
        isActive ? "bg-gray-800 text-white font-medium" : "text-gray-300",
        className
      )}
      {...rest}
    />
  )
}

export function SidebarRail() {
  return <div className="hidden w-16 bg-gray-800 lg:block" />
}
