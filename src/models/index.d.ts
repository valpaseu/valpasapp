import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TestMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserReadChekerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FormInsideTextMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FormTextMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FormTitleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Test {
  readonly id: string;
  readonly title?: string;
  readonly data?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Test, TestMetaData>);
  static copyOf(source: Test, mutator: (draft: MutableModel<Test, TestMetaData>) => MutableModel<Test, TestMetaData> | void): Test;
}

export declare class UserReadCheker {
  readonly id: string;
  readonly UserEmail?: string;
  readonly FormTitle?: string;
  readonly FormText?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserReadCheker, UserReadChekerMetaData>);
  static copyOf(source: UserReadCheker, mutator: (draft: MutableModel<UserReadCheker, UserReadChekerMetaData>) => MutableModel<UserReadCheker, UserReadChekerMetaData> | void): UserReadCheker;
}

export declare class FormInsideText {
  readonly id: string;
  readonly FormTitle?: string;
  readonly FormText?: string;
  readonly FormTextInside?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<FormInsideText, FormInsideTextMetaData>);
  static copyOf(source: FormInsideText, mutator: (draft: MutableModel<FormInsideText, FormInsideTextMetaData>) => MutableModel<FormInsideText, FormInsideTextMetaData> | void): FormInsideText;
}

export declare class FormText {
  readonly id: string;
  readonly FormTitle?: string;
  readonly FormText?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<FormText, FormTextMetaData>);
  static copyOf(source: FormText, mutator: (draft: MutableModel<FormText, FormTextMetaData>) => MutableModel<FormText, FormTextMetaData> | void): FormText;
}

export declare class FormTitle {
  readonly id: string;
  readonly FormTitle?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<FormTitle, FormTitleMetaData>);
  static copyOf(source: FormTitle, mutator: (draft: MutableModel<FormTitle, FormTitleMetaData>) => MutableModel<FormTitle, FormTitleMetaData> | void): FormTitle;
}