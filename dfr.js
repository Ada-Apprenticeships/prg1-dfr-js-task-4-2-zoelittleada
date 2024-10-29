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
}

function dataDimensions(dataframe) {
  if (!Array.isArray(dataframe)) {
    return [-1, -1]; 
  }
  const numRows = dataframe.length;
  if (numRows > 0 && Array.isArray(dataframe[0])){
    return [numRows, dataframe[0].length];
  } else {
    return [numRows, -1];
  }
}

function findTotal(dataset) {
  if (!Array.isArray(dataset)) {
    return 0; 
  }
  let total = 0;
  for (let i = 0; i < dataset.length; i++) { 
    if (validNumber(dataset[i])){
      total += Number(dataset[i]);
    }
  }
  return total;
}

function calculateMean(dataset) {
  if (!Array.isArray(dataset) || dataset.length === 0){
    return 0;
  }
  let total = findTotal(dataset)
  let length = dataset.filter(validNumber).length
  /*
  for (let i = 0; i < dataset.length; i++){
    if (validNumber(dataset[i])){
      total += Number(dataset[i])
      length += 1
    }
  }
    */
  if (total === 0){
    return 0;
  } 
  return total/length; 
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