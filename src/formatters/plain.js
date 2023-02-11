import _ from 'lodash';

const stringify = (node) => {
  if (_.isObject(node)) {
    return '[complex value]';
  }
  return typeof node === 'string' ? `'${node}'` : String(node);
};

const plain = (tree) => {
  const iter = (node, path = '') => {
    const {
      key,
      value,
      value1,
      value2,
      type,
      children,
    } = node;

    switch (type) {
      case 'root': {
        const result = children.flatMap((child) => iter(child, key));
        return result.join('\n');
      }
      case 'nested': {
        const result = children.flatMap((child) => iter(child, `${path}${key}.`));
        return result.join('\n');
      }
      case 'added':
        return `Property '${path}${key}' was added with value: ${stringify(value)}`;

      case 'deleted':
        return `Property '${path}${key}' was removed`;

      case 'changed':
        return `Property '${path}${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;

      case 'unchanged':
        return [];

      default:
        return `Unknown type ${type}`;
    }
  };
  return iter(tree);
};

export default plain;
