import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UiKitSelect from 'ts/components/UiKit/components/Select';
import { onChangeLanguage } from 'ts/helpers/i18n';
import localization from 'ts/helpers/Localization';

import style from '../styles/header.module.scss';

const list = {
  en: 'English',
  es: 'Español',
  zh: '中文',
  de: 'Deutsch',
  fr: 'Français',
  pt: 'Português',
  ru: 'Русский',
};

function Desktop() {
  const { t, i18n } = useTranslation();
  const value = useMemo(() => localization.language, [localization.language]);

  const options = Object
    .entries(list)
    .map(([id, title]: string[]) => ({
      id,
      title,
    }));

  return (
    <header className={style.welcome_header}>
      <img
        alt="logo"
        className={style.welcome_header_logo}
        src="./assets/logo.svg"
      />
      <Link
        to="https://github.com/bakhirev/telegram_stat"
        target="_blank"
        className={style.welcome_header_link}
      >
        GitHub
      </Link>
      <Link
        to="https://t.me/bakhirev"
        target="_blank"
        className={style.welcome_header_link}
      >
        {t('page.welcome.contacts')}
      </Link>
      <UiKitSelect
        value={value}
        options={options}
        className={style.welcome_header_select}
        onChange={(a: any, code: string) => {
          onChangeLanguage(i18n, code);
        }}
      />
    </header>
  );
}

export default Desktop;
