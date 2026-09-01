import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';

import st from './IndustriesOther.module.scss';

const INDUSTRIES = [
  { id: 'healthcare', icon: '/icons/heart.svg' },
  { id: 'realEstate', icon: '/icons/building.svg' },
  { id: 'callCenters', icon: '/icons/headset.svg' },
  { id: 'residential', icon: '/icons/home.svg' },
  { id: 'retail', icon: '/icons/shopping-bag.svg' },
  { id: 'hvac', icon: '/icons/thermometer.svg' },
  { id: 'agroIndustry', icon: '/icons/leaf.svg' },
  { id: 'technology', icon: '/icons/laptop.svg' },
  { id: 'manufacturing', icon: '/icons/factory.svg' },
  { id: 'consulting', icon: '/icons/briefcase.svg' },
  { id: 'nonprofit', icon: '/icons/heart-two.svg' },
  { id: 'ecommerce', icon: '/icons/shopping-cart.svg' },
  { id: 'entertainment', icon: '/icons/play.svg' },
  { id: 'education', icon: '/icons/graduation-cap.svg' },
  { id: 'telecommunications', icon: '/icons/signal.svg' },
  { id: 'hospitality', icon: '/icons/bed.svg' },
] as const;

export const IndustriesOther = async () => {
  const t = await getTranslations('IndustriesOther');

  return (
    <section id="other-industries" className={st.other_industries}>
      <div className={cn('container', st.other_industries__container)}>
        <h2 className={st.other_industries__title}>
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
        </h2>
        <div className={st.other_industries__images}>
          <div className={st.other_industries__track}>
            {[...INDUSTRIES, ...INDUSTRIES].map((item, index) => {
              const isDuplicate = index >= INDUSTRIES.length;
              const label = t(`items.${item.id}`);

              return (
                <div
                  key={`${item.id}-${index}`}
                  className={st.other_industries__item}
                  aria-hidden={isDuplicate}
                >
                  <Image src={item.icon} alt={isDuplicate ? '' : label} width={32} height={32} />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
