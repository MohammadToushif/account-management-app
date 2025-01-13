import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

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
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "c6a9eab872220c",
        pass: "04e09c16f2d2a5",
      },
    });

    const mailOption = {
      from: "mdtoushif1020@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
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
