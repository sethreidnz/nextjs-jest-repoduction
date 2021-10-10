import { FrontmatterErrorType } from "src/enums";

export type Frontmatter = {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type FrontmatterError = {
  type: FrontmatterErrorType;
  reason?: string;
  property?: string;
  message: string;
  filepath: string;
};

export type FrontmatterResult = {
  content: string;
  data: { [key: string]: string };
  errors: FrontmatterError[];
};
