const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

const scheduleGenerator = [
  {
    repeatType: 'none',
    repeatTime: 1,
    data: {start: '2020-09-13', end: '2020-09-13'}
  },


  
];

const dailySchedule = [
  {
    date: '2020-09-13',
    data: [
      { start: '4pm', end: '1h', text: 'text', studentId: 'student_1', tagId: 'tag_1' },
      { start: '6pm', end: '1h', text: 'text', studentId: 'student_2', tagId: 'tag_2' },
    ],
  },

  {
    date: '2020-09-15',
    data: [
      { start: '4pm', end: '1h', text: 'text', studentId: 'student_1' },
      { start: '6pm', end: '1h', text: 'text', studentId: 'student_2' },
    ],
  },
]; // data에도 어떤 config에서 generate 됐는지 알려주는 id가 필요함. 그래야 나중에 선택 -> 수정했을 때 넘길 수 있음

export const agendaSections = [
  {
    title: dates[0],
    data: [{ hour: '12am', duration: '1h', title: 'First Yoga' }],
  },
  {
    title: dates[1],
    data: [
      { hour: '4pm', duration: '1h', title: 'Pilates ABC' },
      { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' },
    ],
  },
  {
    title: dates[2],
    data: [
      { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
      { hour: '2pm', duration: '1h', title: 'Deep Streches' },
      { hour: '3pm', duration: '1h', title: 'Private Yoga' },
    ],
  },
  {
    title: dates[3],
    data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }],
  },
  { title: dates[4], data: [{}] },
];

function getFutureDates(days: number) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days: number) {
  return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
}
