import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Username is required"],
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },

  { timestamps: true }
);

// Since NextJS is run on edge so first we have to check is model already exist or not.
const User = mongoose.models.users || mongoose.model("User", userSchema);
export default User;
