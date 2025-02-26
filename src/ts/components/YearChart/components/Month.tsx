import React from 'react';

import { DataGripMonth } from 'ts/helpers/DataGrip/components/months';

import Header from './Header';
import Body from './Body';

import styleChart from '../styles/line.module.scss';
import style from '../styles/index.module.scss';

interface MonthProps {
  max: number;
  showYear: boolean;
  property: string;
  month: DataGripMonth;
}

function Month({
  max,
  showYear,
  property,
  month,
}: MonthProps): React.ReactElement | null {
  return (
    <div className={style.year_chart_month}>
      <Header
        month={month}
        showYear={showYear}
      />
      <Body
        max={max}
        property={property}
        month={month}
      />
      <div className={styleChart.year_chart_month_info}>
        {`💬 ${month.messagesNumber || 0} 👨‍💻 ${month.usersNumber || 0}`}
      </div>
    </div>
  );
}

export default Month;
