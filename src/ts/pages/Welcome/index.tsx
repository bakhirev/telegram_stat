import React from 'react';

import { t } from 'ts/helpers/Localization';

import style from './styles/index.module.scss';

interface StepProps {
  src: string;
  alt: string;
}

function Step({ src, alt }: StepProps) {
  const title = t(alt || '');
  return (
    <figure className={style.welcome_step}>
      <img
        src={src}
        alt={title}
        className={style.welcome_step_img}
      />
      <figcaption className={style.welcome_step_title}>
        {title}
      </figcaption>
    </figure>
  );
}

function Welcome() {
  return (
    <section className={style.welcome}>
      <h2 className={style.welcome_first_title}>
        {t('page.welcome.title')}
      </h2>

      <div className={style.welcome_steps}>
        <Step
          src="./assets/welcome/1.png"
          alt="page.welcome.step1"
        />
        <Step
          src="./assets/welcome/2.png"
          alt="page.welcome.step2"
        />
        <Step
          src="./assets/welcome/3.png"
          alt="page.welcome.step3"
        />
        <Step
          src="./assets/welcome/4.png"
          alt="page.welcome.step4"
        />
      </div>
    </section>
  );
}

export default Welcome;
