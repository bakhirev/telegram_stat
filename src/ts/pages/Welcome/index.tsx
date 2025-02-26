import React from 'react';
import { useTranslation } from 'react-i18next';

import Header from './components/Header';
import Desktop from './components/Desktop';
import Footer from './components/Footer';

import main from './styles/main.module.scss';
import background from './styles/background.module.scss';

function Welcome() {
  const { t } = useTranslation();
  return (
    <>
      <div
        className={background.welcome_background}
        style={{
          backgroundImage: 'url(./assets/33.png)',
        }}
      />

      <Header />

      <section className={main.welcome_main}>
        <h1 className={main.welcome_main_title}>
          {t('page.welcome.title')}
        </h1>
        <p className={main.welcome_main_description}>
          {t('page.welcome.description')}
        </p>
      </section>

      <Desktop />

      <Footer />
    </>
  );
}

export default Welcome;
