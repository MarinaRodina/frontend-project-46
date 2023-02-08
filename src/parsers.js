import yaml from 'js-yaml';

const parsers = (data, format) => {
  if (format.toLowerCase() === 'json') {
    return JSON.parse(data);
  } if (format.toLowerCase() === 'yml' || format.toLowerCase() === 'yaml') {
    return yaml.load(data);
  } return `Unknown format: ${format}`;
};

export default parsers;
