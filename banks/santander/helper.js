exports.dateFromEdiDate = function (ediDate) {
  return new Date(parseInt(ediDate.substring(4, 8), 10), parseInt(ediDate.substring(2, 4), 10) - 1, parseInt(ediDate.substring(0, 2), 10));
};
