import { logger, PhaseFunction } from '../components';
import { User } from '../models';

const msOneHour = 60 * 60 * 1000;

export const phase: PhaseFunction = async (app, next) => {
  setInterval(async () => {
    try {
      await User.query().patch({ pricing_tier: null });
    } catch (error) {
      logger.error('defaultUserPricingTier:', error);
    }
  }, msOneHour);

  next();
};
