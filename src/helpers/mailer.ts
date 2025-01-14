import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { conf } from "@/config/conf";

type EmailParams = {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
};

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // TODO: configure mail
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1hr from now
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1hr from now
      });
    }

    const transporter = nodemailer.createTransport({
      host: conf.mailCredentials.mailHost,
      port: 2525,
      secure: false,
      auth: {
        user: conf.mailCredentials.mailUserId,
        pass: conf.mailCredentials.mailPassword,
      },
    });

    const mailOption = {
      from: "mdtoushif1020@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        conf.appCredentials.appDomain
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              conf.appCredentials.appDomain
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOption);
    return mailResponse;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to send email"
    );
  }
};
