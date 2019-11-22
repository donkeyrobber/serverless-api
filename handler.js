const aws = require('aws-sdk');

const queue_name  ='MyQueue';
const account_id = '940897455727';
const queue_url = `https://sqs.eu-west-2.amazonaws.com/${account_id}/${queue_name}`;
console.log(queue_url);
const sqs = new aws.SQS({region: 'eu-west-2'});

module.exports.hello = async (event, context) => {
    const params = {
      MessageBody: JSON.stringify('hello'),
      QueueUrl: queue_url
    };

    sqs.sendMessage(params, function(err, data){
        if(err) {
            console.log(`error: ${err}`);
            context.done('error', "ERROR Put SQS");
        } else {
            console.log('data:',data.MessageId);
            context.done(null,'');  // SUCCESS
        }
    });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!'
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
