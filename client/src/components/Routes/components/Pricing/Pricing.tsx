import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as sentry from '@sentry/browser';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'src/components/Auth';
import { useNotification } from 'src/components/Notification';
import White from 'src/components/White';
import { paths } from 'src/constants';
import { Nullable } from 'src/core';
import useCustomerPortalSession from 'src/core/hooks/useCustomerPortalSession';
import useOMSUser from 'src/core/hooks/useOMSUser';
import { useCreateCheckoutSessionMutation } from 'src/graphql';

import { useStyles } from './Pricing.styles';

type Plan = 'basic' | 'standard' | 'premium';

interface Props {
  content: Nullable<{ [key: string]: string }>;
}

const Pricing: React.VFC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const notification = useNotification();
  const auth = useAuth();
  const user = useOMSUser();

  const { data } = useCustomerPortalSession();
  const customerPortalUrl = data?.createCustomerPortalSession.url ?? null;

  const currentPlan = user?.pricing_tier ?? null;

  const [createCheckoutSession, { loading }] =
    useCreateCheckoutSessionMutation();

  const handleCTAClick = async (desiredPlan: Plan) => {
    // is user authenticated?
    if (!auth.authenticated) {
      notification.warning(`You must sign in first.`);
      history.push(paths.login);
      return;
    }

    // does user want to manage their Donation?
    if (currentPlan != null) {
      customerPortalUrl != null && (location.href = customerPortalUrl);
      return;
    }

    // checkout only if user has never made a purchase before
    try {
      const { data } = await createCheckoutSession({
        variables: {
          input: {
            plan: desiredPlan,
          },
        },
      });

      const url = data?.createCheckoutSession.url ?? null;
      if (url == null) {
        return;
      }

      // redirect
      location.href = url;
    } catch (error: any) {
      notification.error(
        error?.message ||
          'There was an error while initiating checkout. Please try again.',
      );
      sentry.captureException(error);
    }
  };

  const model = {
    badge: 'DONATE',
    'header-p1': 'Tiers',
    description: `OMSCentral is community owned and supported by sponsors.`,
    footer: `Plans are billed monthly. Cancel anytime.`,

    option1: 'Monthly',
    option2: 'Annual (1 month free)',

    '01_class': currentPlan === 'basic' ? classes.active : undefined,
    '01_title': 'Silver',
    '01_price': '$0.99',
    '01_suffix': '/ mo',
    '01_primary-action':
      currentPlan === 'basic' ? 'Manage Donation' : 'Donate Now',
    '01_primary-action-disabled': loading,
    '01_pitch': ``,

    '02_class': currentPlan === 'standard' ? classes.active : undefined,
    '02_title': 'Gold',
    '02_price': '$1.99',
    '02_suffix': ' / mo',
    '02_primary-action':
      currentPlan === 'standard' ? 'Manage Donation' : 'Donate Now',
    '02_primary-action-disabled': loading,
    '02_pitch': ``,

    '03_class': currentPlan === 'premium' ? classes.active : undefined,
    '03_title': 'Platinum',
    '03_price': '$2.99',
    '03_suffix': ' / mo',
    '03_primary-action':
      currentPlan === 'premium' ? 'Manage Donation' : 'Donate Now',
    '03_primary-action-disabled': loading,
    '03_pitch': ``,

    ...props.content,
  };

  return (
    <Container component="main" maxWidth="xl">
      <White />
      <section className={classes.section}>
        <Container maxWidth="lg">
          <Box py={8} textAlign="center">
            <Box mb={3}>
              <Container maxWidth="md">
                <Typography variant="overline" color="textSecondary">
                  {model['badge']}
                </Typography>
                <Typography variant="h3" component="h2" gutterBottom={true}>
                  <Typography variant="h3" component="span" color="primary">
                    {model['header-p1']}
                  </Typography>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {model['description']}
                </Typography>
              </Container>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" className={model['01_class']}>
                  <CardHeader
                    title={model['01_title']}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <Box px={1}>
                      <Typography
                        variant="h3"
                        component="h2"
                        gutterBottom={true}
                      >
                        {model['01_price']}
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          component="span"
                        >
                          {model['01_suffix']}
                        </Typography>
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCTAClick('basic')}
                      disabled={model['01_primary-action-disabled']}
                    >
                      {model['01_primary-action']}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" className={model['02_class']}>
                  <CardHeader
                    title={model['02_title']}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <Box px={1}>
                      <Typography
                        variant="h3"
                        component="h2"
                        gutterBottom={true}
                      >
                        {model['02_price']}
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          component="span"
                        >
                          {model['02_suffix']}
                        </Typography>
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCTAClick('standard')}
                      disabled={model['02_primary-action-disabled']}
                    >
                      {model['02_primary-action']}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" className={model['03_class']}>
                  <CardHeader
                    title={model['03_title']}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <Box px={1}>
                      <Typography
                        variant="h3"
                        component="h2"
                        gutterBottom={true}
                      >
                        {model['03_price']}
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          component="span"
                        >
                          {model['03_suffix']}
                        </Typography>
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCTAClick('premium')}
                      disabled={model['03_primary-action-disabled']}
                    >
                      {model['03_primary-action']}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Typography variant="body2" color="textSecondary">
                {model['footer']}
              </Typography>
            </Box>
          </Box>
        </Container>
      </section>
    </Container>
  );
};

export default Pricing;
