import React from 'react';
import { Helmet } from 'react-helmet';
import { paths } from 'src/constants';
import useCustomerPortalSession from 'src/core/hooks/useCustomerPortalSession';

import UserSubscription from './UserSubscription';

const UserSubscriptionContainer: React.FC = () => {
  const { loading, data, error } = useCustomerPortalSession(paths.landing);

  return (
    <>
      <Helmet title="My Donations">
        <meta name="description" content="User donations settings." />
      </Helmet>
      <UserSubscription
        loading={loading}
        session={data?.createCustomerPortalSession}
        error={!!error}
      />
    </>
  );
};

export default UserSubscriptionContainer;
