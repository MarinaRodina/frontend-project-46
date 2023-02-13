import yaml from 'js-yaml';

const parsers = (data, format) => {
  const formatToLowerCase = format.toLowerCase();
  switch (formatToLowerCase) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      return `Unknown format: ${format}`;
  }
};

export default parsers;
