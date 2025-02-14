import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import Title from 'ts/components/Title';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import { getFakeLoader } from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';

import List from './components/List';
import DepartmentCharts from './components/Charts';
import style from './styles/index.module.scss';

const Total = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const users = dataGripStore.dataGrip.users.statistic;

  if (!users?.length) {
    return <NothingFound />;
  }

  return (
    <div className={style.page_wrapper}>
      <div className={style.page_small}>
        <DepartmentCharts/>
      </div>
      <div className={style.page_full}>
        <Title title="page.main.users.title"/>
        <DataLoader
          to="response"
          loader={getFakeLoader(users, mode)}
        >
          <List/>
          <Pagination/>
        </DataLoader>
      </div>
    </div>
  );
});

export default Total;

