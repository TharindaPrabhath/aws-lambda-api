import { EmailModes } from "../types/Email";
import { sendEmail } from "./email.service";

interface Feedback {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const contactUs = async (feedback: Feedback) => {
  await sendEmail({
    mode: EmailModes.SIMPLE,
    props: {
      fromName: "Driflys Support",
      subject: "Contact Us Feedback",
      receivers: ["driflys@gmail.com", "tharindahp@gmail.com"],
      body: JSON.stringify(feedback, null, 2),
    },
  });
};

export const notify = async (email: string) => {
  await sendEmail({
    mode: EmailModes.SIMPLE,
    props: {
      fromName: "Driflys Support",
      subject: "Pre Launch - Notify",
      receivers: ["driflys@gmail.com", "tharindahp@gmail.com"],
      body: email,
    },
  });
};
