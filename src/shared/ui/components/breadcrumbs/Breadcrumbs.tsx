'use client';

import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';

import st from './Breadcrumbs.module.scss';

import { Link, usePathname } from '@/i18n/navigation';

const segmentLabels: Record<string, string> = {
  calendar: 'Calendar',
};

type BreadcrumbsProps = {
  pathname?: string;
  currentLabel?: string;
};

export const Breadcrumbs = ({ pathname: pathnameProp, currentLabel }: BreadcrumbsProps) => {
  const clientPathname = usePathname();
  const pathname = pathnameProp ?? clientPathname ?? '';

  if (!pathname || pathname === '/') return null;
  if (pathname !== '/calendar' && !pathname.startsWith('/calendar/')) return null;
  if (pathname.includes('/live-demo')) return null;

  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((seg, i) => ({
    label: i === segments.length - 1 && currentLabel ? currentLabel : (segmentLabels[seg] ?? seg),
    href: '/' + segments.slice(0, i + 1).join('/'),
  }));

  return (
    <div className={cn(st.breadcrumbs_wrapper, st.calendar)}>
      <div className="container">
        <nav className={st.breadcrumbs} aria-label="Breadcrumb">
          <ol className={st.list}>
            <li className={st.item}>
              <Link href="/" className={st.link}>
                Home
              </Link>
            </li>
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <li key={crumb.href} className={st.item}>
                  <span className={st.separator}>
                    <Image src="/icons/header/breadcrumbs-arrow.svg" alt="" width={8} height={16} />
                  </span>
                  {isLast ? (
                    <span className={st.current}>{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className={st.link}>
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
