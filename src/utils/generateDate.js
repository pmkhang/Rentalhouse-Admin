import moment from 'moment';

const formatDate = (timeObj) => {
  const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const day = dayNames[timeObj.getDay()];
  const date = moment(timeObj).format('DD/MM/YYYY');
  const time = moment(timeObj).format('HH:mm');

  return `${day}, ${time} ${date}`;
};

const generateDate = () => {
  const gapExpire = Math.floor(Math.random() * 29) + 1;
  const today = new Date();
  const dateExpire = moment(today).add(gapExpire, 'd').toDate();
  return {
    today: formatDate(today),
    expireDay: formatDate(dateExpire),
  };
};

export default generateDate;
