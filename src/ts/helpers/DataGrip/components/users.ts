import { HashMap } from 'ts/interfaces/HashMap';
import { MessageInfo } from 'ts/interfaces/CommonMessage';

import { WeightedAverage } from 'ts/helpers/Math';

export default class DataGripByAuthor {
  messages: HashMap<any> = new Map();

  refUserIdName: HashMap<string> = new Map();

  order: string[] = [];

  statistic: any = [];

  clear() {
    this.messages.clear();
    this.refUserIdName.clear();
    this.order = [];
    this.statistic = [];
  }

  replaceUserIdToName(details: HashMap<number>) {
    const newDetails = {};
    const list = Object.fromEntries(details);
    for (let id in list) {
      const name = this.refUserIdName.get(id) || id;
      newDetails[name] = list[id];
    }
    return newDetails;
  }

  addMessage(messageInfo: MessageInfo) {
    const statistic = this.messages.get(messageInfo.userId);
    if (statistic) {
      this.#update(statistic, messageInfo);
    } else {
      this.#add(messageInfo);
    }
  }

  #update(statistic: any, messageInfo: MessageInfo) {
    statistic.name = messageInfo.name;
    statistic.messagesNumber += 1;
    statistic.lastMessage = messageInfo;
    statistic.messagesSize.update(messageInfo?.text?.length);
  }

  #add(messageInfo: MessageInfo) {
    const messagesSize = new WeightedAverage();
    messagesSize.update(messageInfo?.text?.length);
    this.messages.set(messageInfo.userId, {
      id: messageInfo.userId,
      name: messageInfo.name,
      firstMessage: messageInfo,
      lastMessage: messageInfo,
      messagesNumber: 1,
      messagesSize,
      reactionsReceivedTotal: 0,
      reactionsGiveTotal: 0,
    });
  }

  updateTotalInfo(statisticByReactions: any) {
    this.statistic = Array.from(this.messages.values())
      .map((user) => {
        this.refUserIdName.set(user.id, user.name);
        return user;
      })
      .map((user) => {
        user.messagesSize = Math.round(user.messagesSize.get());
        const reactions = statisticByReactions.users.get(user.id);
        if (reactions) {
          user.reactionsReceivedTotal = reactions.receivedTotal;
          user.reactionsGiveTotal = reactions.giveTotal;
          user.reactionsReceived = this.replaceUserIdToName(reactions.received);
          user.reactionsGive = this.replaceUserIdToName(reactions.give);
        }
        return user;
      });

    this.statistic.sort((a: any, b: any) => b.messagesNumber - a.messagesNumber);
    this.order = this.statistic.map((user: any) => user.name);
    this.messages.clear();
  }
}
