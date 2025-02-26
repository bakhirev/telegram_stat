import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Title from 'ts/components/Title';
import dataGripStore from 'ts/store/DataGrip';
import fullScreen from 'ts/store/FullScreen';

import SectionSlider from 'ts/pages/PageWrapper/components/SectionSlider';
import printStore from 'ts/pages/PageWrapper/store/Print';

import Hours from './components/Hours';
import Total from './components/Total';
import Month from './components/Month';
import PopularWords from './components/PopularWords';
import UserSelect from './components/UserSelect';

function getMode(): string | undefined {
  if (fullScreen.isOpen) return 'fullscreen';
  if (printStore.processing) return 'print';
  return undefined;
}

interface IPersonProps {
  userId?: string | number;
}

function getViewByIdByUser(user?: any) {
  return function getViewById(page?: string) {
    const mode = getMode();
    if (page === 'total') return <Total mode={mode}/>;
    if (page === 'month') return <Month user={user}/>;
    if (page === 'hours') return <Hours user={user}/>;
    if (page === 'words') return (
      <PopularWords
        user={user}
        mode={mode}
      />
    );
    return <Total mode={mode}/>;
  };
}

const Person = observer(({
  userId,
}: IPersonProps) => {
  const { t } = useTranslation();
  const { page, userId: userIdFromUrl } = useParams<any>();

  const key = userId || userIdFromUrl || -1;
  const user = dataGripStore.dataGrip.users.statistic[key];
  const getViewById = getViewByIdByUser(user);

  const canShowFilter = !printStore.processing && ({
    print: false,
    total: false,
  }[page || ''] ?? true);

  return (
    <>
      {canShowFilter && (
        <>
          <Title title={t('common.filters')} />
          <UserSelect />
        </>
      )}
      <SectionSlider getViewById={getViewById} />
    </>
  );
});

export default Person;
