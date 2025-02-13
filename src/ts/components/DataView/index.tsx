import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ISort from 'ts/interfaces/Sort';
import Table from 'ts/components/Table';
import { downloadExcel } from 'ts/helpers/File';
import isMobile from 'ts/helpers/isMobile';

import style from './index.module.scss';
import PageWrapper from '../Page/wrapper';

interface IDataViewProps {
  rowsForExcel?: any[];
  rows: any[];
  mode?: string;
  sort?: ISort[];
  disabledRow?: (row: any) => boolean;
  converterToCsv?: Function,
  updateSort?: Function,
  children: React.ReactNode | React.ReactNode[];
}

function DataView({
  rowsForExcel = [],
  rows = [],
  sort = [],
  mode,
  disabledRow,
  updateSort,
  children,
}: IDataViewProps): React.ReactElement | null {
  const { t } = useTranslation();
  const urlParams = useParams<any>();

  if (!rows || !rows.length) return null;

  return (
    <>
      {mode !== 'details' && (
        <div style={{ position: 'relative' }}>
          <div className={style.data_view_buttons}>
            {!isMobile && (
              <img
                src="./assets/icons/Download.svg"
                className={style.data_view_icon}
                onClick={() => {
                  const fileName = t(`sidebar.${urlParams.type}.${urlParams.page}`);
                  downloadExcel(rowsForExcel || rows, children, fileName);
                }}
              />
            )}
          </div>
        </div>
      )}

      {mode !== 'details' && (
        <PageWrapper template="table">
          <Table
            rows={rows}
            sort={sort}
            disabledRow={disabledRow}
            updateSort={updateSort}
          >
            {children}
          </Table>
        </PageWrapper>
      )}

      {mode === 'details' && (
        <Table
          rows={rows}
          sort={sort}
          disabledRow={disabledRow}
          updateSort={updateSort}
        >
          {children}
        </Table>
      )}
    </>
  );
}

DataView.defaultProps = {
  rows: [],
  sort: [],
  type: undefined,
  columnCount: undefined,
  updateSort: () => {
  },
};

export default DataView;
