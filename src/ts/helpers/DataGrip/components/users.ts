import { HashMap } from 'ts/interfaces/HashMap';
import { MessageInfo } from 'ts/interfaces/Telegramm';

import { WeightedAverage } from 'ts/helpers/Math';

export default class DataGripByAuthor {
  messages: HashMap<any> = new Map();

  order: string[] = [];

  statistic: any = [];

  clear() {
    this.messages.clear();
    this.order = [];
    this.statistic = [];
  }

  addCommit(messageInfo: MessageInfo) {
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
    statistic.messagesSize.update(messageInfo?.text?.length || 0);
  }

  #add(messageInfo: MessageInfo) {
    const messagesSize = new WeightedAverage();
    messagesSize.update(messageInfo?.text?.length || 0);
    this.messages.set(messageInfo.from_id, {
      id: messageInfo.from_id,
      name: messageInfo.from,
      from: messageInfo.date,
      to: messageInfo.date,
      messagesNumber: 1,
      messagesSize,
    });
  }

  updateTotalInfo() {
    this.statistic = Array.from(this.messages.values())
      .map((user) => {
        user.messagesSize = Math.round(user.messagesSize.get());
        return user;
      });

    this.statistic.sort((a: any, b: any) => b.messagesNumber - a.messagesNumber);
    this.order = this.statistic.map((user: any) => user.name);
    this.messages.clear();
  }
}
