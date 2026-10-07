import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import st from './PricingSetupFree.module.scss';

const items = [
  {
    id: 'ai-voice-agent-for-your-campaign',
    image: '/icons/pricing/setup-one.svg',
  },
  {
    id: 'crm-and-telephony-integration',
    image: '/icons/pricing/setup-two.svg',
  },
  {
    id: 'testing-with-your-real-leads',
    image: '/icons/pricing/setup-three.svg',
  },
] as const;

export async function PricingSetupFree() {
  const t = await getTranslations('PricingSetupFree');

  return (
    <section className={st.pricing_setup_free}>
      <div className="container">
        <h2 className={st.pricing_setup_free__title}>{t('mainTitle')}</h2>

        <div className={st.pricing_setup_free__row}>
          <div className={st.pricing_setup_free__right}>
            <Image
              src="/images/pricing/setup-bg.png"
              alt="Icon"
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
            />

            <p className={st.pricing_setup_free__left_title}>{t('title')}</p>

            <div>
              <p className={st.pricing_setup_free__right_title}>
                <span>{t('priceRange')}</span>
                {t('priceLabel')}
              </p>
              <p className={st.pricing_setup_free__right_description}>{t('priceDescription')}</p>
            </div>
          </div>

          <div className={st.pricing_setup_free__left}>
            <p className={st.pricing_setup_free__list_title}>{t('includesTitle')}</p>

            <ul className={st.pricing_setup_free__list}>
              {items.map((item) => (
                <li key={item.id} className={st.pricing_setup_free__list_item}>
                  <div className={st.pricing_setup_free__list_item_icon}>
                    <Image src={item.image} alt={t('iconAlt')} width={24} height={24} />
                  </div>
                  <p className={st.pricing_setup_free__list_item_description}>
                    {t(`items.${item.id}`)}
                  </p>
                </li>
              ))}
            </ul>

            <div className={st.pricing_setup_free__right_second_description_wrapper}>
              <p className={st.pricing_setup_free__right_second_description}>
                <strong>{t('creditLabel')}</strong>
                {t('creditBefore')} <strong>{t('creditHighlight')}.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
