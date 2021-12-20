// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, OnBoardingForm, FormItem } = initSchema(schema);

export {
  User,
  OnBoardingForm,
  FormItem
};