import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class CustomValue {
  readonly customID?: string;
  readonly value?: string;
  readonly name?: string;
  readonly type?: string;
  constructor(init: ModelInit<CustomValue>);
}

export declare class TimeInterval {
  readonly duration?: string;
  readonly end?: string;
  readonly start?: string;
  constructor(init: ModelInit<TimeInterval>);
}

export declare class FormItem {
  readonly name?: string;
  readonly text?: string;
  constructor(init: ModelInit<FormItem>);
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TimeEntriesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OnBoardingFormMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly username?: string;
  readonly formChecked: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class TimeEntries {
  readonly id: string;
  readonly billable?: boolean;
  readonly projectID?: string;
  readonly timeInterval?: TimeInterval;
  readonly userID?: string;
  readonly workID?: string;
  readonly customValues?: (CustomValue | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TimeEntries, TimeEntriesMetaData>);
  static copyOf(source: TimeEntries, mutator: (draft: MutableModel<TimeEntries, TimeEntriesMetaData>) => MutableModel<TimeEntries, TimeEntriesMetaData> | void): TimeEntries;
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