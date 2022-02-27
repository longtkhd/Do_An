import { set } from 'lodash';

export const toFiltersDB = (filterOptions) => {
  const where = {};
  filterOptions.forEach((option) => {
    const { columnId, value, type } = option;
    if (
      typeof value !== 'undefined' ||
      (Array.isArray(value) && value.length > 0)
    ) {
      if (type) {
        const { operator, transform } = type;
        if (transform && operator) {
          const path = `${columnId}.${operator}`;
          const actualValue = transform(value);
          set(where, path, actualValue);
        }
      } else {
        const path = `${columnId}`;
        set(where, path, value);
      }
    }
  });
  return where;
};

export const toSortsDB = (sortOptions) => {
  const SQSort = {
    descend: 'desc',
    ascend: 'asc',
  };
  return sortOptions.map((option) => [option.sort, SQSort[option.order]]);
};
