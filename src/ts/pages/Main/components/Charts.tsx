import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import PageWrapper from 'ts/components/Page/wrapper';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import PieChart from 'ts/components/PieChart';

const PieCharts = observer((): React.ReactElement | null => {
  const users = dataGripStore.dataGrip.users;

  const options = getOptions({
    order: users.order,
    limit: 2,
    suffix: 'page.main.chart.messages',
  });

  const details = users.statistic.reduce((acc: any, user: any) => {
    acc[user.name] = user.messagesNumber;
    return acc;
  }, {});

  return (
    <PageWrapper>
      <PieChart
        title="page.main.chart.title"
        options={options}
        details={details}
      />
    </PageWrapper>
  );
});

export default PieCharts;
