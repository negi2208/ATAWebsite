import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export const sendInvoice = ({ email, invoicePath, invoiceNo, orderId }) => {
    return transporter.sendMail({
        from: `"My Company Pvt Ltd" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Invoice #${invoiceNo} | Order ${orderId}`,
        html: `<b>Thank you for your order.</b>`,
        attachments: [
            {
                filename: `invoice-${invoiceNo}.pdf`,
                path: invoicePath,
            },
        ]
    })
}