import { MessageInfo } from 'ts/interfaces/Telegramm';

import DataGripByReactions from './components/reactions';
import DataGripByUser from './components/users';

class DataGrip {
  users: any = new DataGripByUser();

  reactions: any = new DataGripByReactions();

  clear() {
    this.users.clear();
    this.reactions.clear();
  }

  addCommit(messageInfo: MessageInfo) {
    if (!messageInfo.from_id) return;
    this.users.addMessage(messageInfo);
    this.reactions.addMessage(messageInfo);
  }

  updateTotalInfo() {
    this.users.updateTotalInfo(this.reactions);
  }
}

const dataGrip = new DataGrip();

export default dataGrip;
