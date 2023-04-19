const package = require('./package.json');
const fs = require('fs');

const { ATLAS_DEPLOY } = process.env;

if (ATLAS_DEPLOY){
    console.log('update the package.json');
}
