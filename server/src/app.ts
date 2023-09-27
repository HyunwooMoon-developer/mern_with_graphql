import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import connectDB from './utils/connectDB';
import schema from './schema/schema';

dotenv.config;

const port = 5000;

const app: Application = express();

connectDB();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
