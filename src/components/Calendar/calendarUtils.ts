type NormalizedDate = Record<
  number | string,
  Record<number | string, string[]>
>;
const normalizeDate = (dates: string[]): NormalizedDate => {
  const result: NormalizedDate = {};

  dates.forEach((date) => {
    const [year, month, day] = date.split("-");

    if (result[year]) {
      if (result[year][month]) {
        result[year][month] = [...result[year][month], day];
      } else {
        result[year] = {
          ...result[year],
          [month]: [day],
        };
      }
    } else {
      result[year] = {
        [month]: [day],
      };
    }
  });

  return result;
};

export type { NormalizedDate };
export { normalizeDate };
