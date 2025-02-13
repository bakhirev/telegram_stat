import { action, makeObservable, observable } from 'mobx';

import dataGrip from 'ts/helpers/DataGrip';

import { applicationHasCustom } from 'ts/helpers/RPC';

// import userSettingsStore from './UserSettings';
import viewNameStore, { ViewNameEnum } from './ViewName';
import { History, MessageInfo } from 'ts/interfaces/Telegramm';

class DataGripStore {
  commits: any[] = [];

  dataGrip: any = null;

  hash: number = 0;

  isDepersonalized: boolean = false;

  constructor() {
    makeObservable(this, {
      dataGrip: observable,
      hash: observable,
      isDepersonalized: observable,
      asyncSetCommits: action,
      depersonalized: action,
      updateStatistic: action,
      exit: action,
    });
  }

  asyncSetCommits(json?: History) {
    if (!json || !json?.messages?.length) return;
    json?.messages?.forEach((messageInfo: MessageInfo) => {
      dataGrip.addCommit(messageInfo);
    });

    dataGrip.updateTotalInfo();

    viewNameStore.toggle(ViewNameEnum.INFO);
    this.#updateRender();

    console.dir(this.dataGrip);
    if (!applicationHasCustom.title) {
      document.title = json?.name;
    }
  }

  depersonalized(status?: boolean) {
    this.isDepersonalized = !!status;
    setTimeout(() => {
      this.updateStatistic();
    }, 100);
  }

  updateStatistic() {
    this.#updateRender();
  }

  #updateRender() {
    this.dataGrip = null;
    this.dataGrip = dataGrip;
    this.hash = Math.random();
  }

  exit() {
    dataGrip.clear();
    this.commits = [];
    this.#updateRender();
  }
}

const dataGripStore = new DataGripStore();

export default dataGripStore;
