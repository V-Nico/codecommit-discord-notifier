const lambdaFunction = require('./lambda')
const functionHandler = 'handler'

const event = {
  "Records": [
    {
      "awsRegion": "eu-west-1",
      "codecommit": {
        "references": [
          {
            "commit": "c4894654c4z4ar894zr4864",
            "ref": "refs/heads/master"
          }
        ]
      },
      "customData": "your/webhook",
      "eventId": "5a824061-17ca-46a9-bbf9-114edeadbeef",
      "eventName": "TriggerEventTest",
      "eventPartNumber": 1,
      "eventSource": "aws:codecommit",
      "eventSourceARN": "arn:aws:codecommit:eu-west-1:0123456789:REPO",
      "eventTime": "2016-01-01T23:59:59.000+0000",
      "eventTotalParts": 1,
      "eventTriggerConfigId": "e1586a4645e-r4684r-5644er",
      "eventTriggerName": "my-trigger",
      "eventVersion": "1.0",
      "userIdentityARN": "arn:aws:iam::123456789012:user/Author"
    }
  ]
}

const context = {}

lambdaFunction[functionHandler](event, context)