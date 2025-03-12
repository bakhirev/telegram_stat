import React from 'react';
import { observer } from 'mobx-react-lite';

import Title from 'ts/components/Title';
import HoursChart from 'ts/components/HoursChart';
import PageWrapper from 'ts/components/Page/wrapper';
import dataGripStore from 'ts/store/DataGrip';

import CommonPropsProps from '../interfaces/CommonProps';

const Page = observer(({
  user,
}: CommonPropsProps): React.ReactElement => {
  const statistic = user
    ? dataGripStore.dataGrip.hours.get(user.id)?.statistic
    : dataGripStore.dataGrip.hoursTotal.statistic;

  return (
    <>
      <Title title="page.hours.title"/>
      <PageWrapper template="table">
        <HoursChart statistic={statistic} />
      </PageWrapper>
    </>
  );
});

export default Page;
