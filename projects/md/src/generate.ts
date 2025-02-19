import { Generator } from "../../common/src/public-api";
import { MD_REGISTRY } from './registry';

const generator = new Generator(MD_REGISTRY);

await generator.init();

await generator.process();
