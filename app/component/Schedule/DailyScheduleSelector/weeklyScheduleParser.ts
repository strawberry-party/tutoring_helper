import {
  WeeklyScheduleFormVersion,
  WeeklyScheduleType,
  nones,
} from './../../../types/schedule';

export default function weeklyScheduleParser(
  weeklySchedule: WeeklyScheduleType,
): WeeklyScheduleFormVersion {
  var startTimes = nones;
  var endTimes = nones;

  for (let i = 0; i < 7; i++) {
    let iThSchedule = weeklySchedule[i.toString()];
    if (iThSchedule) {
      startTimes[i] = iThSchedule.start;
      endTimes[i] = iThSchedule.end;
    }
  }
  return new WeeklyScheduleFormVersion(startTimes, endTimes);
}
