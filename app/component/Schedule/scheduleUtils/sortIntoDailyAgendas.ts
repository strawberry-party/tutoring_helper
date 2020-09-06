import { DailyAgendasType, ScheduleType } from '../../../types/schedule';

import dayjs from 'dayjs';

const formatString = 'YYYY-MM-DD';

/// ScheduleType들을 DailyAgendaType (일간 일정) 으로 정리하는 함수
export default function sortIntoDailyAgendas(
  schedules: ScheduleType[],
): DailyAgendasType[] {
  var dailyAgendas: DailyAgendasType[] = [];
  var dateToIndexMap: Map<string, number> = new Map<string, number>();

  schedules.forEach((schedule: ScheduleType) => {
    var startPoint = schedule.time.start.format(formatString);
    if (dateToIndexMap.has(startPoint)) {
      var index: number = dateToIndexMap.get(startPoint);
      dailyAgendas[index].data.push(schedule);
    } else {
      dateToIndexMap.set(startPoint, dailyAgendas.length);
      dailyAgendas.push({ title: startPoint, data: [schedule] });
    }
  });
  return dailyAgendas;
}

