import { define, extend, derive } from 'cooky-cutter';

// local imports
import { FrontmatterErrorType } from 'src/enums';
import { FrontmatterError } from 'src/models';

export const frontmatterErrorInvalidYAML = define<FrontmatterError>({
  type: () => FrontmatterErrorType.InvalidYAML,
  property: undefined,
  message: (i: number) => `Error message ${i}`,
  filepath: (i: number) => `/test/article-${i}`,
});

export const frontmatterErrorInvalidAttribute = extend<
  FrontmatterError,
  FrontmatterError
>(frontmatterErrorInvalidYAML, {
  type: () => FrontmatterErrorType.InvalidAttribute,
  property: (i: number) => `attribute-${i}`,
  message: `not allowed`,
});

export const frontmatterErrorInvalidAttributeOrder = extend<
  FrontmatterError,
  FrontmatterError
>(frontmatterErrorInvalidYAML, {
  type: () => FrontmatterErrorType.InvalidAttributeOrder,
  property: `keys`,
  message: `Keys must be in order`,
});

export const frontmatterErrorInvalidSchema = extend<
  FrontmatterError,
  FrontmatterError
>(frontmatterErrorInvalidYAML, {
  type: () => FrontmatterErrorType.InvalidSchema,
  property: (i: number) => `attribute-${i}`,
  message: derive<FrontmatterError, string>(
    ({ property }) => `Error with attribute '${property}'`,
    'property'
  ),
});
