import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { getDate } from 'ts/helpers/formatter';

import dayInfoStore from '../store/DayInfo';
import style from '../styles/day_info.module.scss';

interface UserInfoProps {
  name: string;
  messageNumber: number;
}

function UserInfo({
  name,
  messageNumber,
}: UserInfoProps) {
  return (
    <div
      key={name}
      className={style.year_chart_day_info_row}
    >
      <span className={style.year_chart_day_info_name}>
        {name}
      </span>
      <span className={style.year_chart_day_info_value}>
        {messageNumber}
      </span>
    </div>
  );
}

const DayInfo = observer((): React.ReactElement | null => {
  const [position, setPosition] = useState<any>(null);
  const dayInfo = dayInfoStore.info;

  useEffect(() => {
    if (!dayInfo) return;
    const id = `year_chart_day_${dayInfo?.timestamp}`;
    const element = document.getElementById(id);
    if (!element) return;
    setPosition(element.getBoundingClientRect());
  }, [dayInfo]);

  if (!dayInfo || !position) return null;

  const top = position?.top + position?.height + 10;
  const left = position?.left + (position?.width / 2) - 150;
  const users = Object.entries(dayInfo.userMessageNumbers);

  return (
    <div
      className={style.year_chart_day_info}
      style={{
        top,
        left,
      }}
    >
      <p className={style.year_chart_day_info_title}>
        {getDate(dayInfo.timestamp)}
      </p>

      {`Пользователи (${users.length}):`}
      <div className={`${style.year_chart_day_info_table_wrapper} scroll_y`}>
        <div
          className={style.year_chart_day_info_table}
          style={{
            columnCount: users.length >= 4 ? 2 : 1,
          }}
        >
          {users.map(([name, messageNumber]: [string, number]) => (
            <UserInfo
              key={name}
              name={name}
              messageNumber={messageNumber}
            />
          ))}
        </div>
      </div>

      {`Сообщения (${dayInfo.messagesNumber}):`}
    </div>
  );
});

export default DayInfo;
