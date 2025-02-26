import { MessageInfo } from 'ts/interfaces/CommonMessage';
import { HashMap } from 'ts/interfaces/HashMap';

import DataGripByReactions from './components/reactions';
import DataGripByUser from './components/users';
import DataGripByHours from './components/hours';
import DataGripByWords from './components/words';
import DataGripByMonth from './components/months';

class DataGrip {
  users: any = new DataGripByUser();

  reactions: any = new DataGripByReactions();

  hours: HashMap<DataGripByHours> = new Map();

  hoursTotal: DataGripByHours = new DataGripByHours();

  months: HashMap<DataGripByMonth> = new Map();

  monthsTotal: DataGripByMonth = new DataGripByMonth();

  words: HashMap<DataGripByWords> = new Map();

  wordsTotal: DataGripByWords = new DataGripByWords();

  clear() {
    this.users.clear();
    this.reactions.clear();
    this.hours.clear();
    this.hoursTotal.clear();
    this.months.clear();
    this.monthsTotal.clear();
    this.words.clear();
    this.wordsTotal.clear();
  }

  addCommit(messageInfo: MessageInfo) {
    if (!messageInfo.userId) return;
    this.users.addMessage(messageInfo);
    this.reactions.addMessage(messageInfo);

    this.monthsTotal.addMessage(messageInfo);
    this.hoursTotal.addMessage(messageInfo);
    this.wordsTotal.addMessage(messageInfo);

    if (!this.words.get(messageInfo.userId)) {
      this.words.set(messageInfo.userId, new DataGripByWords());
      this.hours.set(messageInfo.userId, new DataGripByHours());
      this.months.set(messageInfo.userId, new DataGripByMonth());
    }

    this.months.get(messageInfo.userId)?.addMessage(messageInfo);
    this.words.get(messageInfo.userId)?.addMessage(messageInfo);
    this.hours.get(messageInfo.userId)?.addMessage(messageInfo);
  }

  updateTotalInfo() {
    this.users.updateTotalInfo(this.reactions);
    this.months.forEach((words) => words.updateTotalInfo(this.users));
    this.monthsTotal.updateTotalInfo(this.users);
    this.words.forEach((words) => words.updateTotalInfo());
    this.wordsTotal.updateTotalInfo();
  }
}

const dataGrip = new DataGrip();

export default dataGrip;
