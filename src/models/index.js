// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Form, UserDatabase, FormInsideText } = initSchema(schema);

export {
  Form,
  UserDatabase,
  FormInsideText
};