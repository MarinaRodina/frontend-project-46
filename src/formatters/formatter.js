import stylish from './stylish.js';

const format = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree);
    default:
      return `Unknown format ${formatName}`;
  }
};

export default format;
