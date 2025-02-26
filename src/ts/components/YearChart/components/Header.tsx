import React from 'react';

import { DataGripMonth } from 'ts/helpers/DataGrip/components/months';
import { getCustomDate } from 'ts/helpers/formatter';

import style from '../styles/index.module.scss';

interface IHeaderProps {
  showYear: boolean;
  month: DataGripMonth;
}

function Header({
  showYear,
  month,
}: IHeaderProps): React.ReactElement | null {
  const title = showYear
    ? getCustomDate(month.milliseconds, { month: 'long', year: 'numeric' })
    : getCustomDate(month.milliseconds, { month: 'long' });

  return (
    <div className={style.year_chart_month_header}>
      <span
        className={style.year_chart_month_header_title}
        style={{ fontWeight: showYear ? 'bold' : 100 }}
      >
        {title}
      </span>
    </div>
  );
}

export default Header;
