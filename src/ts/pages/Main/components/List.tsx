import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import { getMax } from 'ts/pages/Common/helpers/getMax';
import dataGripStore from 'ts/store/DataGrip';
import { getDate } from 'ts/helpers/formatter';

interface UserListProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
}

function UserList({ response, updateSort, rowsForExcel }: UserListProps) {
  if (!response) return null;
  const users = dataGripStore.dataGrip.users;

  const messagesNumberChart = getOptions({
    max: getMax(response, 'messagesNumber'),
    suffix: 'page.team.author.days',
  });

  const messagesSizeChart = getOptions({
    max: getMax(response, 'messagesSize'),
    suffix: 'page.team.author.days',
  });

  const reactionsReceivedChart = getOptions({
    order: users.order,
    max: getMax(response, 'reactionsReceivedTotal'),
    suffix: 'page.team.author.reactionsReceived',
  });

  const reactionsGiveChart = getOptions({
    order: users.order,
    max: getMax(response, 'reactionsGiveTotal'),
    suffix: 'page.team.author.reactionsGive',
  });

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
    >
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        properties="name"
        title="page.main.users.name"
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="messagesNumber"
      />
      <Column
        isSortable="messagesNumber"
        title="page.main.users.messagesNumber"
        properties="messagesNumber"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            options={messagesNumberChart}
            value={value}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="messagesSize"
      />
      <Column
        isSortable="messagesSize"
        title="page.main.users.messagesSize"
        properties="messagesSize"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            options={messagesSizeChart}
            value={value}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="reactionsReceivedTotal"
      />
      <Column
        isSortable="reactionsReceivedTotal"
        title="page.main.users.reactionsReceived"
        minWidth={150}
        template={(row: any) => (
          <LineChart
            options={reactionsReceivedChart}
            value={row.reactionsReceivedTotal}
            details={row.reactionsReceived}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="reactionsGiveTotal"
      />
      <Column
        isSortable="reactionsGiveTotal"
        title="page.main.users.reactionsGive"
        minWidth={150}
        template={(row: any) => (
          <LineChart
            options={reactionsGiveChart}
            value={row.reactionsGiveTotal}
            details={row.reactionsGive}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        properties="from"
        title="page.main.users.from"
        formatter={getDate}
        width={140}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        properties="to"
        title="page.main.users.to"
        formatter={getDate}
        width={140}
      />
    </DataView>
  );
}

UserList.defaultProps = {
  response: undefined,
};

export default UserList;
