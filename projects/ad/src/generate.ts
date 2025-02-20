import { Generator } from '../../common/src/public-api';
import { AD_REGISTRY } from './registry';

const generator = new Generator(AD_REGISTRY);

await generator.init();

await generator.process();
