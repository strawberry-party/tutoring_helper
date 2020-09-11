import { DailyAgendasType, ScheduleType } from '../../../types/schedule';

import _ from 'lodash';
import dayjs from 'dayjs';

const formatString = 'YYYY-MM-DD';
// const hourMinuteFormatString = 'HH:mm'

/// ScheduleType들을 DailyAgendaType (일간 일정) 으로 정리하는 함수
export default function sortIntoDailyAgendas(
  schedules: ScheduleType[],
): DailyAgendasType[] {
  var dailyAgendas: DailyAgendasType[] = [];
  var dateToIndexMap: Map<string, number> = new Map<string, number>();
  schedules.forEach((schedule: ScheduleType) => {
    var startPoint = schedule.time.start.format(formatString);
    // var detailTime = schedule.time.start.format(hourMinuteFormatString);
    if (dateToIndexMap.has(startPoint)) {
      var index: number = dateToIndexMap.get(startPoint);
      dailyAgendas[index].data.push(schedule);
      dailyAgendas[index].data = _.sortBy(dailyAgendas[index].data, [
        function (schedule) {
          return schedule.time.start;
        },
      ]);
    } else {
      dateToIndexMap.set(startPoint, dailyAgendas.length);
      dailyAgendas.push({ title: startPoint, data: [schedule] });
    }
  });

  return _.sortBy(dailyAgendas, ['title']);
}
