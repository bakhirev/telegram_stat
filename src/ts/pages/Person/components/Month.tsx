import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import YearChart from 'ts/components/YearChart';
import Title from 'ts/components/Title';

import PageWrapper from 'ts/components/Page/wrapper';

import CommonPropsProps from '../interfaces/CommonProps';

const Month = observer(({
  user,
}: CommonPropsProps): React.ReactElement | null => {
  const months = user
    ? dataGripStore.dataGrip.months.get(user.id)
    : dataGripStore.dataGrip.monthsTotal;

  const property = user
    ? 'messagesNumber'
    : 'userMessageNumbers';

  return (
    <>
      <Title title="page.common.month.title"/>
      <PageWrapper template="table">
        <YearChart
          max={months.counter.max}
          property={property}
          months={months.statistic}
        />
      </PageWrapper>
    </>
  );
});

export default Month;
