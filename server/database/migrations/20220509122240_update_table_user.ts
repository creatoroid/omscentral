import Knex from 'knex';

import { PricingTier } from '../../src/enums';
import { User } from '../../src/models';
import { addColumn, dropColumn } from '../utils';

exports.up = async (knex: Knex) => {
  await dropColumn(knex, User.tableName, 'pricing_tier');
  await addColumn(knex, User.tableName, 'pricing_tier', (tb) => {
    tb.enu('pricing_tier', Object.values(PricingTier))
      .nullable()
      .defaultTo(PricingTier.Premium);
  });
};

exports.down = async (knex: Knex) => {
  await dropColumn(knex, User.tableName, 'pricing_tier');
  await addColumn(knex, User.tableName, 'pricing_tier', (tb) => {
    tb.enu('pricing_tier', Object.values(PricingTier)).nullable();
  });
};
