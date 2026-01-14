const _ = require("lodash");

const getInfoData = (data, keys) => {
  return _.pick(data, keys);
};

module.exports = {
  getInfoData,
};
