import { createIDEFriendlyPipePreprocessor } from '../dist/pipe-preprocessor.js';

export default {
  preprocess: [
    createIDEFriendlyPipePreprocessor({
      pipePrefix: 'utils.',
      debug: true,
      ideMode: true
    })
  ]
}; 