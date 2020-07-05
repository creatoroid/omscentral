import React from 'react';
import Helmet from 'react-helmet';

import Pricing from './Pricing';

const PricingContainer: React.VFC = () => (
  <>
    <Helmet title="Donate">
      <meta name="description" content="Donation options for omscentral.com." />
    </Helmet>
    <Pricing content={null} />
  </>
);

export default PricingContainer;
