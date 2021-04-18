import * as path from 'path';
import { DSL } from '../../types';
import { default as generator } from '../src';

generator.generator(require('./params.json')).then(console.log);
