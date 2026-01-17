"use client";

import NextLink from "next/link";
import type { ReactNode } from "react";

type SimpleLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function SimpleLink({ href, className, children }: SimpleLinkProps) {
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}
