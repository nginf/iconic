import { Fetcher } from '../../common/src/public-api';
import { LU_REGISTRY } from './registry';

const fetcher = new Fetcher(LU_REGISTRY);

await fetcher.init();

await fetcher.process();
