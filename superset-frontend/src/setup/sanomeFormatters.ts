import { format } from 'date-fns';

import { NumberFormatter, TimeFormatter } from '@superset-ui/core';

const memoriFormatFunc = (value: number | null | undefined): string => {
  if (value === null || value === undefined) {
    console.warn("sanomeMemoriFormatter: value is null or undefined");
    return '';
  }
  switch (value) {
    case 1:
      return 'Low';
    case 2:
      return 'Moderate';
    case 3:
      return 'High';
    case 4:
      return 'Critical';
    default:
      console.warn(`sanomeMemoriFormatter: value ${value} is outside expected range`);
      return '';
  }
};

const sanomeMemoriFormatter = new NumberFormatter(
  {
    id: 'sanome_memori_formatter',
    label: 'Sanome MEMORI',
    description: 'Converts numeric risk categories into verbal risk categories',
    formatFunc: memoriFormatFunc,
  }
)


const localTimeFormatFunc = (value: Date): string => {
  // The `format` function from `date-fns` automatically uses local time.
  return format(value, 'dd MMM yyyy HH:mm');
}


const sanomeLocalTimeFormatter = new TimeFormatter(
  {
    id: 'sanome_local_time_formatter',
    label: 'Sanome local time',
    description: 'Converts timestamps into current local time',
    formatFunc: localTimeFormatFunc,
  }
)


export { sanomeMemoriFormatter, sanomeLocalTimeFormatter };
