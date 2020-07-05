import { Request } from 'express';

import { appConfig, stripeConfig } from '../../config';
import { logger } from '../logger';
import { PaymentProcessor } from './PaymentProcessor';

export const isWebhook = async (req: Request): Promise<boolean> => {
  try {
    const payload = req.body;
    const signature = req.headers['stripe-signature'] as any;
    const secret = stripeConfig.endpointSecret;
    await PaymentProcessor.stripe.webhooks.constructEventAsync(
      payload,
      signature,
      secret,
    );
    return true;
  } catch (error) {
    if (appConfig.environment === 'local') {
      console.log(error); // eslint-disable-line no-console
    }
    logger.error('pp.isWebhook:', error);
    return false;
  }
};
