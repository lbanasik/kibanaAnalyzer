const fs = require('fs');

const buffer = fs.readFileSync('customerList');
const bufferString = buffer.toString();
const bufferParse = JSON.parse(bufferString)
const customers = bufferParse.hits.hits;
let set = new Set();
const customerIdArray = [];
for(const customer of customers){
    if(select === 0){
        const msg = customer._source.message;
        const slicedMsg = msg.slice(msg.indexOf('[')+1, msg.length-1)
        const splitedMsg = slicedMsg.split(',');
        let ext = splitedMsg[4].trim().slice(splitedMsg[4].indexOf('=')+1)
        ext+='\n'
        const customerWithExportType = [splitedMsg[0].slice(splitedMsg[0].indexOf('=')+2), ext]
        customerIdArray.push(customerWithExportType)
        const customerIdArrayStringified = JSON.stringify(customerIdArray)
        fs.writeFileSync('customersWithExport.json', customerIdArray);
    }else{
        const customerid = customer._source.customerid;
        customerIdArray.push(customerid)
        set = new Set(...[customerIdArray])
    }
}

console.log(set)