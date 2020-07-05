import { badRequest } from '@hapi/boom';
import { isEmpty, map } from 'lodash';

import { searchReviews as search } from '../../functions';
import { QueryResolvers } from '../../graphql';
import { mapReview } from '../../mappers';
import { Review } from '../../models';

type Resolver = QueryResolvers['reviews'];

export const resolver: Resolver = async (
  _,
  {
    query,
    offset,
    limit,
    is_mine,
    course_ids,
    semester_ids,
    difficulties,
    ratings,
    order_by_desc,
  },
  { user },
) => {
  if (limit > 10) {
    throw badRequest();
  }

  const qb = Review.eagerQuery();

  order_by_desc.forEach((column) => qb.orderBy(column, 'desc'));

  if (!isEmpty(query)) {
    const ids = await search({ query, offset, limit, sort: order_by_desc });
    qb.whereIn('id', ids);
  } else {
    is_mine && user != null && qb.where('author_id', user.id);
    qb.offset(offset).limit(limit);

    course_ids.length && qb.whereIn('course_id', course_ids);
    semester_ids.length && qb.whereIn('semester_id', semester_ids);
    difficulties.length && qb.whereIn('difficulty', difficulties);
    ratings.length && qb.whereIn('rating', ratings);
  }

  return map(await qb, (review) => mapReview(review, user));
};
