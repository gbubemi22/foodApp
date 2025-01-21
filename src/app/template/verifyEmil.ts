import { OtpDataType } from "../utils/util.js";


export const otpTemplate = async ({ otp, subject, name }: OtpDataType) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h2 {
        color: #333;
      }
      p {
        color: #555;
      }
      .otp {
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>${subject}</h2>
      <h3>Hello ${name}</h3>
      <p>Please use the following OTP (One Time Password) to verify your email:</p>
      <div class="otp">
        <p><strong>OTP:</strong>  ${otp}</p>
      </div>
      <p>This OTP is valid for a limited time. Please verify your email as soon as possible.</p>
    </div>
  </body>
  </html>
  `;
};
