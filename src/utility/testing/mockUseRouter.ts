import * as nextRouter from 'next/router';

export type MockUseRouterParams = Partial<nextRouter.NextRouter>;
export type MockRouterActions = {
  push: jest.Mock<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  replace: jest.Mock<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  reload: jest.Mock<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  back: jest.Mock<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  prefetch: jest.Mock<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};
export const mockUseRouter = ({
  route = '',
  pathname = '',
  query = {},
  asPath = '',
  basePath = '',
  locale = '',
  locales = [],
  defaultLocale = '',
}: MockUseRouterParams): MockRouterActions => {
  const actions = {
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  };

  (nextRouter.useRouter as jest.Mock) = jest.fn(() => ({
    route,
    pathname,
    query,
    asPath,
    basePath,
    locale,
    locales,
    defaultLocale,
    ...actions,
  }));

  return actions;
};
