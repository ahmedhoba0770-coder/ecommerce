"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { buildBreadcrumbs } from "./BreadcrumbBuilder";

export function useBreadcrumbs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const items = await buildBreadcrumbs(
        pathname,
        new URLSearchParams(searchParams.toString())
      );
      setBreadcrumbs(items);
    }

    load();
  }, [pathname, searchParams]);

  return breadcrumbs;
}