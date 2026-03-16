import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
    console.log(`Attempting to send email to: ${to} with subject: ${subject}`);
    try {
        const from = process.env.FROM_EMAIL || 'onboarding@resend.dev';
        const { data, error } = await resend.emails.send({
            from,
            to,
            subject,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
                        .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #0284c7; }
                        .header h1 { color: #0284c7; margin: 0; font-size: 24px; }
                        .header p { color: #64748b; margin: 5px 0 0; font-size: 14px; font-weight: 600; }
                        .content { padding: 30px 0; }
                        .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #64748b; font-size: 12px; }
                        .button { display: inline-block; padding: 12px 24px; background-color: #0284c7; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Sales Edappal</h1>
                            <p>Trusted Local Property Partner</p>
                        </div>
                        <div class="content">
                            ${html}
                            <div style="text-align: center;">
                                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://salesedappal.com'}" class="button">View Website</a>
                            </div>
                        </div>
                        <div class="footer">
                            <p><strong>Sales Edappal</strong><br>
                            Edappal | Malappuram<br>
                            Phone: +91 98952 94949</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error('Resend API Error:', error);
            return { success: false, error };
        }

        console.log('Email sent successfully:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Unexpected Email Error:', error);
        return { success: false, error };
    }
}
