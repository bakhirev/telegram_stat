import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import Select from 'ts/components/UiKit/components/Select';
import localization from 'ts/helpers/Localization';
import { onChangeLanguage } from 'ts/helpers/i18n';

import Title from './Title';
import printStore from '../../store/Print';
import style from '../../styles/header.module.scss';

const Header = observer((): React.ReactElement | null => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={style.header}>
      <Title/>
      <Select
        className={style.header_lang}
        value={localization.language}
        options={[
          { id: 'ru', title: 'RU' },
          { id: 'en', title: 'EN' },
          { id: 'zh', title: 'ZH' },
          { id: 'es', title: 'ES' },
          { id: 'fr', title: 'FR' },
          { id: 'pt', title: 'PT' },
          { id: 'de', title: 'DE' },
          { id: 'ja', title: 'JA' },
          { id: 'ko', title: 'KO' },
        ]}
        onChange={(item: any, id: string) => {
          onChangeLanguage(i18n, id);
        }}
      />
      <img
        title={t('sidebar.buttons.print')}
        className={style.header_print}
        src="./assets/menu/print.svg"
        onClick={() => {
          printStore.open(navigate, location.pathname);
        }}
      />
    </header>
  );
});

export default Header;
