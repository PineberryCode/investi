import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];

    if (!files.length) {
        return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
    }

    const attachments = await Promise.all(
        files.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            return {
                filename: file.name,
                content: buffer,
                contentType: file.type
            };
        })
    );

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.RECEIVER_EMAIL || process.env.GMAIL_USER,
        subject: "Archivos del usuario (vídeo + gaze)",
        text: "Adjunto encontrarás los archivos grabados.",
        attachments
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, info });
    } catch (error: unknown) {
        console.error("Error al enviar el correo:", error);

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}