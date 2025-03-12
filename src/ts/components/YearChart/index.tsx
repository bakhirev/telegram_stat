import React, { useEffect, useRef, useState } from 'react';

import { DataGripMonth } from 'ts/helpers/DataGrip/components/months';

import DayInfo from './components/DayInfo';
import Month from './components/Month';
import style from './styles/index.module.scss';

function getDayWidth(wrapperWidth: number, monthNumber: number) {
  const step = 0.3;
  const borders = 7;
  for (let px = 16; px <= 24; px += step) {
    const monthWidth = borders + 8 * px;
    const size = monthWidth * monthNumber;
    if (size > wrapperWidth) return (px - step);
  }
  return 24;
}

interface IYearChartProps {
  max: number;
  property: string;
  months: DataGripMonth[];
}

function YearChart({
  max = 100,
  property = '',
  months = [],
}: IYearChartProps): React.ReactElement | null {
  const wrapper = useRef(null);
  const [dayWidth, setDayWidth] = useState<number>(16);

  useEffect(() => {
    if (!wrapper.current) return; // @ts-ignore
    const size = wrapper.current?.getBoundingClientRect() || {};
    const minMonthWidth = 7 + 8 * 16;
    const newMonthNumber = Math.floor(size.width / minMonthWidth);
    const width = getDayWidth(size.width, newMonthNumber);

    setDayWidth(width);
  }, []);

  if (!months?.length) return null;

  const elements = months.map((month: DataGripMonth, index: number) => {
    const prev = months[index - 1];
    return (
      <Month
        key={month.id}
        max={max}
        showYear={prev?.year !== month?.year}
        property={property}
        month={month}
      />
    );
  });


  const customStyle = { '--day-size': `${dayWidth.toFixed(1)}px` } as React.CSSProperties;

  return (
    <div
      ref={wrapper}
      style={customStyle}
      className={style.year_chart}
    >
      {elements}

      <DayInfo />
    </div>
  );
}

export default YearChart;
