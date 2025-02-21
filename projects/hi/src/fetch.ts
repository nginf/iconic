import { Fetcher } from '../../common/src/public-api';
import { HI_REGISTRY } from './registry';

const fetcher = new Fetcher(HI_REGISTRY);

await fetcher.init();

await fetcher.process();
