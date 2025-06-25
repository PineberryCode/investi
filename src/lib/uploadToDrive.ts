export const uploadToDrive = async (blob: Blob) => {
    const formData = new FormData();
    const condition = localStorage.getItem('condition') ?? "";
    const gazeRaw = localStorage.getItem('gaze') ?? ""
    const timestamp = Date.now();

    const gazeArray = gazeRaw.split("|").map((entry) => {
        const [ts, x, y] = entry.split("_")

        return {
            timestamp: Number(ts),
            x: Number(x),
            y: Number(y)
        }
    })

    const jsonBlob = new Blob([JSON.stringify(gazeArray, null, 2)], {
        type: "application/json"
    })
    const jsonFile = new File(
        [jsonBlob],
        `${timestamp.toString()}_${condition}_gaze.json`,
        { type: "application/json" }
    )

    const videoFile = new File(
        [blob],
        `${timestamp.toString()}_${condition}_examen.webm`,
        { type: "video/webm" }
    )

    formData.append("file", videoFile)
    formData.append("file", jsonFile)

    const endpoint = process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/upload"
        : process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT!;

    console.log("Blob size:", blob.size);

    const res = await fetch(endpoint, {
        method: "POST",
        body: formData
    })

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Upload failed:", res.status, errorText);
        throw new Error("Upload failed");
    }

    const result = await res.json()
    console.log("Files uploaded", result);
}