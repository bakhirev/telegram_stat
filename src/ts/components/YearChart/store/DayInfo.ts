import { observable, action, makeObservable } from 'mobx';

import { DataGripDay } from 'ts/helpers/DataGrip/components/months';

class DayInfoStore {
  info: DataGripDay | null = null;

  constructor() {
    makeObservable(this, {
      info: observable,
      open: action,
      close: action,
    });
  }

  open(dayInfo: DataGripDay) {
    this.info = dayInfo;
  }

  close() {
    this.info = null;
  }
}

const dayInfoStore = new DayInfoStore();

export default dayInfoStore;
