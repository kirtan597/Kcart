import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('⚠️  Email credentials not configured');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
export const sendOTPEmail = async (email, otp, name) => {
  const transporter = createTransporter();

  // If no transporter, log OTP to console as fallback
  if (!transporter) {
    console.log(`\n📧 OTP for ${email}: ${otp}\n`);
    return { success: true, message: 'OTP logged to console (Email service not configured)' };
  }

  const mailOptions = {
    from: `"Kcart" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - Kcart',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #374151 0%, #111827 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 300; }
          .content { padding: 40px 30px; }
          .otp-box { background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0; }
          .otp-code { font-size: 36px; font-weight: bold; color: #111827; letter-spacing: 8px; margin: 10px 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
          .button { display: inline-block; padding: 12px 30px; background: #111827; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Kcart</h1>
          </div>
          <div class="content">
            <h2 style="color: #111827; margin-top: 0;">Hello ${name || 'there'}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Thank you for signing up with Kcart. To complete your registration, please verify your email address using the OTP below:
            </p>
            <div class="otp-box">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Your verification code is:</p>
              <div class="otp-code">${otp}</div>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">This code will expire in 10 minutes</p>
            </div>
            <p style="color: #4b5563; line-height: 1.6;">
              If you didn't request this code, please ignore this email.
            </p>
            <p style="color: #4b5563; line-height: 1.6;">
              Best regards,<br>
              <strong>The Kcart Team</strong>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Kcart. All rights reserved.</p>
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Failed to send OTP email' };
  }
};
