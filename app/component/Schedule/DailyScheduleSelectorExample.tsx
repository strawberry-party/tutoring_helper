import React, { useState } from 'react';
import { Week, generateWeek } from '../../types/schedule';

import DailyScheduleSelector from './DailyScheduleSelector/index';
import dayjs from 'dayjs';
import weeklyScheduleParser from './DailyScheduleSelector/weeklyScheduleParser';

export default function DailyScheduleSelectorContainerExample({ weeklySchedule }) {
  const [startTimes, setStartTimes] = useState(
    weeklyScheduleParser(weeklySchedule).startTimes,
  );
  const [endTimes, setEndTimes] = useState(
    weeklyScheduleParser(weeklySchedule).endTimes,
  );

  const newStart = 'none';
  const newEnd = 'none';

  const onChangeStartTimes = (id: number, startTime: dayjs.Dayjs) => {
    setStartTimes(
      startTimes.map((item, index) => {
        if (id === index) return startTime;
        else return item;
      }) as Week,
    );
  };

  const onChangeEndTimes = (id: number, endTime: dayjs.Dayjs) => {
    setEndTimes(
      endTimes.map((item, index) => {
        if (id === index) return endTime;
        else return item;
      }) as Week,
    );
  };

  const setAllSameTime = () => {
    setStartTimes(generateWeek(newStart));
    setEndTimes(generateWeek(newEnd));
  };

  return (
    <DailyScheduleSelector
      onChangeEndTimes={onChangeEndTimes}
      onChangeStartTimes={onChangeStartTimes}
      endTimes={endTimes}
      startTimes={startTimes}
      setAllSameTime={setAllSameTime}
    />
  );
}
