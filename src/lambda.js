const http = require('https')

exports.handler = function(event, context) {
  const options = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    }
  }

  const req = http.request(event.Records[0].customData, options)
  
  const trigger = Object.keys(event.Records[0].codecommit.references[0])[0]
  const description = event.Records[0].codecommit.references[0][trigger]
  const author = event.Records[0].userIdentityARN.split(':')[5]
  const repo = event.Records[0].eventSourceARN.split(':')[5]
  const route = event.Records[0].codecommit.references[0].ref.split('/')
  const branch = {
    full: event.Records[0].codecommit.references[0].ref,
    cut: route[2] + '/' + route[3]
  }
  const date = event.Records[0].eventTime

  const content = {
    username: 'CodeCommit',
    avatar_url: 'https://robkerr.com/wp-content/uploads/2018/11/18048-1mp5cuespo8ufutuunrma0g.png',
    embeds: [{
      author: {
        name: author
      },
      title: "__**" + repo + ":" + branch.cut + "**__",
      url: 'https://eu-west-1.console.aws.amazon.com/codesuite/codecommit/repositories/' + repo + '/browse/' + branch.full,
      description: "[**" + trigger + " :** " + description + "](" + "https://eu-west-1.console.aws.amazon.com/codesuite/codecommit/repositories/" + repo + "/" + trigger + "/" + description + ")",
      timestamp: date,
      color: 16759552
    }]
  }

  req.write(JSON.stringify(content))
  req.end()
}