import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';

import style from '../styles/filters.module.scss';

const UserSelect = observer((): React.ReactElement => {
  const { type, page, userId } = useParams<any>();
  const navigate = useNavigate();

  const formattedUserId = userId !== 'all'
    ? parseInt(userId || '0', 10) || 0
    : 'all';

  const authors = dataGripStore.dataGrip.users.order;
  const options = authors.map((title: string, id: number) => ({ id, title }));
  options.unshift({ title: 'Все', id: 'all' });

  return (
    <div className={style.table_filters}>
      <SelectWithButtons
        title="page.team.tree.filters.author"
        value={formattedUserId}
        className={style.table_filters_item}
        options={options}
        onChange={(newUserId: number) => {
          navigate(`/${type}/${page}/${newUserId}`);
        }}
      />
    </div>
  );
});

export default UserSelect;
