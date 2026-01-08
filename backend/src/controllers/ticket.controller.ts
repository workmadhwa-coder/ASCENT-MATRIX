import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';
import { Buffer } from 'buffer';
import fetch from 'node-fetch';

// ============================================
// GENERATE PDF + SEND EMAIL
// ============================================
export const generateAndEmail = async (req: any, res: any) => {
  const { registrationData, paymentId } = req.body;

  try {
    // -------------------------------
    // 1. Generate QR Code
    // -------------------------------
    const qrBuffer = await QRCode.toBuffer(registrationData.id, {
      margin: 1,
      width: 220,
    });

    // Fetch logo
    const logoRes = await fetch(
      'https://res.cloudinary.com/dzss2fubc/image/upload/v1767631444/Ascent_Matrix_White_ju8ras.png'
    );
    const logoBuffer = Buffer.from(await logoRes.arrayBuffer());

    // -------------------------------
    // 2. Generate PDF in Memory
    // -------------------------------
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const buffers: Buffer[] = [];

    doc.on('data', (chunk) => buffers.push(chunk));

    const pdfPromise = new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);
    });

    // ===============================
    // PDF DESIGN (DELEGATE PASS)
    // ===============================

    // Header Background
    doc.rect(0, 0, doc.page.width, 140).fill('#0f172a');

    // Logo
    doc.image(logoBuffer, 40, 35, { width: 120 });

    // Title
    doc
      .fillColor('#ffffff')
      .fontSize(28)
      .font('Helvetica-Bold')
      .text('ASCENT MATRIX 2026', 200, 40);

    doc
      .fontSize(14)
      .font('Helvetica')
      .fillColor('#cbd5f5')
      .text('OFFICIAL DELEGATE PASS', 200, 78);

    // Divider
    doc
      .moveTo(40, 155)
      .lineTo(doc.page.width - 40, 155)
      .lineWidth(2)
      .strokeColor('#7c3aed')
      .stroke();

    doc.moveDown(3);

    // Card Background
    const cardTop = doc.y;
    doc
      .roundedRect(40, cardTop, doc.page.width - 80, 260, 12)
      .fill('#f8fafc');

    doc.fillColor('#000').fontSize(16).font('Helvetica-Bold');

    doc.text('DELEGATE DETAILS', 60, cardTop + 20);

    doc
      .moveTo(60, cardTop + 45)
      .lineTo(doc.page.width - 60, cardTop + 45)
      .strokeColor('#e5e7eb')
      .stroke();

    doc.fontSize(13).font('Helvetica').fillColor('#111827');

    doc.text(`Name`, 60, cardTop + 65);
    doc.font('Helvetica-Bold').text(registrationData.fullName, 200, cardTop + 65);

    doc.font('Helvetica').text(`Organization`, 60, cardTop + 95);
    doc
      .font('Helvetica-Bold')
      .text(registrationData.organization || '—', 200, cardTop + 95);

    doc.font('Helvetica').text(`Delegate ID`, 60, cardTop + 125);
    doc.font('Helvetica-Bold').text(registrationData.id, 200, cardTop + 125);

    doc.font('Helvetica').text(`Payment ID`, 60, cardTop + 155);
    doc.font('Helvetica-Bold').text(paymentId, 200, cardTop + 155);

    // QR Code Box
    doc
      .roundedRect(doc.page.width - 230, cardTop + 60, 150, 150, 10)
      .fill('#ffffff')
      .strokeColor('#d1d5db')
      .stroke();

    doc.image(qrBuffer, doc.page.width - 215, cardTop + 75, {
      width: 120,
    });

    // Event Details
    doc.moveDown(15);

    doc.fontSize(16).font('Helvetica-Bold').fillColor('#000');
    doc.text('EVENT VENUE', 40);

    doc.moveDown(0.5);
    doc.fontSize(13).font('Helvetica').fillColor('#374151');

    doc.text('Chowdiah Memorial Hall');
    doc.text(
      '16th Cross Rd, Vyalikaval, Kodandarampura,\nMalleshwaram, Bengaluru, Karnataka 560003'
    );

    // Footer
    doc
      .rect(0, doc.page.height - 90, doc.page.width, 90)
      .fill('#0f172a');

    doc
      .fillColor('#e5e7eb')
      .fontSize(10)
      .text(
        'Please carry this delegate pass and a valid photo ID.\nQR code will be scanned at the entry point for verification.',
        40,
        doc.page.height - 65,
        { align: 'center' }
      );

    doc.end();

    const pdfBuffer = await pdfPromise;

    // -------------------------------
    // 3. Setup Nodemailer
    // -------------------------------
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify();

    // -------------------------------
    // 4. Send Email
    // -------------------------------
    await transporter.sendMail({
      from: `"Ascent Matrix" <${process.env.MAIL_USER}>`,
      to: registrationData.email,
      subject: 'Your Ascent Matrix 2026 Delegate Pass',
      text: `Hello ${registrationData.fullName},

Thank you for registering for Ascent Matrix 2026.

Your official delegate pass is attached to this email.

Regards,
Ascent Matrix Team`,
      attachments: [
        {
          filename: `Pass_${registrationData.id}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Ticket generated and email sent successfully',
    });
  } catch (error) {
    console.error('Ticket & Email Error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to generate or send ticket',
    });
  }
};

// ============================================
// DOWNLOAD PDF ONLY
// ============================================
export const downloadTicket = async (req: any, res: any) => {
  const { registrationData, paymentId } = req.body;

  try {
    const qrBuffer = await QRCode.toBuffer(registrationData.id, {
      margin: 1,
      width: 220,
    });

    const logoRes = await fetch(
      'https://res.cloudinary.com/dzss2fubc/image/upload/v1767631444/Ascent_Matrix_White_ju8ras.png'
    );
    const logoBuffer = Buffer.from(await logoRes.arrayBuffer());

    const doc = new PDFDocument({ size: 'A4', margin: 40 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Pass_${registrationData.id}.pdf`
    );

    doc.pipe(res);

    // Same UI as above
    doc.rect(0, 0, doc.page.width, 140).fill('#0f172a');
    doc.image(logoBuffer, 40, 35, { width: 120 });

    doc
      .fillColor('#ffffff')
      .fontSize(28)
      .font('Helvetica-Bold')
      .text('ASCENT MATRIX 2026', 200, 40);

    doc
      .fontSize(14)
      .font('Helvetica')
      .fillColor('#cbd5f5')
      .text('OFFICIAL DELEGATE PASS', 200, 78);

    doc.moveDown(10);
    doc.image(qrBuffer, (doc.page.width - 220) / 2, doc.y, { width: 220 });

    doc.end();
  } catch (error) {
    console.error('Download Error:', error);
    res.status(500).json({ error: 'Download failed' });
  }
};
