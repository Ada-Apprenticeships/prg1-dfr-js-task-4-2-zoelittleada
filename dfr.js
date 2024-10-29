const fs = require("fs");

function fileExists(filename) {
  return fs.existsSync(filename);
}

function validNumber(value) {
  if (typeof value === 'number'){
    return !isNaN(value);
  } else if (typeof value === 'string'){
    const numberRule = /^-?\d+(\.\d+)?$/;
    return numberRule.test(value);
  } else {
    return false;
  }
  //const numValue = Number(value)
  //return !isNaN(numValue) && (typeof value === 'number'|| typeof value === 'string');
}

function dataDimensions(dataframe) {

}

function findTotal(dataset) {
  
}

function calculateMean(dataset) {
  
}

function calculateMedian(dataset) {

}

function convertToNumber(dataframe, col) {

}

function flatten(dataframe) {

}

function loadCSV(csvFile, ignoreRows, ignoreCols) {

}


function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {

}

module.exports = {
  fileExists,
  validNumber,
  dataDimensions,
  calculateMean,
  findTotal,
  convertToNumber,
  flatten,
  loadCSV,
  calculateMedian,
  createSlice,
};