import { QueryBuilder } from 'objection';

import { Maybe } from '../graphql';
import { CourseMetric } from './CourseMetric';
import { Domain } from './Domain';

export class Course extends Domain {
  id!: string;
  department!: string;
  number!: string;
  name!: string;
  aliases!: string[];
  foundational!: boolean;
  deprecated!: boolean;
  link!: Maybe<string>;

  metric!: Maybe<CourseMetric>;

  static tableName = 'omscentral_course';

  static jsonAttributes = ['aliases'];

  static relationMappings = {
    metric: {
      relation: Domain.HasOneRelation,
      modelClass: CourseMetric,
      join: {
        from: `${Course.tableName}.id`,
        to: `${CourseMetric.tableName}.course_id`,
      },
    },
  };

  static jsonSchema = {
    type: 'object',
    required: [
      'id',
      'department',
      'number',
      'name',
      'foundational',
      'deprecated',
    ],
    properties: {
      id: { type: 'string' },
      department: { type: 'string' },
      number: { type: 'string' },
      name: { type: 'string' },
      aliases: { type: 'array', items: { type: 'string' } },
      foundational: { type: 'boolean' },
      deprecated: { type: 'boolean' },
      link: { type: ['string', 'null'] },
      metric: CourseMetric.jsonSchema,
    },
  };

  static eagerQuery = (): QueryBuilder<Course> =>
    Course.query().withGraphFetched('[metric]');
}
