import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import localization from 'ts/helpers/Localization';
import ru from 'ts/translations/ru';

import initializationI18n from './ts/helpers/i18n';

import Main from 'ts/pages/index';
import Notifications from 'ts/components/Notifications';
import applyUrlCommands from 'ts/helpers/RPC';

import './styles/index.scss';

// eslint-disable-next-line
// @ts-ignore
if (module.hot) {
  // eslint-disable-next-line
  // @ts-ignore
  module.hot.accept();
}

localization.parse('ru', ru);

function renderReactApplication() {
  window.onafterprint = () => {
  };

  const container = document.getElementById('root');
  if (!container) return;

  createRoot(container).render(
    <React.StrictMode>
      <HashRouter>
        <Main />
        <Notifications/>
      </HashRouter>
    </React.StrictMode>,
  );
}

applyUrlCommands((parameters: any) => {
  initializationI18n(parameters.lang || parameters.language);
  renderReactApplication();
});
