import { params } from "@serverless/cloud";
import SES from "aws-sdk/clients/ses";

export async function sendAqhiNotification(email, data) {
  console.log(`Sending notification to ${email}`);

  const ses = new SES({
    accessKeyId: params.AWS_ACCESS_KEY_ID,
    secretAccessKey: params.AWS_SECRET_ACCESS_KEY,
  });

  await ses
    .sendEmail({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<a href="${params.CLOUD_URL}">AQHI for ${data.nameEn} has changed to ${data.aqhi}</a>`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `${data.nameEn} is now ${data.aqhi}`,
        },
      },
      Source: "rschick@bellwoods.ca",
    })
    .promise()
    .catch();
}
