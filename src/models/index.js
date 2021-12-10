// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { OnBoardingForm, UserDatabase, FormItem } = initSchema(schema);

export {
  OnBoardingForm,
  UserDatabase,
  FormItem
};