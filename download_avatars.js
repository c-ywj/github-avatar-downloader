var request = require("request");

console.log("Welcome to the GitHub Avatar Downloader!");

var GITHUB_USER = "c-ywj";
var GITHUB_TOKEN = "cae1cc5b0f105d51de9b8ccf7dd5f52e1eb8ce17";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});


