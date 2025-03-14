import React from 'react';

import FooterColumn from './FooterColumn';

import style from '../styles/footer.module.scss';

function Footer() {
  return (
    <footer className={style.welcome_footer}>
      <section className={style.welcome_footer_top}>
        <FooterColumn
          title="page.welcome.steps"
          options={[
            'page.welcome.step1',
            'page.welcome.step2',
            'page.welcome.step3',
            'page.welcome.step4',
            'page.welcome.step5',
            'page.welcome.step6',
          ]}
        />

        <FooterColumn
          title="page.welcome.about"
          options={[
            { title: 'Reddit', link: 'https://github.com/bakhirev/telegram_stat' },
            { title: 'VC', link: 'https://github.com/bakhirev/telegram_stat' },
            { title: 'Habr', link: 'https://github.com/bakhirev/telegram_stat' },
            { title: 'YouTube', link: 'https://github.com/bakhirev/telegram_stat' },
          ]}
        />

        <FooterColumn
          title="page.welcome.languages"
          options={[
            'English',
            'Español',
            'Deutsch',
            'Français',
          ]}
        />

        <FooterColumn
          options={[
            'Português',
            'Русский',
          ]}
        />
      </section>
      <section className={style.welcome_footer_bottom}>
        © All rights reserved
      </section>
    </footer>
  );
}

export default Footer;
