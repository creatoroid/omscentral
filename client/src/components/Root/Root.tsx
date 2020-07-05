import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { Helmet } from 'react-helmet';

import Apollo from '../Apollo';
import App from '../App';
import Auth from '../Auth';
import Firebase from '../Firebase';
import Sentry from '../Sentry';
import Theme from '../Theme';

const Root: React.FC = () => (
  <CssBaseline>
    <Theme>
      <Helmet titleTemplate="%s | OMSCentral" defaultTitle="OMSCentral" />
      <Apollo>
        <Firebase>
          <Auth>
            <Sentry />
            <App />
          </Auth>
        </Firebase>
      </Apollo>
    </Theme>
  </CssBaseline>
);

export default Root;
