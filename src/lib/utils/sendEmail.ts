import nodemailer from 'nodemailer';
import { Booking } from '@/types';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendBookingInvoice(booking: Booking, userEmail: string, userName: string) {
  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .invoice-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #667eea; }
        .total { font-size: 24px; color: #667eea; font-weight: bold; text-align: right; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .status { display: inline-block; padding: 5px 15px; border-radius: 20px; background: #fbbf24; color: white; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏥 Care.xyz</h1>
          <h2>Booking Confirmation</h2>
        </div>
        <div class="content">
          <p>Dear ${userName},</p>
          <p>Thank you for choosing Care.xyz! Your booking has been confirmed.</p>
          
          <div class="invoice-details">
            <h3>📋 Booking Details</h3>
            
            <div class="detail-row">
              <span class="label">Booking ID:</span>
              <span>${booking._id || 'N/A'}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Service:</span>
              <span>${booking.serviceName}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Duration:</span>
              <span>${booking.duration} ${booking.durationType}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Location:</span>
              <span>${booking.location.area}, ${booking.location.city}, ${booking.location.district}, ${booking.location.division}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Address:</span>
              <span>${booking.location.address}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Status:</span>
              <span class="status">${booking.status.toUpperCase()}</span>
            </div>
            
            <div class="total">
              Total Cost: ৳${booking.totalCost}
            </div>
          </div>
          
          <p><strong>What's Next?</strong></p>
          <ul>
            <li>Our team will review your booking</li>
            <li>You'll receive a confirmation call within 24 hours</li>
            <li>Track your booking status at <a href="${process.env.NEXT_PUBLIC_BASE_URL}/my-bookings">My Bookings</a></li>
          </ul>
          
          <p>If you have any questions, please contact us at support@care.xyz</p>
          
          <div class="footer">
            <p>© 2024 Care.xyz - Trusted Care Services</p>
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `Booking Confirmation - ${booking.serviceName}`,
    html: invoiceHTML,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Invoice email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}