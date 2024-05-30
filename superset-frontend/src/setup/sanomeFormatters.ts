import { NumberFormatter } from '@superset-ui/core';

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

export { sanomeMemoriFormatter };
