import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class UserSettings {
  readonly timeFormat?: string;
  readonly timeZone?: string;
  readonly dateFormat?: string;
  constructor(init: ModelInit<UserSettings>);
}

export declare class CostRate {
  readonly amount?: number;
  readonly currency?: string;
  constructor(init: ModelInit<CostRate>);
}

export declare class UserMemberships {
  readonly hourlyRate?: HourlyRate;
  readonly costRate?: CostRate;
  readonly membershipType?: string;
  readonly userId?: string;
  constructor(init: ModelInit<UserMemberships>);
}

export declare class HourlyRate {
  readonly amount?: string;
  readonly currency?: string;
  constructor(init: ModelInit<HourlyRate>);
}

export declare class TimeInterval {
  readonly duration?: string;
  readonly end?: string;
  readonly start?: string;
  constructor(init: ModelInit<TimeInterval>);
}

export declare class WorkspaceSettings {
  readonly shortBreak?: number;
  readonly dinnerBreak?: number;
  constructor(init: ModelInit<WorkspaceSettings>);
}

export declare class Membership {
  readonly NewField?: string;
  readonly hourlyRate?: HourlyRate;
  readonly membershipType?: string;
  readonly membershipStatus?: string;
  readonly userId?: string;
  constructor(init: ModelInit<Membership>);
}

export declare class FormItem {
  readonly name?: string;
  readonly text?: string;
  constructor(init: ModelInit<FormItem>);
}

type TimeEntryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WorkSpacesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OnBoardingFormMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TimeEntry {
  readonly id: string;
  readonly billable?: boolean;
  readonly description?: string;
  readonly userId?: string;
  readonly workspaceId?: string;
  readonly timeInterval?: TimeInterval;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TimeEntry, TimeEntryMetaData>);
  static copyOf(source: TimeEntry, mutator: (draft: MutableModel<TimeEntry, TimeEntryMetaData>) => MutableModel<TimeEntry, TimeEntryMetaData> | void): TimeEntry;
}

export declare class WorkSpaces {
  readonly id: string;
  readonly hourlyRate?: HourlyRate;
  readonly imageUrl?: string;
  readonly memberships?: (Membership | null)[];
  readonly name?: string;
  readonly workspaceSettings?: WorkspaceSettings;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<WorkSpaces, WorkSpacesMetaData>);
  static copyOf(source: WorkSpaces, mutator: (draft: MutableModel<WorkSpaces, WorkSpacesMetaData>) => MutableModel<WorkSpaces, WorkSpacesMetaData> | void): WorkSpaces;
}

export declare class User {
  readonly id: string;
  readonly username?: string;
  readonly formChecked: (string | null)[];
  readonly email?: string;
  readonly memberships?: (UserMemberships | null)[];
  readonly name?: string;
  readonly activeWorkspace?: string;
  readonly profilePicture?: string;
  readonly settings?: UserSettings;
  readonly status?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
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