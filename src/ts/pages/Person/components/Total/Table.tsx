import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import dataGripStore from 'ts/store/DataGrip';
import { getDate } from 'ts/helpers/formatter';
import { getMax } from 'ts/helpers/getMax';

interface TableViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function TableView({
  mode,
  response,
  updateSort,
  rowsForExcel,
}: TableViewProps) {
  if (!response) return null;
  const users = dataGripStore.dataGrip.users;
  const isPrint = mode === 'print';

  const messagesNumberChart = getOptions({
    max: getMax(response, 'messagesNumber'),
    suffix: 'page.common.author.days',
  });

  const messagesSizeChart = getOptions({
    max: getMax(response, 'messagesSize'),
    suffix: 'page.common.author.days',
  });

  const reactionsReceivedChart = getOptions({
    order: users.order,
    max: getMax(response, 'reactionsReceivedTotal'),
    suffix: 'page.common.author.reactionsReceived',
  });

  const reactionsGiveChart = getOptions({
    order: users.order,
    max: getMax(response, 'reactionsGiveTotal'),
    suffix: 'page.common.author.reactionsGive',
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
        width={isPrint ? 150 : undefined}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        title={isPrint ? 'page.main.users.messagesNumber' : undefined}
        properties="messagesNumber"
      />
      {!isPrint ? (
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
      ) : null}
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        title={isPrint ? 'page.main.users.messagesSize' : undefined}
        properties="messagesSize"
      />
      {!isPrint ? (
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
      ) : null}
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        title={isPrint ? 'page.main.users.reactionsReceived' : undefined}
        properties="reactionsReceivedTotal"
      />
      {!isPrint ? (
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
      ) : null}
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        title={isPrint ? 'page.main.users.reactionsGive' : undefined}
        properties="reactionsGiveTotal"
      />
      {!isPrint ? (
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
      ) : null}
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

TableView.defaultProps = {
  response: undefined,
};

export default TableView;
