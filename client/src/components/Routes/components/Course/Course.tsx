import React from 'react';
import Metrics from 'src/components/Metrics';
import ReviewCardListConnected from 'src/components/ReviewCardListConnected';
import { Course as GQLCourse } from 'src/graphql';

interface Props {
  course: GQLCourse;
}

const Course: React.VFC<Props> = ({ course }) => {
  return (
    <ReviewCardListConnected
      variables={{ course_ids: [course.id] }}
      before={<Metrics course={course} />}
    />
  );
};

export default Course;
