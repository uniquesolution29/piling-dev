import { Router } from 'express';
import { version } from '../../package.json';

import pixel from './pixel';
// import pixel from 'api/pixel';

export default () => {
  const api = Router();

  api.use('/pixels', pixel);
  
  api.get('/', (req, res) => {
    res.json(version);
  });

  return api;
}