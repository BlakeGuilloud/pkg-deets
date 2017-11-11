const rp = require('request-promise');
const chalk = require('chalk');

module.exports = (name) => {
  const rpOpts = {
    uri: `https://registry.npmjs.org/${name}`,
    method: 'GET',
    headers: 'Content-Type: application/json',
  };
  
  rp(rpOpts)
    .then((data) => {
      const parsedData = JSON.parse(data);
  
      const dataToPrint = {
        name: parsedData.name,
        description: parsedData.description,
        distTags: parsedData['dist-tags'],
        author: parsedData.versions[parsedData['dist-tags'].latest]._npmUser,
      };
  
      console.log(chalk.cyan(JSON.stringify(dataToPrint, null, 2)));
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        console.log(chalk.red('Package not found'));
      } else {
        console.log(chalk.red('Something went wrong..'));
      }
    });
}
