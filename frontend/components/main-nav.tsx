import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"
import { NavItem } from "@/types/nav"

interface MainNavProps {
    items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
    return (
        <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
                <span className="text-3xl inline-block font-awesome">{siteConfig.name}</span>
            </Link>
            {items?.length ? (
                <nav className="flex gap-6">
                    {items?.map(
                        (item, index) =>
                            item.href && (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center text-sm font-medium text-muted-foreground",
                                        item.disabled && "cursor-not-allowed opacity-80"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            )
                    )}
                </nav>
            ) : null}
        </div>
    )
}