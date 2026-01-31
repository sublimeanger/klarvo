import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBreadcrumbTrail } from "@/lib/internalLinks";
import { cn } from "@/lib/utils";
import React from "react";

interface ContentBreadcrumbProps {
  currentHref: string;
  className?: string;
  customTrail?: Array<{ name: string; href: string }>;
}

export function ContentBreadcrumb({ currentHref, className, customTrail }: ContentBreadcrumbProps) {
  const trail = customTrail || getBreadcrumbTrail(currentHref);

  if (trail.length <= 1) return null;

  return (
    <Breadcrumb className={cn("mb-4", className)}>
      <BreadcrumbList>
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.href}>{item.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
