module.exports = function (banks) {
  return {
    parse(bankName, fileContent) {
      return banks[bankName].parseEDIFile(fileContent);
    },
  };
};
