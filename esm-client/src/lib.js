import dayjs from 'dayjs';

export const parseDate = (timestamp) => dayjs.unix(timestamp).format('ss mm HH DD/MM/YYYY');
