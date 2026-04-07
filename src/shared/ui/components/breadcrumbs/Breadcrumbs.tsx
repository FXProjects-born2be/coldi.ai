'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import st from './Breadcrumbs.module.scss';
import { useBreadcrumbsContext } from './BreadcrumbsContext';

const segmentLabels: Record<string, string> = {
  products: 'Products',
  'outbound-calling': 'Outbound Calling',
  'inbound-calling': 'Inbound Calling',
  industries: 'Industries',
  healthcare: 'Healthcare',
  insurance: 'Insurance Agents',
  'real-estate': 'Real Estate',
  'call-center': 'Call Center',
  'fx-brokers': 'FX Brokers',
  'debt-collection': 'Debt Collection',
  pricing: 'Pricing',
  about: 'About',
  news: 'News',
  voices: 'Voices',
  demo: 'Demo',
  calendar: 'Calendar',
  'coldi-in-action': 'Coldi in Action',
  'turn-leads-into-meetings': 'Turn Leads into Meetings',
  'agent-development': 'AI Agent Development',
  meettheteam: 'Meet the Team',
  'customer-service-agent': 'AI Customer Service',
};

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const { labelOverrides } = useBreadcrumbsContext();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((seg, i) => ({
    label: labelOverrides[seg] ?? segmentLabels[seg] ?? seg,
    href: '/' + segments.slice(0, i + 1).join('/'),
  }));

  return (
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
  );
};
