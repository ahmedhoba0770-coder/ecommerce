import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbItemType = {
  label: string;
  href?: string;
};

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  breadcrumbs: BreadcrumbItemType[];
  bgColor?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  breadcrumbs = [],
  bgColor = "bg-linear-to-br from-mauve-500 to-mauve-700",
}) => {
  return (
    <div className={`${bgColor} container mx-auto px-4 py-10 sm:py-14 text-white`}>
      
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="mb-6 gap-2 text-sm text-white/70">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {isLast || !item.href ? (
                        <BreadcrumbPage className="text-white font-semibold">
                          {item.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          className="text-white/80 hover:text-white"
                          href={item.href}
                        >
                          {item.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>

                    {!isLast && (
                      <BreadcrumbSeparator className="text-white/80">
                        /
                      </BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}

      {/* Content */}
      <div className="flex items-center gap-4">
        {icon && (
          <div className="bg-white/20 p-4 rounded-xl">
            {icon}
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="opacity-90">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;