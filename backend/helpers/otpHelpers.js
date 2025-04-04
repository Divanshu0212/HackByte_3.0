// backend/helpers/otpHelpers.js
import otpGenerator from 'otp-generator';
import bcrypt from 'bcryptjs';

export const generateAndHashOTP = async () => {
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false, digits: true });
  const hashedOtp = await bcrypt.hash(otp, 10);
  return { otp, hashedOtp };
};

export const verifyOTP = async (plainOTP, hashedOTP) => {
  return await bcrypt.compare(plainOTP, hashedOTP);
};