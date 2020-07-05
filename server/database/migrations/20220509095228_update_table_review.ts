import Knex from 'knex';

import { Review } from '../../src/models';
import { addColumn, dropColumn } from '../utils';

exports.up = async (knex: Knex) => {
  await addColumn(knex, Review.tableName, 'deleted', (tb) => {
    tb.bigInteger('deleted').nullable().index();
  });
};

exports.down = async (knex: Knex) => {
  await dropColumn(knex, Review.tableName, 'deleted');
};
