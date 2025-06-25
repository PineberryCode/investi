import webgazer from "webgazer";

let isTracking = false;
let data: { x: number; y: number; timestamp: number }[] = [];

export const startGazeTracking = () => {
  if (isTracking) return;

  data = [];

  webgazer.setGazeListener((d, timestamp) => {
    if (d) data.push({ x: d.x, y: d.y, timestamp });
  });

  webgazer.begin().then(() => {
    webgazer.showVideoPreview(false);
    webgazer.showPredictionPoints(false);
    webgazer.showFaceOverlay(false);

    const elementsToHide = [
      "#webgazerVideoFeed",
      "#webgazerFaceOverlay",
      "#webgazerFaceFeedbackBox",
      "#webgazerPredictionPoints",
    ];
    elementsToHide.forEach((id) => {
      const el = document.querySelector(id);
      if (el) el.setAttribute("style", "display: none !important;");
    });
  });

  isTracking = true;
};

export const stopGazeTrackingAndDownload = () => {
  if (!isTracking) return;

  webgazer.end();
  isTracking = false;

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "coordenadas_webgazer.json";
  a.click();
  URL.revokeObjectURL(url);
};