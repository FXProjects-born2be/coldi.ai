import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';

import st from './IndustryAreas.module.scss';

import { Link } from '@/i18n/navigation';

const AREAS = [
  {
    id: 'otherIndustries',
    icon: '/images/industries/hugeicons_ai-magic.svg',
    href: '#other-industries',
    images: [
      { src: '/images/industries/areas-one.png', width: 404, height: 172 },
      { src: '/images/industries/areas-two.png', width: 373, height: 226 },
      { src: '/images/industries/areas-three.png', width: 179, height: 225 },
    ],
  },
  {
    id: 'fintech',
    icon: '/images/industries/ix_piechart-ai.svg',
    href: '/industries/emis-payments',
    images: [
      { src: '/images/industries/areas-six.svg', width: 403, height: 179 },
      { src: '/images/industries/areas-five.svg', width: 371, height: 230 },
      { src: '/images/industries/areas-seven.png', width: 194, height: 227 },
    ],
  },
] as const;

export const IndustryAreas = async () => {
  const t = await getTranslations('IndustryAreas');

  return (
    <section className={st.industry_areas}>
      <div className="container">
        <h2 className={st.industry_areas__title}>{t('title')}</h2>

        <div className={st.industry_areas__cards}>
          {AREAS.map((area) => (
            <article key={area.id} className={st.industry_areas__card}>
              <div className={st.industry_areas__card_icon}>
                <Image src={area.icon} alt={t('iconAlt')} width={24} height={24} />
              </div>
              <h3 className={st.industry_areas__card_title}>{t(`cards.${area.id}.title`)}</h3>
              <p className={st.industry_areas__card_text}>{t(`cards.${area.id}.text`)}</p>
              <Link
                href={area.href}
                className={cn('btn btn-secondary w-max', st.industry_areas__card_cta)}
              >
                {t(`cards.${area.id}.cta`)}
              </Link>
              {area.images.length > 0 && (
                <div className={st.industry_areas__card_images}>
                  {area.images.map((image) => (
                    <Image
                      key={image.src}
                      className={st.industry_areas__card_image}
                      src={image.src}
                      alt={t('imageAlt')}
                      width={image.width}
                      height={image.height}
                    />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
