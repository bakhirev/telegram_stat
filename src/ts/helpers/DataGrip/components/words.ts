import { MessageInfo } from 'ts/interfaces/CommonMessage';

export default class DataGripByWords {
  statistic: any = new Map();

  clear() {
    this.statistic = new Map();
  }

  addMessage(messageInfo: MessageInfo) {
    messageInfo?.text?.split(' ')?.forEach((word: string) => {
      if (word && word?.length > 3) this.statistic.set(
        word,
        (this.statistic.get(word) || 0) + 1,
      );
    });
  }

  updateTotalInfo() {
    const list = Array.from(this.statistic.entries());
    list.sort((a: any, b: any) => b[1] - a[1]);
    this.statistic = list.slice(0, 40);
  }
}
