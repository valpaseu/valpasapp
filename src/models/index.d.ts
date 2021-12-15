import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class FormItem {
  readonly name?: string;
  readonly text?: string;
  constructor(init: ModelInit<FormItem>);
}

type OnBoardingFormMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserDatabaseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class OnBoardingForm {
  readonly id: string;
  readonly title?: string;
  readonly data?: (FormItem | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<OnBoardingForm, OnBoardingFormMetaData>);
  static copyOf(source: OnBoardingForm, mutator: (draft: MutableModel<OnBoardingForm, OnBoardingFormMetaData>) => MutableModel<OnBoardingForm, OnBoardingFormMetaData> | void): OnBoardingForm;
}

export declare class UserDatabase {
  readonly id: string;
  readonly username?: string;
  readonly email?: string;
  readonly times?: (string | null)[];
  readonly formChecked: (string | null)[];
  readonly address?: string;
  readonly bio?: string;
  readonly location?: string;
  readonly name?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserDatabase, UserDatabaseMetaData>);
  static copyOf(source: UserDatabase, mutator: (draft: MutableModel<UserDatabase, UserDatabaseMetaData>) => MutableModel<UserDatabase, UserDatabaseMetaData> | void): UserDatabase;
}