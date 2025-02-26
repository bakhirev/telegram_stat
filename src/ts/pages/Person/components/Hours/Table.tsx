import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import dataGripStore from 'ts/store/DataGrip';
import { getShortDateRange } from 'ts/helpers/formatter';
import { getMax } from 'ts/helpers/getMax';

interface TableViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
}

function TableView({ response, updateSort, rowsForExcel }: TableViewProps) {
  if (!response) return null;
  const users = dataGripStore.dataGrip.users;
  console.log(users);

  const messagesNumberChart = getOptions({
    max: getMax(response, 'messagesNumber'),
    suffix: 'page.week.messages',
  });

  const usersNumberChart = getOptions({
    max: getMax(response, 'usersNumber'),
    suffix: 'page.week.users',
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
        title="page.common.week.date"
        properties="date"
        formatter={getShortDateRange}
        width={260}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="usersNumber"
      />
      <Column
        isSortable="usersNumber"
        title="page.common.week.usersNumber"
        properties="usersNumber"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            options={usersNumberChart}
            value={value}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="messagesNumber"
      />
      <Column
        isSortable="messagesNumber"
        title="page.common.week.messagesNumber"
        properties="messagesNumber"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            options={messagesNumberChart}
            value={value}
          />
        )}
      />
    </DataView>
  );
}

TableView.defaultProps = {
  response: undefined,
};

export default TableView;
