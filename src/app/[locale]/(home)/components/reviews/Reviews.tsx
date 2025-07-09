'use client';

import st from './Reviews.module.scss';
import { ReviewsSlider } from './ReviewsSlider';

export const Reviews = () => {
  return (
    <section className={st.layout}>
      <h2>Clients Say</h2>
      <ReviewsSlider />
    </section>
  );
};
