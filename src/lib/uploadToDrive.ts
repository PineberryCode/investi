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

    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
    })

    const result = await res.json()
    console.log("Files uploaded", result);
}