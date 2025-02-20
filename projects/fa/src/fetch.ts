import { Fetcher } from '../../common/src/public-api';
import { FA_REGISTRY } from './registry';

const fetcher = new Fetcher(FA_REGISTRY);

await fetcher.init();

await fetcher.process();
