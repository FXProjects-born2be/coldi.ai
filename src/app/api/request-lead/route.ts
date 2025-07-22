import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

type RequestCallData = {
  fullName: string;
  email: string;
  phone: string;
  industry: string;
  company: string;
  monthlyLeadVolume: string;
  primaryGoal: string[];
  message: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const bodyJSON = (await request.json()) as RequestCallData;
    const { fullName, email, phone, industry, company, monthlyLeadVolume, primaryGoal, message } =
      bodyJSON;

    // Initialize SendGrid with API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    // Create email content
    const msg = {
      to: process.env.ADMIN_EMAIL!, // Your admin email address
      from: process.env.FROM_EMAIL!, // Verified sender email
      subject: 'New Lead Request',
      html: `
        <h2>New Lead Request</h2>
        <p><strong>Nombre:</strong> ${fullName}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Monthly Lead Volume:</strong> ${monthlyLeadVolume}</p>
        <p><strong>Primary Goal:</strong> ${primaryGoal}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email
    await sgMail.send(msg);

    /*const clientMSG = {
      to: email, // Your admin email address
      from: process.env.FROM_EMAIL!, // Verified sender email
      subject: 'Tanzora Request Received',
      html: `
      `,
    };

    await sgMail.send(clientMSG);*/

    return NextResponse.json({ message: 'Pricing request sent successfully.' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error sending pricing request:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to send fund access request.', error: errorMessage },
      { status: 500 }
    );
  }
}
