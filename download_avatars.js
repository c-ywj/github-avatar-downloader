var request = require("request");

var fs = require("fs");

console.log("Welcome to the GitHub Avatar Downloader!");

var GITHUB_USER = "c-ywj";
var GITHUB_TOKEN = "cae1cc5b0f105d51de9b8ccf7dd5f52e1eb8ce17";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request(options, cb);

}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .on('response', function (response) {
    console.log('Response Status Code: ', response.statusCode);
  })
  .pipe(fs.createWriteStream(filePath));
}

 getRepoContributors("jquery", "jquery", function(err, result, body) {
   var objArray = JSON.parse(body);
   objArray.forEach(function(val) {
     console.log(val.avatar_url);
     downloadImageByURL(val.avatar_url, "./avatars/" + val.login + ".jpg")
   });
 });


