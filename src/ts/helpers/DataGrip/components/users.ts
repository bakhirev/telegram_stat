import { HashMap } from 'ts/interfaces/HashMap';
import { MessageInfo } from 'ts/interfaces/Telegramm';

import { WeightedAverage } from 'ts/helpers/Math';

function getTextLength(text: any): number {
  if (typeof text === 'string') {
    return text.length;
  } else if (Array.isArray(text)) {
    return text.reduce((sum: number, item: string) => (
      sum + getTextLength(item)
    ), 0);
  } else if (text?.type === 'plain') {
    return text?.text?.length || 0;
  }
  return 0;
}

function replaceIdToName(users: HashMap<any>, details: HashMap<number>) {
  const newDetails = {};
  const list = Object.fromEntries(details);
  for (let id in list) {
    const name = users.get(id)?.name || id;
    newDetails[name] = list[id];
  }
  return newDetails;
}

export default class DataGripByAuthor {
  messages: HashMap<any> = new Map();

  order: string[] = [];

  statistic: any = [];

  clear() {
    this.messages.clear();
    this.order = [];
    this.statistic = [];
  }

  addMessage(messageInfo: MessageInfo) {
    const statistic = this.messages.get(messageInfo.from_id);
    if (statistic) {
      this.#update(statistic, messageInfo);
    } else {
      this.#add(messageInfo);
    }
  }

  #update(statistic: any, messageInfo: MessageInfo) {
    statistic.name = messageInfo.from;
    statistic.messagesNumber += 1;
    statistic.to = messageInfo.date;
    statistic.messagesSize.update(getTextLength(messageInfo?.text));
  }

  #add(messageInfo: MessageInfo) {
    const messagesSize = new WeightedAverage();
    messagesSize.update(getTextLength(messageInfo?.text));
    this.messages.set(messageInfo.from_id, {
      id: messageInfo.from_id,
      name: messageInfo.from,
      from: messageInfo.date,
      to: messageInfo.date,
      messagesNumber: 1,
      messagesSize,
      reactionsReceivedTotal: 0,
      reactionsGiveTotal: 0,
    });
  }

  updateTotalInfo(statisticByReactions: any) {
    this.statistic = Array.from(this.messages.values())
      .map((user) => {
        user.messagesSize = Math.round(user.messagesSize.get());
        const reactions = statisticByReactions.users.get(user.id);
        if (reactions) {
          user.reactionsReceivedTotal = reactions.receivedTotal;
          user.reactionsGiveTotal = reactions.giveTotal;
          user.reactionsReceived = replaceIdToName(this.messages, reactions.received);
          user.reactionsGive = replaceIdToName(this.messages, reactions.give);
        }
        return user;
      });

    this.statistic.sort((a: any, b: any) => b.messagesNumber - a.messagesNumber);
    this.order = this.statistic.map((user: any) => user.name);
    this.messages.clear();
  }
}
