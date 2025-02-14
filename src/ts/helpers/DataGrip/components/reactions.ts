import { HashMap } from 'ts/interfaces/HashMap';
import { MessageInfo, ReactionAuthor, ReactionInfo } from 'ts/interfaces/Telegramm';

export default class DataGripByReactions {
  users: HashMap<any> = new Map();

  clear() {
    this.users.clear();
  }

  addMessage(messageInfo: MessageInfo) {
    const reactions = messageInfo?.reactions;
    if (!reactions?.length) return;

    const author = this.#getUserInfo(messageInfo.from_id);

    reactions.forEach((reaction: ReactionInfo) => {
      author.receivedTotal += reaction.count;

      reaction?.recent?.forEach((recent: ReactionAuthor) => {
        const user = this.#getUserInfo(recent.from_id);
        user.giveTotal += 1;

        const toUser = (user.give.get(messageInfo.from_id) || 0) + 1;
        user.give.set(messageInfo.from_id, toUser);

        const fromUser = (author.received.get(recent.from_id) || 0) + 1;
        author.received.set(recent.from_id, fromUser);
      });
    });
  }

  #getUserInfo(id: string) {
    let statistic = this.users.get(id);
    if (statistic) return statistic;

    statistic = {
      id,
      giveTotal: 0,
      receivedTotal: 0,
      give: new Map(),
      received: new Map(),
    };
    this.users.set(id, statistic);

    return statistic;
  }
}
