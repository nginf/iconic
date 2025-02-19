import { Fetcher } from '../../common/src/public-api';
import { MD_REGISTRY } from './registry';

const fetcher = new Fetcher(MD_REGISTRY);

await fetcher.init();

await fetcher.process();
