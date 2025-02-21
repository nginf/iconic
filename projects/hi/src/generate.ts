import { Generator } from "../../common/src/public-api";
import { HI_REGISTRY } from './registry';

const generator = new Generator(HI_REGISTRY);

await generator.init();

await generator.process();
