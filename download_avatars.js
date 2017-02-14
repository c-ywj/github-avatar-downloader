var request = require("request");

var fs = require("fs");

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log("Welcome to the GitHub Avatar Downloader!");

var GITHUB_USER = "c-ywj";
var GITHUB_TOKEN = "cae1cc5b0f105d51de9b8ccf7dd5f52e1eb8ce17";

//Makes request to github API, requests for JSON file
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + '/' + repoName + '/contributors';
//adds options object within the same scope as getRepoContributors, for adding headers to athenticate through error 403 FORBIDDEN error
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };
//request method, brings in options object, cb defined @ getRepoContributors execution
  request(options, cb);
}

//downloadImageByURL makes requests to target url and downloads files into target filePath
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

getRepoContributors(repoOwner, repoName, function(err, result, body) {
  if(repoOwner != null && repoName != null) {
    //retrieved data (body) gets parsed into JSON object, forEach method loops over each element and passed into downloadImageByURL
    var objArray = JSON.parse(body);
    objArray.forEach(function(val) {
      console.log(val.avatar_url);
      downloadImageByURL(val.avatar_url, "./avatars/" + val.login + ".jpg")
    });
  }
  else {
    console.log('Error! Please pass in valid user name and repository name!');
  }
});



