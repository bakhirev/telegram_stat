import React from 'react';
import { observer } from 'mobx-react-lite';

import NothingFound from 'ts/components/NothingFound';
import PageWrapper from 'ts/components/Page/wrapper';
import CandyChart from 'ts/components/CandyChart';
import Title from 'ts/components/Title';

import dataGripStore from 'ts/store/DataGrip';

import CommonPropsProps from '../interfaces/CommonProps';

const Page = observer(({
  mode,
  user,
}: CommonPropsProps): React.ReactElement | null => {
  const list = user
    ? dataGripStore.dataGrip.words.get(user.id).statistic
    : dataGripStore.dataGrip.wordsTotal.statistic;

  const limit = mode === 'print' ? 20 : 40;
  const dots = list
    .slice(0, limit)
    .map((titleValue: any) => ({
      title: titleValue[0],
      value: titleValue[1],
    }));

  if (!dots?.length) {
    return (<NothingFound />);
  }

  return (
    <>
      <Title title="page.words.title"/>
      <PageWrapper template="table">
        <CandyChart dots={dots}/>
      </PageWrapper>
    </>
  );
});

export default Page;
