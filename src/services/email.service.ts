import {
  BulkTemplateEmailProps,
  EmailModes,
  EmailProps,
  SimpleEmailProps,
  TemplateEmailProps,
} from "../types/Email";
import aws from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

const FROM_EMAIL = "driflys@gmail.com";
const REPLY_TO = "driflys@gmail.com";

aws.config.loadFromPath("aws-config.json");

export const sendEmail = async ({ mode, props }: EmailProps) => {
  if (mode === EmailModes.SIMPLE) sendSimpleEmail(props as SimpleEmailProps);
  else sendTemplateEmail(props as TemplateEmailProps);
};

export const sendSimpleEmail = async (props: SimpleEmailProps) => {
  const params = {
    Destination: {
      ToAddresses: props.receivers,
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: props.body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: props.subject,
      },
    },
    Source: `${props.fromName || "Driflys"} <${FROM_EMAIL}>`,
  };

  const result = await new aws.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();
  return result;
};

const sendTemplateEmail = async (props: TemplateEmailProps) => {
  const obj = {
    Destination: {
      ToAddresses: props.receivers,
    },
    Source: `${props.fromName || "Driflys"} <${FROM_EMAIL}>`,
    Template: props.template,
    TemplateData: JSON.stringify(props.params),
    ConfigurationSetName: "DriflysEmailConfigSet",
    ReplyToAddresses: [REPLY_TO],
  };
  const ses = new aws.SES({ apiVersion: "2010-12-01" });
  const res = await ses.sendTemplatedEmail(obj).promise();
  return res;
};

export const sendBulkTemplateEmails = async (
  props: BulkTemplateEmailProps
): Promise<
  PromiseResult<aws.SES.SendBulkTemplatedEmailResponse, aws.AWSError>
> => {
  const destinations: any[] = [];
  props.versions.map((version) => {
    destinations.push({
      Destination: {
        ToAddresses: [version.receiver],
      },
      ReplacementTemplateData: JSON.stringify(version.params),
    });
  });
  const obj = {
    Destinations: destinations,
    Source: `${props.fromName} <${FROM_EMAIL}>`,
    Template: props.template,
    ConfigurationSetName: "DriflysEmailConfigSet",
    DefaultTemplateData: JSON.stringify(props.default),
    ReplyToAddresses: [REPLY_TO],
  };
  console.log("Data", obj);
  const ses = new aws.SES({ apiVersion: "2010-12-01" });
  const res = await ses.sendBulkTemplatedEmail(obj).promise();
  return res;
};
