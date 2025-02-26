import {
  History,
} from 'ts/interfaces/CommonMessage';

import {
  TelegramHistory,
  TelegramMessageInfo,
} from 'ts/interfaces/Telegramm';

import { ONE_DAY, ONE_WEEK } from 'ts/helpers/formatter';
import getText from './getText';

export default function Parser(history: TelegramHistory): History {
  const response: History = {
    name: history?.name || 'TelegramStat',
    messages: [],
  };

  let prevDate = new Date();
  let firstMonday = 0;

  // @ts-ignore
  response.messages = history.messages.map((message: TelegramMessageInfo) => {
    let date = new Date(message?.date);
    if (isNaN(date.getDay())) {
      date = prevDate;
    } else {
      prevDate = date;
    }

    let day = date.getDay() - 1;
    day = day < 0 ? 6 : day;

    const milliseconds = date.getTime();
    let week: number = 0;

    const monday = milliseconds - day * ONE_DAY;
    if (firstMonday) {
      week = Math.floor((firstMonday - monday) / ONE_WEEK);
    } else {
      firstMonday = monday;
    }

    return {
      date: message?.date,
      day,
      dayInMonth: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      month: date.getMonth(),
      year: date.getUTCFullYear(),
      week,
      timestamp: message?.date?.substring(0, 10),
      milliseconds: date.getTime(),

      name: message.from,
      userId: message.from_id,

      text: getText(message.text) || '',
      reactions: message.reactions,
    };
  });

  return response;
}
