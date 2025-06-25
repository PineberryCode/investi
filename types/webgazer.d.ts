declare module 'webgazer' {
  interface GazeData {
    x: number;
    y: number;
  }

  interface WebGazerInstance {
    begin(): Promise<void>;
    end(): void;
    pause(): void;
    setGazeListener(
      callback: (data: GazeData | null, timestamp: number) => void
    ): WebGazerInstance;
    showVideoPreview(show: boolean): WebGazerInstance;
    showPredictionPoints(show: boolean): WebGazerInstance;
    showFaceOverlay(show: boolean): WebGazerInstance;
    recordScreenPosition(x: number, y: number, type: string): void;
    getCurrentPrediction(): GazeData | null;
    params: {
      videoStream?: MediaStream;
    };
  }

  const webgazer: WebGazerInstance;
  export default webgazer;
}