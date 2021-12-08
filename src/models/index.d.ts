import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type FormMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserDatabaseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FormInsideTextMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Form {
  readonly id: string;
  readonly title?: string;
  readonly data: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Form, FormMetaData>);
  static copyOf(source: Form, mutator: (draft: MutableModel<Form, FormMetaData>) => MutableModel<Form, FormMetaData> | void): Form;
}

export declare class UserDatabase {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly times?: (string | null)[];
  readonly formChecked: (string | null)[];
  readonly address?: string;
  readonly bio?: string;
  readonly location?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserDatabase, UserDatabaseMetaData>);
  static copyOf(source: UserDatabase, mutator: (draft: MutableModel<UserDatabase, UserDatabaseMetaData>) => MutableModel<UserDatabase, UserDatabaseMetaData> | void): UserDatabase;
}

export declare class FormInsideText {
  readonly id: string;
  readonly title?: string;
  readonly data?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<FormInsideText, FormInsideTextMetaData>);
  static copyOf(source: FormInsideText, mutator: (draft: MutableModel<FormInsideText, FormInsideTextMetaData>) => MutableModel<FormInsideText, FormInsideTextMetaData> | void): FormInsideText;
}