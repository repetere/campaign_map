
const Promisie = require('promisie');
const fs = Promisie.promisifyAll(require('fs-extra'));
const path = require('path');
const converter = require('json-2-csv');
const csv2json = converter.csv2json;
const zip2fips = require(path.join(__dirname,'../lib/csvs/zip2fips.json'));
// console.log({zip2fips})

let aggregate = function (arr) {
  let data = arr.reduce((result, val) => {
    if (typeof result[Symbol.iterator] !== 'function') {
      let index = 0;
      result[Symbol.iterator] = function* () {
        while (index < Object.keys(result).length) {
          yield result[Object.keys(result)[index++]];
        }
      };
    }
    if (result[val]) result[val].value++;
    else result[val] = { zip: val, value: 1, fips:zip2fips[val] };
    return result;
  }, {});
  return [...data];
};

fs.readFileAsync(path.join(__dirname, '../lib/csvs/ny.csv'))
.then(csvdata =>{
  // csv2json.
  // console.log();
  csv2json(csvdata.toString(), (err, csvjson)=>{
    if(err){
      throw err;
    }
    else{
      let zipArray = (csvjson.map((item)=>item['10001']));
      let outputFilePath = path.join(__dirname, 'nycsv.json');
      return fs.outputJsonAsync(outputFilePath, aggregate(zipArray));//);
      /*
      fs.outputFile(file, 'hello!', function (err) {
  console.log(err) // => null 
 
  fs.readFile(file, 'utf8', function (err, data) {
    console.log(data) // => hello! 
  })
})
      */
    }
  },{
    delimiter:{
      eol:'\r\n',
    },
  });

})
.then(()=>{
  console.log('written file');
})
.catch(e=>{
  console.error(e);
});