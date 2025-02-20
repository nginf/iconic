import { Fetcher } from '../../common/src/public-api';
import { AD_REGISTRY } from './registry';

const fetcher = new Fetcher(AD_REGISTRY);

await fetcher.init();

await fetcher.process();
