const http = require('https')
const url = require('url')
const path = require('path')

const config = require('../config')

exports.handler = function(event, context) {
  const options = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    }
  };

  const req = http.request(event.Records[0].customData, options);

  const trigger = Object.keys(event.Records[0].codecommit.references[0])[0];
  const description = event.Records[0].codecommit.references[0][trigger];
  const author = event.Records[0].userIdentityARN.split('/')[1];
  const repo = event.Records[0].eventSourceARN.split(':')[5];
  const branch = {
    full_path: path.join('browse', event.Records[0].codecommit.references[0].ref),
    short_path: event.Records[0].codecommit.references[0].ref.split('refs/heads/')[1]
  };
  const triggerUrl = url.resolve(config.codecommit_url, path.join(repo, trigger, description));
  const branchUrl = url.resolve(config.codecommit_url, path.join(repo, branch.full_path));
  const date = event.Records[0].eventTime;

  const content = {
    username: config.name,
    avatar_url: config.avatar_url,
    embeds: [{
      author: {
        name: author
      },
      title: `**[${repo}] : ** ${branch.short_path}`,
      url: branchUrl,
      description: `[**${trigger} :** ${description}](${triggerUrl})`,
      timestamp: date,
      color: config.color.commit
    }]
  };

  req.write(JSON.stringify(content));
  req.end();
}