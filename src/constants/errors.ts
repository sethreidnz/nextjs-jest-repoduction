import { ErrorCode } from 'src/enums';

export const ERRORS = {
  genericError: 'Sorry something went wrong',
};

export const ERROR_CODE_MAPPING = {
  [`ENOENT`]: ErrorCode.FileNotFound,
};
