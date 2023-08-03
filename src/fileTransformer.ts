import path from 'path'

module.exports = {
  process(src:any, filename:any) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  }
};