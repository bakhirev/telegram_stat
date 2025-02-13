import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import viewNameStore, { ViewNameEnum } from 'ts/store/ViewName';
import DropZone from 'ts/components/DropZone';

import MainView from './Main/index';
import Welcome from './Welcome/index';

let bugInReactWithDoubleInit = 1;
const Main = observer(() => {
  const view = viewNameStore.view;

  useEffect(() => {
    // @ts-ignore
    const list = window?.report || [];
    if (list?.length && bugInReactWithDoubleInit !== list?.length) {
      bugInReactWithDoubleInit = list?.length;
      dataGripStore.asyncSetCommits(list);
    } else {
      viewNameStore.toggle(ViewNameEnum.WELCOME);
    }
  }, []);

  if (view === ViewNameEnum.EMPTY) return null;

  return (
    <>
      {view === ViewNameEnum.WELCOME && (
        <Welcome />
      )}
      {view === ViewNameEnum.INFO && (
        <MainView />
      )}
      <DropZone
        onChange={(type: string, json: any) => {
          dataGripStore.asyncSetCommits(json);
        }}
      />
    </>
  );
});

export default Main;
