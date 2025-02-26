import React from 'react';

import { DataGripDay } from 'ts/helpers/DataGrip/components/months';
import { getDate } from 'ts/helpers/formatter';

import { getPercentByMax, getColor } from '../helpers/day';
import style from '../styles/index.module.scss';

function getForUserMessageNumbers(dayInfo: DataGripDay): string[] {
  const users = Array.from(Object.entries(dayInfo.userMessageNumbers));
  const title = users
    .sort((a: any, b: any) => b[1] - a[1])
    .map((dot: any) => `${dot[0]}: ${dot[1]}`)
    .join('\n');
  const value = `${users.length || ''}`;
  return [title, value];
}

function getForMessagesNumber(dayInfo: DataGripDay): string[] {
  const title = getDate(dayInfo.timestamp);
  const value = `${dayInfo.messagesNumber || ''}`;
  return [title, value];
}

interface DayProps {
  max: number;
  dayNumber: number;
  property: string;
  dayInfo: DataGripDay;
}

function Day({
  max,
  dayNumber,
  property,
  dayInfo,
}: DayProps): React.ReactElement | null {
  const weekend = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41];
  const opacity = getPercentByMax(dayInfo.messagesNumber, max);
  const isWeekend = weekend.includes(dayNumber);
  const backgroundColor = getColor(isWeekend, opacity);

  const [title, value] = property === 'userMessageNumbers'
    ? getForUserMessageNumbers(dayInfo)
    : getForMessagesNumber(dayInfo);

  return (
    <div
      title={title}
      className={style.year_chart_month_body_day}
      style={{
        backgroundColor,
      }}
    >
      {value || ' '}
    </div>
  );
}

Day.defaultProps = {
  rows: [],
};

export default Day;
