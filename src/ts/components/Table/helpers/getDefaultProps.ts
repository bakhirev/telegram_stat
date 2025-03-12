import React from 'react';

import { getDate, getNumber } from 'ts/helpers/formatter';

import { ColumnTypesEnum } from '../interfaces/Column';
import style from '../styles/index.module.scss';

const IS_SORTABLE_TEMPLATE = {
  [ColumnTypesEnum.STRING]: true,
  [ColumnTypesEnum.NUMBER]: true,
  [ColumnTypesEnum.SHORT_NUMBER]: true,
};

export default function getDefaultProps(children: React.ReactNode) {
  return React.Children.map(children, (child: React.ReactNode) => {
    if (!React.isValidElement(child)) return null;

    const template = child?.props?.template || ColumnTypesEnum.STRING;

    // @ts-ignore
    const className = child?.props?.className || {
      [ColumnTypesEnum.STRING]: '',
      [ColumnTypesEnum.NUMBER]: style.table_cell_number,
      [ColumnTypesEnum.SHORT_NUMBER]: style.table_cell_number,
    }[template || ''] || '';

    // @ts-ignore
    const defaultWidth = child?.props?.width || {
      [ColumnTypesEnum.SHORT_NUMBER]: 70,
      [ColumnTypesEnum.DATE]: 140,
    }[template || ''] || 0;

    // @ts-ignore
    const minWidth = child?.props?.minWidth || {
      [ColumnTypesEnum.STRING]: 200,
      [ColumnTypesEnum.NUMBER]: 110,
      [ColumnTypesEnum.DATE]: 140,
    }[template || ''] || 40;

    // @ts-ignore
    const formatter = child?.props?.formatter || {
      [ColumnTypesEnum.NUMBER]: getNumber,
      [ColumnTypesEnum.SHORT_NUMBER]: getNumber,
      [ColumnTypesEnum.DATE]: getDate,
    }[template || ''];

    // @ts-ignore
    const isSortable = child?.props?.isSortable // @ts-ignore
      ? child?.props?.isSortable
      : IS_SORTABLE_TEMPLATE[template];

    return {
      ...child.props as object,
      className,
      template,
      formatter,
      isSortable,
      minWidth,
      defaultWidth,
      width: undefined,
      userWidth: undefined,
    };
  });
}
