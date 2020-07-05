import { PricingTier } from '../../enums';
import { QueryResolvers } from '../../graphql';

type Resolver = QueryResolvers['pricingTiers'];

export const resolver: Resolver = () => [
  {
    id: PricingTier.Basic,
    name: 'Silver',
    price: {
      amount: 0.99,
    },
  },
  {
    id: PricingTier.Standard,
    name: 'Gold',
    price: {
      amount: 1.99,
    },
  },
  {
    id: PricingTier.Premium,
    name: 'Platinum',
    price: {
      amount: 2.99,
    },
  },
];
