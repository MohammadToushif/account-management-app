import "./envConfig.ts";

export const conf = {
  dbCredentials: {
    databaseUri: String(process.env.MONGODB_URI),
  },
  appCredentials: {
    appDomain: String(process.env.DOMAIN),
    appTokenSceret: String(process.env.TOKEN_SECRET),
  },
  mailCredentials: {
    mailHost: String(process.env.MAIL_HOST),
    mailPort: String(process.env.MAIL_PORT),
    mailUserId: String(process.env.MAIL_USER),
    mailPassword: String(process.env.MAIL_PASS),
  },
};
