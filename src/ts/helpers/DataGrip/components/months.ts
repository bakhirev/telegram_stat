import { HashMap } from 'ts/interfaces/HashMap';
import { MessageInfo } from 'ts/interfaces/CommonMessage';
import MinMaxCounter from './counter';

export interface DataGripDay {
  timestamp: string;
  dayInMonth: number;
  messagesNumber: number;
  userMessageNumbers: HashMap<number>;
}

export interface DataGripMonth {
  id: string;
  month: number;
  year: number;
  date: Date;
  milliseconds: number;

  days: DataGripDay[];
  messagesNumber: number;
  usersNumber: number;
}

export default class DataGripByMonth {
  months: HashMap<any> = new Map();

  counter: MinMaxCounter = new MinMaxCounter();

  statistic: DataGripMonth[] = [];

  clear() {
    this.months.clear();
    this.counter.clear();
    this.statistic = [];
  }

  #getKey(messageInfo: MessageInfo) {
    return `${messageInfo.year}-${messageInfo.month}`;
  }

  addMessage(messageInfo: MessageInfo) {
    const key = this.#getKey(messageInfo);
    const statistic = this.months.get(key);
    if (statistic) {
      this.#update(statistic, messageInfo);
    } else {
      this.#add(messageInfo);
    }
  }

  #update(statistic: any, messageInfo: MessageInfo) {
    const days = statistic.days.get(messageInfo.dayInMonth);
    if (days) {
      this.#updateDay(days, messageInfo);
      this.counter.update(days.messagesNumber);
    } else {
      this.#addDay(statistic.days, messageInfo);
    }

    statistic.messagesNumber += 1;
    statistic.usersNumber.add(messageInfo.userId);
  }

  #add(messageInfo: MessageInfo) {
    const key = this.#getKey(messageInfo);
    const days = new Map();
    this.#addDay(days, messageInfo);
    this.months.set(key, {
      id: key,
      month: messageInfo.month,
      year: messageInfo.year,
      milliseconds: messageInfo.milliseconds,
      date: new Date(messageInfo.milliseconds),
      days,
      messagesNumber: 1,
      usersNumber: new Set([messageInfo.userId]),
    });
  }

  #updateDay(statistic: any, messageInfo: MessageInfo) {
    statistic.messagesNumber += 1;
    statistic.userMessageNumbers.set(
      messageInfo.userId,
      (statistic.userMessageNumbers.get(messageInfo.userId) || 0) + 1,
    );
  }

  #addDay(hashMap: any, messageInfo: MessageInfo) {
    hashMap.set(messageInfo.dayInMonth, {
      dayInMonth: messageInfo.dayInMonth,
      timestamp: messageInfo.timestamp,
      messagesNumber: 1,
      userMessageNumbers: new Map([[ messageInfo.userId, 1]]),
    });
  }

  updateTotalInfo(statisticByUsers: any) {
    this.statistic = Array.from(this.months.values())
      .map((dot: any) => {
        dot.days = Array
          .from(dot.days.values())
          .map((day: any) => {
            day.userMessageNumbers = statisticByUsers.replaceUserIdToName(day.userMessageNumbers);
            return day;
          });
        dot.usersNumber = Array.from(dot.usersNumber).length;
        return dot;
      })
      .sort((a: DataGripMonth, b: DataGripMonth) => a.milliseconds - b.milliseconds);
    this.months.clear();
  }
}
