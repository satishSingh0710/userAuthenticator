import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
// import { MailtrapClient, MailtrapTransport } from "mailtrap";

interface EmailParams {
  email: string;
  emailType?: "VERIFY" | "RESET"; // Optional property
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {
    if (!email || !emailType || !userId) {
      throw new Error("Please provide email, emailType and userId");
    }

    const hashed = await bcryptjs.hash(userId.toString(), 10); // hash the userId

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashed,
        verifyTokenExpiry: Date.now() + 36000000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashed,
        forgotPasswordTokenExpiry: Date.now() + 36000000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    // const sender = {
    //   address: "satishsingh45264209@gmail.com",
    //   name: "Satish Singh",
    // };
    // const recipients = [email];

    // const mailResponse = await transport
    //   .sendMail({
    //     from: sender,
    //     to: recipients,
    //     subject:
    //       emailType === "VERIFY"
    //         ? "Email verification mail"
    //         : "Reset password mail",
    //     html: `<p>Click <a href="${
    //       process.env.DOMAIN
    //     }/verifymail?token=${hashed}">here</a> to ${
    //       emailType === "VERIFY" ? "verify your email" : "reset your password"
    //     }
    //   or copy and paste the link below in your browser. <br> ${
    //     process.env.DOMAIN
    //   }/verifyemail?token=${hashed}
    //   </p>`,
    //     category: "Integration Test",
    //     sandbox: true,
    //   })
    //   .then(console.log, console.error);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifymail" : "forgotpassword"
      }?token=${hashed}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/${
        emailType === "VERIFY" ? "verifymail" : "forgotpassword"
      }?token=${hashed}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: unknown) {
    console.log("Error in sending verification mail", error);
    throw new Error("Error in sending verification mail");
  }
};
