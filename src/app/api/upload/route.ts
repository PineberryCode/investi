import { google } from "googleapis";
import { writeFile, createReadStream } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { promisify } from "util";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { tmpdir } from "os";

export const config = {
    api: {
        bodyParser: false,
    },
};

const writeFileAsync = promisify(writeFile);

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const files = formData.getAll("file") as File[];
    if (!files.length) {
        return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
    }

    const credentialsBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64!;
    const credentialsJSON = JSON.parse(
        Buffer.from(credentialsBase64, "base64").toString("utf-8")
    );

    const auth = new google.auth.GoogleAuth({
        credentials: credentialsJSON,
        scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });
    const folderId = process.env.GOOGLE_DRIVE_ID!;
    const uploaded = [];

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const tmpPath = path.join(tmpdir(), uuidv4());

        await writeFileAsync(tmpPath, buffer);

        const res = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: file.type,
                parents: [folderId],
            },
            media: {
                mimeType: file.type,
                body: createReadStream(tmpPath),
            },
        });

        uploaded.push(res.data);
    }

    return NextResponse.json({ success: true, uploaded });
}