import { MessageInfo } from 'ts/interfaces/CommonMessage';

export default class DataGripByHours {
  statistic: any = this.#getArrayByDayAndHour();

  clear() {
    this.statistic = this.#getArrayByDayAndHour();
  }

  addMessage(messageInfo: MessageInfo) {
    this.statistic[messageInfo.day][messageInfo.hours] += 1;
  }

  #getArrayByDayAndHour() {
    return (new Array(7)).fill(1).map(() => (new Array(24)).fill(0));
  }
}
