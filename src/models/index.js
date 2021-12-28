// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, OnBoardingForm, Notifications, TimeEntries, TimeInterval, FormItem, CustomValue } = initSchema(schema);

export {
  User,
  OnBoardingForm,
  Notifications,
  TimeEntries,
  TimeInterval,
  FormItem,
  CustomValue
};