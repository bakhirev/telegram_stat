import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Logo from './Logo';
import Switch from './Switch';
import SideBarButtons from './Buttons';
import SideBarScrollUp from './ScrollUp';

import style from '../../styles/sidebar.module.scss';
import { TYPES } from '../../helpers/menu';

function SideBar() {
  const { type } = useParams<any>();
  const navigate = useNavigate();
  const formattedType = type || 'common';

  return (
    <aside className={style.sidebar}>
      <Logo/>
      {false && (
        <Switch
          value={formattedType}
          options={TYPES}
          onChange={(newType: string) => {
            if (newType === type) return;
            navigate(`/${newType}/total/all`);
          }}
        />
      )}
      <SideBarButtons />
      <SideBarScrollUp />
    </aside>
  );
}

export default SideBar;
