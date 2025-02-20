import { Generator } from '../../common/src/public-api';
import { FA_REGISTRY } from './registry';

const generator = new Generator(FA_REGISTRY, false);

await generator.init();

await generator.process();
