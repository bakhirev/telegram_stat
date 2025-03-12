import React from 'react';
import { observer } from 'mobx-react-lite';

import CardWithIcon from 'ts/components/CardWithIcon';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import dataGripStore from 'ts/store/DataGrip';
import { getNumber } from 'ts/helpers/formatter';

const Cards = observer((): React.ReactElement => {
  const users = dataGripStore.dataGrip.users.statistic;
  const months = dataGripStore.dataGrip.monthsTotal.statistic;
  const activeUsers = months[months.length - 1].usersNumber;
  const passiveUsers = users.length - activeUsers;
  const messagesNumber = users.reduce((sum: number, user: any) => (
    sum + user?.messagesNumber
  ), 0);
  const reactions = dataGripStore.dataGrip.reactions.users.values();
  const reactionsNumber = reactions.reduce((sum: number, reaction: any) => (
    sum + reaction?.giveTotal
  ), 0);

  return (
    <PageWrapper>
      <PageColumn>
        <CardWithIcon
          size="l"
          value={`${activeUsers} / ${passiveUsers}`}
          icon="./assets/cards/dismissal.png"
          title="page.main.cards.active.title"
          description="page.main.cards.active.description"
        />
      </PageColumn>
      <PageColumn>
        <CardWithIcon
          value={getNumber(messagesNumber)}
          icon="./assets/cards/month.png"
          title="page.main.cards.message.title"
          description="page.main.cards.message.description"
        />
        <CardWithIcon
          value={getNumber(reactionsNumber)}
          icon="./assets/cards/tasks_month.png"
          title="page.main.cards.reaction.title"
          description="page.main.cards.reaction.description"
        />
      </PageColumn>
    </PageWrapper>
  );
});

export default Cards;
