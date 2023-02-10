import _ from 'lodash';

const generateTree = (obj1, obj2) => {
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  const keysUnion = _.union(key1, key2);
  const keysSort = _.sortBy(keysUnion);

  const callback = (key) => {
    const hasValue1 = Object.hasOwn(obj1, key);
    const hasValue2 = Object.hasOwn(obj2, key);

    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, children: generateTree(value1, value2), type: 'nested' };
    }
    if (!hasValue1) {
      return { key, value: value2, type: 'added' };
    }
    if (!hasValue2) {
      return { key, value: value1, type: 'deleted' };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key,
        value1,
        value2,
        type: 'changed',
      };
    }
    return { key, value: value1, type: 'unchanged' };
  };

  const result = keysSort.map(callback);
  return result;
};

const buildTree = (data1, data2) => ({ type: 'root', children: generateTree(data1, data2) });

export default buildTree;
