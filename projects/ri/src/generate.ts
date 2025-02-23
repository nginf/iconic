import { Generator } from "../../common/src/public-api";
import { LU_REGISTRY } from './registry';

const generator = new Generator(LU_REGISTRY);

await generator.init();

await generator.process();
