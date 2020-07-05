import Knex from 'knex';

import { Course } from '../../src/models';
import { courses } from '../data';

exports.up = async (knex: Knex) => {
  await Course.query(knex).upsertGraph(courses, { insertMissing: true });
};

exports.down = async (knex: Knex) => {
  await Course.query(knex).delete();
};
