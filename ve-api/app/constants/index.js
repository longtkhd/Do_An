export const REGEX_PASSWORD = /^[A-Za-z0-9]{6,255}$/;

export const VALIDATOR = {
  PAGE_NULL: 'Page must not be null',
  PAGE_GREATER_ONE: 'Page must be greater than or equal to 1',
  USER_NAME_NULL: 'Username or Email is required',
  PASSWORD_NULL: 'Password is required',
  EMAIL_NULL: 'Email must be required',
  REFRESH_TOKEN_NULL: 'Refresh token is required',
  MUST_CONTAIN_ALPHA_NUMERIC: 'Field must contain alpha & numeric',
  EMAIL_INVALID: 'Email is invalid',
  USER_IDS_NULL: 'Missing delete array user',
  PASSWORD_INVALID:
    'Password has minimum 6 characters, maximum 255 characters, contains letter or number',
  EXTRA_DATA_NOT_IN_AVAILABLE_SET: 'Extra data not in available set',
  ROLE_NOT_EXIST: 'Role not exist',
  ROLE_IDS_NULL: 'ROLE_IDS_NULL',
  CATEGORY_IDS_NULL: 'CATEGORY_IDS_NULL',
  TAG_IDS_NULL: 'TAG_IDS_NULL',
  IMAGE_IDS_NULL: 'IMAGE_IDS_NULL',
  ERROR_FILE_EXTENSION: 'ERROR_FILE_EXTENSION',
  CODE_REQUIRED: 'CODE_REQUIRED',
  MUST_BE_BOOLEAN_TYPE: (name) => `${name} must be boolean type`,
  MUST_BE_ARRAY_TYPE: (name) => `${name} must be array type`,
  MUST_BE_ARRAY: (name) => `${name} must be array`,
  MUST_BE_INTEGER: (name) => `${name} must be integer`,
  MUST_BE_URL: (name) => `${name} must be URL`,
  MIN_MAX_LENGTH: (min, max) => {
    return `Min length: ${min} - Max length: ${max}`;
  },
  FIELD_REQUIRED: (name) => {
    return `${name} must be required`;
  },
  FIELD_IS_BOOLEAN: (name) => {
    return `${name} must be is boolean`;
  },
  FIELD_IS_ONE_OF: (list) => {
    return `Must be one of value: ${list.join(',')}`;
  },
  MENU_TYPE_NOT_IN_AVAILABLE_SET: 'Menu type not in available set',
};

export const TYPE_QUERY = {
  LIKE: {
    operator: '$like',
    transform: (value) => {
      return `%${value}%`;
    },
  },
  IN: {
    operator: '$in',
    transform: (value) => {
      return value.split(',').filter((item) => item !== '');
    },
  },
  BETWEEN: {
    operator: '$between',
    transform: (value) => {
      const values = value.split(',').filter((item) => item !== '');
      if (values.length === 2) {
        return values.map((x) => +x);
      }
    },
  },
  AND: {
    operator: '$and',
    transform: (value, column) => {
      const values = value.split(',').filter((item) => item !== '');
      return values.map((x) => {
        return {
          [column]: x,
        };
      });
    },
  },
};
