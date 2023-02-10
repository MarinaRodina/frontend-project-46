const indent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const stringify = (node, depth = 1) => {
  if (typeof node !== 'object' || node === null) {
    return String(node);
  }
  const keys = Object.keys(node);
  const result = keys.map((key) => {
    const propety = node[key];
    return `${indent(depth + 1)}  ${key}: ${stringify(propety, depth + 1)}`;
  });

  return `{\n${result.join('\n')}\n  ${indent(depth)}}`;
};

const stylish = (tree) => {
  const iter = (node, depth = 0) => {
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
        const result = children.flatMap((child) => iter(child, depth + 1));
        return `{\n${result.join('\n')}\n}`;
      }
      case 'nested': {
        const result = children.flatMap((child) => iter(child, depth + 1));
        return `${indent(depth)}  ${key}: {\n${result.join('\n')}\n${indent(depth)}  }`;
      }
      case 'added': {
        return `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
      }
      case 'deleted': {
        return `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
      }
      case 'changed': {
        const beforeChange = `${indent(depth)}- ${key}: ${stringify(value1, depth)}`;
        const afterChange = `${indent(depth)}+ ${key}: ${stringify(value2, depth)}`;
        return `${beforeChange}\n${afterChange}`;
      }
      case 'unchanged': {
        return `${indent(depth)}  ${key}: ${stringify(value, depth)}`;
      }
      default:
        throw new Error(`Unknown type: '${type}'`);
    }
  };
  return iter(tree);
};

export default stylish;
