// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TimeEntry, WorkSpaces, User, OnBoardingForm, UserSettings, CostRate, UserMemberships, HourlyRate, TimeInterval, WorkspaceSettings, Membership, FormItem } = initSchema(schema);

export {
  TimeEntry,
  WorkSpaces,
  User,
  OnBoardingForm,
  UserSettings,
  CostRate,
  UserMemberships,
  HourlyRate,
  TimeInterval,
  WorkspaceSettings,
  Membership,
  FormItem
};