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
  let total = findTotal(dataset);
  let length = dataset.filter(validNumber).length;
  if (total === 0){
    return 0;
  } 
  return total/length; 
}

function calculateMedian(dataset) {
  if (!Array.isArray(dataset) || dataset.length === 0) {
    return 0; 
  }
  const orderNumbers = dataset.filter(validNumber).map(Number).sort((a,b)=> a-b);
  const length = orderNumbers.length
  if (length === 0){
    return 0
  } else if (length % 2 === 0){
    const middle1 = length / 2 -1
    const middle2 = length / 2
    return (orderNumbers[middle1] + orderNumbers[middle2])/2
  } else {
    const middle = Math.floor(length/2)
    return orderNumbers[middle] 
  }
}

function convertToNumber(dataframe, col) {
  let count = 0
  for (let i = 0; i < dataframe.length; i++) {
    if (validNumber(dataframe[i][col])) {
      dataframe[i][col] = Number(dataframe[i][col]);
      count += 1;
    }
  }
  return count;
}

function flatten(dataframe) {
  return Array.isArray(dataframe) && dataframe.length > 0 ? dataframe.map(row => row[0]) : [];
}

function loadCSV(csvFile, ignoreRows, ignoreCols) {
  if (!fs.existsSync(csvFile)) {
    return [[], -1, -1];
  }
  const data = fs.readFileSync(csvFile, "utf-8");
  const lines = data.split(/\n/);
  const originalRows = lines.length;
  const originalCols = lines[0].split(',').length;
  const processedData = lines
    .filter((_, i) => !ignoreRows.includes(i)) 
    .map(line => line.split(',')
      .filter((_, j) => !ignoreCols.includes(j)) 
    );
  return [processedData, originalRows, originalCols]
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