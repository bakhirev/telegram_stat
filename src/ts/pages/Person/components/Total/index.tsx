import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import Title from 'ts/components/Title';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import { getFakeLoader } from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';

import DepartmentCharts from './Charts';
import Table from './Table';
import Cards from './Cards';

const Page = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const users = dataGripStore.dataGrip.users.statistic
    ?.map((dot: any) => ({
      ...dot,
      from: dot.firstMessage.date,
      to: dot.lastMessage.date,
    }));

  if (!users?.length) {
    return <NothingFound />;
  }

  return (
    <>
      <Cards/>
      <DepartmentCharts/>
      <Title title="page.main.users.title"/>
      <DataLoader
        to="response"
        loader={getFakeLoader(users, mode)}
      >
        <Table mode={mode}/>
        <Pagination/>
      </DataLoader>
    </>
  );
});

export default Page;

