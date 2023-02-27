import moment from 'moment';
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';

export const calculateDifference = (dateStart: string, dateEnd: string) => {
  const start = moment(dateStart);
  const end = moment(dateEnd);

  const difference = end.diff(start);

  let timeFrame: any = moment.duration(difference);
  let time = ''

  if(timeFrame._data.years) {
    time += timeFrame._data.years === 1 ? '1 Year' : `${timeFrame._data.years} Years`
  }

  if(timeFrame._data.months) {
    time += timeFrame._data.months === 1 ? ' 1 Month' : ` ${timeFrame._data.months} Months`
  }

  if(timeFrame._data.days) {
    time += timeFrame._data.days === 1 ? ' 1 Day' : ` ${timeFrame._data.days} Days`
  }

  return time ? time : '-';
};

export const sortAlphabetically = (payload: ExtendSelectList[]): ExtendSelectList[] => {
  return payload.sort((a, b) => {
    const nameA = a.label;
    const nameB = b.label;
    if (nameA < nameB) {
      return -1
    } else if (nameA > nameB) {
      return 1
    } else {
      return 0
    }
  })
}

export const checkErrors = (payload: any) => {
  let noError = true
  if(typeof payload === 'object' && payload !== null) {
    for(const [_, value] of Object.entries(payload)){
      if(value !== '') {
        noError = false
        break;
      }
    }
  }
  return noError
}

export const calculateAge = (payload: string) => {
  const start = moment(payload);
  const now = moment()

  const difference = now.diff(start);

  let timeFrame: any = moment.duration(difference);
  let time = ''

  if(timeFrame._data.years) {
    time += timeFrame._data.years === 1 ? '1 Year' : `${timeFrame._data.years} Years`
  }

  return time ? time : '-';
}

export const calculateDiffAge = (payload: {start: string, end: string}) => {
  const start = moment(payload.start);
  const end = moment(payload.end)

  const difference = end.diff(start);

  let timeFrame: any = moment.duration(difference);
  let time = ''

  if(timeFrame._data.years) {
    time += timeFrame._data.years === 1 ? '1 Year' : `${timeFrame._data.years} Years`
  }

  return time ? time : '1 Month';
}

export const calculateExperience = (payload: string) => {
  const start = moment(payload);
  const now = moment()

  const difference = now.diff(start);

  let timeFrame: any = moment.duration(difference);
  let time = ''

  if(timeFrame._data.years) {
    time += timeFrame._data.years === 1 ? '1 Year' : `${timeFrame._data.years} Years`
  }

  if(timeFrame._data.months) {
    time += timeFrame._data.months === 1 ? ' 1 Month' : ` ${timeFrame._data.months} Months`
  }

  return time ? time : '-';
}
