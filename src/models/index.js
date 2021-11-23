// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Test, UserReadCheker, FormInsideText, FormText, FormTitle } = initSchema(schema);

export {
  Test,
  UserReadCheker,
  FormInsideText,
  FormText,
  FormTitle
};