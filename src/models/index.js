// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, TimeEntries, OnBoardingForm, CustomValue, TimeInterval, FormItem } = initSchema(schema);

export {
  User,
  TimeEntries,
  OnBoardingForm,
  CustomValue,
  TimeInterval,
  FormItem
};