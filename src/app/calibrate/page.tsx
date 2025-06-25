"use client"

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Calibration() {
    const [canContinue, setCanContinue] = useState(false)
    const gazeData = useRef<{ x: number; y: number; timestamp: number }[]>([]);
    const [clicks, setClicks] = useState(0);
    const stream = useRef<MediaStream | null>(null);

    const removeWebGazerElements = () => {
        const ids = [
            "webgazerVideoFeed",
            "webgazerFaceOverlay",
            "webgazerFaceFeedbackBox",
            "webgazerPredictionPoints"
        ];
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });
    };

    const saveCalibrationData = () => {
        localStorage.setItem('timestamp', Date.now().toString())
        localStorage.setItem('gaze', gazeData.current.map((element) => {
            return element.timestamp.toString() + "_" + element.x.toString() + "_" + element.y.toString()
        }).join("|"))
    };

    const stopCamera = () => {
        if (stream.current) {
            stream.current.getTracks().forEach((track) => {
                track.stop();
            });
            stream.current = null;
        }
    };

    const handleClick = (event: MouseEvent) => {
        window.webgazer.recordScreenPosition(event.clientX, event.clientY, "click");

        setClicks((prev) => {
            const next = prev + 1;
            if (next >= 15) {
                window.webgazer?.end();
                stopCamera()
                removeWebGazerElements();
                setCanContinue(true);
            }
            return next;
        });
    };

    useEffect(() => {
        import("webgazer").then((wz) => {
            const webgazer = wz.default;
            window.webgazer = webgazer;

            navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
                stream.current = mediaStream;

                const webgazer = wz.default;
                window.webgazer = webgazer;

                webgazer.params.videoStream = mediaStream;

                setTimeout(() => {
                    webgazer.begin().then(() => {
                        webgazer.setGazeListener((data, timestamp) => {
                            if (data) {
                                gazeData.current.push({ x: data.x, y: data.y, timestamp });
                            }
                        });

                        webgazer.showVideoPreview(true);
                        webgazer.showPredictionPoints(true);
                        webgazer.showFaceOverlay(true);
                    });
                }, 5000)

                window.addEventListener("click", handleClick);
            });


            return () => {
                window.removeEventListener("click", handleClick);
                stopCamera()
            };
        });
    }, []);

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="text-xl font-semibold mb-4 text-start">
                <p className="justify-self-center">Pasos:</p>
                <ol className="list-decimal list-inside">
                    <li>Posicione su rostro dentro del recuadro negro hasta que su borde se torne a verde.</li>
                    <li>Mira el punto rojo y haz clic sobre él para entrenar el sistema.</li>
                </ol>
            </div>
            <p className="text-sm text-center text-gray-500 max-w-md">
                Este proceso ayudará a que el sistema aprenda hacia dónde estás mirando.
                Necesitas hacer clic en al menos 15 puntos antes de que el modelo pueda predecir correctamente tu mirada.
            </p>
            <p className="mt-4 text-center text-gray-600">
                Clics registrados: {clicks <= 15 ? clicks : 15} / 15
            </p>
            {canContinue && (
                <Button
                    onClick={() => {
                        setCanContinue(false);
                        setTimeout(() => {
                            saveCalibrationData();
                            window.location.href = "/exam"
                        }, 300);
                    }}
                    className="bg-green-600 text-white mt-6 cursor-pointer"
                >
                    Iniciar examen
                </Button>
            )}
        </div>

    );
}