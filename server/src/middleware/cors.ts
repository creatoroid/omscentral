import cors from 'cors';
import { Request, RequestHandler } from 'express';

import { logger, pp } from '../components';
import { appConfig, corsConfig } from '../config';
import { isGooglebot } from '../utils';

const isTrusted = (req: Request): boolean => {
  const { origin } = req.headers;
  const { allowlist } = corsConfig;

  return !allowlist.length || (!!origin && allowlist.includes(origin));
};

export const middleware = (): RequestHandler =>
  cors(async (req, cb) => {
    const { headers } = req;

    if (
      appConfig.environment === 'local' ||
      req.method === 'OPTIONS' ||
      isTrusted(req) ||
      (await isGooglebot(req)) ||
      (await pp.isWebhook(req))
    ) {
      return cb(null, { origin: true });
    }

    logger.debug('middleware(cors):', { origin: headers['origin'] });

    return cb(new Error('CORS'), { origin: false });
  });
