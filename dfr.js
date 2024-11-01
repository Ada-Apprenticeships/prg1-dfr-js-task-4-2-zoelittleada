const fs = require("fs");

function fileExists(filename) {
  return fs.existsSync(filename);
}

//checks if value is a number and not NaN
//if not a number checks it is a string and matches the RegEx pattern
function validNumber(value) {
  return typeof value === 'number' 
    ? !isNaN(value) 
    : typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value);
}

//determines how many rows and columns a dataframe has
function dataDimensions(dataframe) {
  return Array.isArray(dataframe) 
    ? (dataframe.length > 0 && Array.isArray(dataframe[0]) 
    ? [dataframe.length, dataframe[0].length]  //if 2d returns rows and columns 
    : [dataframe.length, -1])  //if 1d returns length and -1
    : [-1, -1];  //returns [-1, -1] for an invalid input
}

//loops through an array and adds all valid numbers to the total
function findTotal(dataset) {
  if (!Array.isArray(dataset)) return 0; //returns 0 for an invalid input
  let total = 0;
  for (let i = 0; i < dataset.length; i++) { 
    total += validNumber(dataset[i]) ? Number(dataset[i]) : 0;
  }
  return total;
}

//calculates mean of all valid numbers in an array
function calculateMean(dataset) {
  if (!Array.isArray(dataset) || dataset.length === 0) return 0; //returns 0 for an invalid input
  let total = findTotal(dataset);
  let length = dataset.filter(validNumber).length;
  if (total === 0) return 0;
  return total/length; 
}

function calculateMedian(dataset) {
  if (!Array.isArray(dataset) || dataset.length === 0) return 0; //returns 0 for an invalid input
  //filters valid numbers in an array, makes them numbers and then puts them in ascending order
  const orderNumbers = dataset.filter(validNumber).map(Number).sort((a,b)=> a-b);
  const length = orderNumbers.length;
  //calculates the median of the orderNumber list
  if (length === 0) return 0;
  return length % 2 === 0 
    ? (orderNumbers[length / 2 - 1] + orderNumbers[length / 2]) / 2  
    : orderNumbers[Math.floor(length / 2)];
}

//changes all valid numbers in a specific column to numbers instead of strings 
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

//makes 2d array (with 1 column) 1d by extracting first element in each row 
//returns empty array if input is invalid 
function flatten(dataframe) {
  return Array.isArray(dataframe) && dataframe.length > 0 ? dataframe.map(row => row[0]) : [];
}

function loadCSV(csvFile, ignoreRows, ignoreCols) {
  if (!fs.existsSync(csvFile)) { //checks file exists 
    return [[], -1, -1];
  }
  const data = fs.readFileSync(csvFile, "utf-8");
  const lines = data.split(/\n/);
  const originalRows = lines.length;
  const originalCols = lines[0].split(',').length;
  const processedData = lines
    .filter((_, i) => !ignoreRows.includes(i)) //ignores rows in ignore rows list
    .map(line => line.split(',')
    .filter((_, j) => !ignoreCols.includes(j)) //ignores columns in ignore columns list
    );
  return [processedData, originalRows, originalCols]
}

function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {
  //makes sure the column index is valid in the dataframe 
  if (columnIndex < 0 || columnIndex >= dataframe[0].length) {
    throw new Error('Invalid column index.');
  }
  const result = dataframe
    .filter(row => pattern === '*' || row[columnIndex] === pattern) //allows specific row to be chosen or all if '*'
    .map(row => exportColumns.length ? exportColumns.map(i => row[i]) : row); //allows specific column to be chosen
  return result;
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