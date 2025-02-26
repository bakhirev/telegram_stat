import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import viewNameStore, { ViewNameEnum } from 'ts/store/ViewName';
import DropZone from 'ts/components/DropZone';
import Confirm from 'ts/components/ModalWindow/Confirm';

import PageWrapper from './PageWrapper';
import Common from './Person/index';
import Welcome from './Welcome/index';

function ViewWithCharts() {
  return (
    <>
      <Confirm />
      <Routes>
        <Route
          path="/:type/:page/:userId"
          element={(
            <PageWrapper>
              <Common />
            </PageWrapper>
          )}
        />
        <Route
          path="*"
          element={(
            <PageWrapper>
              <Common />
            </PageWrapper>
          )}
        />
      </Routes>
    </>
  );
}

function ViewWithWelcome() {
  return (
    <Routes>
      <Route
        path="*"
        element={(
          <Welcome />
        )}
      />
    </Routes>
  );
}

const Main = observer(() => {
  const view = viewNameStore.view;

  useEffect(() => {
    viewNameStore.toggle(ViewNameEnum.WELCOME);
  }, []);

  useEffect(() => {
    if (view !== ViewNameEnum.INFO || window.location.hash) return;
    window.location.hash = '#/common/total/all';
  }, [view]);

  if (view === ViewNameEnum.EMPTY) return null;

  return (
    <>
      {view === ViewNameEnum.WELCOME && (
        <ViewWithWelcome />
      )}
      {view === ViewNameEnum.INFO && (
        <ViewWithCharts />
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
