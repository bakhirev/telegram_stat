import { MessageInfo } from 'ts/interfaces/Telegramm';

import DataGripByUser from './components/users';

class DataGrip {
  users: any = new DataGripByUser();

  clear() {
    this.users.clear();
  }

  addCommit(messageInfo: MessageInfo) {
    if (!messageInfo.from_id) return;
    this.users.addCommit(messageInfo);
  }

  updateTotalInfo() {
    this.users.updateTotalInfo();
  }
}

const dataGrip = new DataGrip();

export default dataGrip;
