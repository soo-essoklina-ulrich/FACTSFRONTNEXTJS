import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { ChevronRight, Key } from 'lucide-react';
import { ReactNode } from 'react';

type PagePathType = {
  title: string;
  link?: string;
};
const PagePath = ({ path, separator }: { path: PagePathType[]; separator?: ReactNode }) => {
  const useSeparator = () => {
    return separator ? (
      <BreadcrumbSeparator> {separator} </BreadcrumbSeparator>
    ) : (
      <BreadcrumbSeparator>
        <ChevronRight />
      </BreadcrumbSeparator>
    );
  };
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {useSeparator()}
        {path.map((item, index) => (
          <div key={index}>
            <BreadcrumbItem>
              {item.link ? (
                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {!(path.length === index + 1) && useSeparator()}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PagePath;
