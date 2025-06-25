"use client"

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { uploadToDrive } from "@/lib/uploadToDrive";
import { QuestionsAndOptions } from "@/util/question";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Exam() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    const [uploading, setUploading] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const recordedChunks = useRef<Blob[]>([])
    const stream = useRef<MediaStream | null>(null)

    const stopAndDownload = () => {
        if (uploading || !mediaRecorder.current || !stream.current) return;

        setUploading(true);

        const finalize = async () => {
            stream.current?.getTracks().forEach((track) => {
                if (track.readyState === "live") {
                    track.stop();
                }
            });

            const blob = new Blob(recordedChunks.current, { type: "video/webm" });

            try {
                await uploadToDrive(blob);
                toast.success("🎉 Subido al sistema correctamente, puede cerrar esta pestaña.", {
                    duration: 50000
                });
            } catch (e) {
                toast.error(`❌ Error al subir los datos al sistema: ${e}`, {
                    duration: 50000
                });
            }

            setUploading(false)

            mediaRecorder.current = null;
            stream.current = null;
        };

        if (mediaRecorder.current.state !== "inactive") {
            mediaRecorder.current.onstop = finalize;
            mediaRecorder.current.stop();
        } else {
            finalize();
        }
    }

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((mediaStream) => {
            stream.current = mediaStream;

            mediaRecorder.current = new MediaRecorder(mediaStream, {
                mimeType: "video/webm; codecs=vp8"
            });

            recordedChunks.current = [];

            mediaRecorder.current.ondataavailable = (e) => {
                if (e.data.size > 0) recordedChunks.current.push(e.data);
            };

            mediaRecorder.current.start(1000);
        });
    }, [])

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })

    }, [api])

    useEffect(() => {
        return () => {
            stream.current?.getTracks().forEach((track) => {
                if (track.readyState === "live") {
                    track.stop();
                }
            });
            if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
                mediaRecorder.current.stop();
            }
        };
    }, []);

    return (
        <div className="flex justify-center my-10 relative">
            <video ref={videoRef} className="hidden" muted />

            {uploading && (
                <div className="absolute top-5 z-50">
                    <Alert className="bg-yellow-100 border-yellow-400 text-yellow-800 shadow-md w-[300px] mx-auto">
                        <AlertDescription className="text-center font-medium">
                            Cargando, por favor espera...
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            <Carousel className="w-full mx-44" setApi={setApi} >
                <CarouselContent>
                    {QuestionsAndOptions.map((element, index) => (
                        <CarouselItem key={index}>
                            <div className="grid grid-cols-1 grid-rows-[1fr_1fr] h-screen">
                                <div className="mx-20">
                                    <div className="text-muted-foreground py-2 text-center text-sm select-none">
                                        Pregunta {current} of {count}
                                    </div>
                                    <Card className={`inset-shadow-sm inset-shadow-${element.color}-500 rounded-2xl`}>
                                        <CardContent className="text-center">
                                            <p className="font-bold italic text-lg select-none">{element.question}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="grid grid-cols-4 gap-7">
                                    {element.options.map((option) => (
                                        <Button
                                            key={`${index}-${option.option}`}
                                            className={`rounded-2xl cursor-pointer whitespace-normal break-words h-56 bg-${option.color}-500 shadow-lg shadow-${option.color}-500/50`}
                                            variant="outline"
                                            onClick={() => {
                                                if (index === QuestionsAndOptions.length - 1) {
                                                    stopAndDownload();
                                                } else {
                                                    api?.scrollNext();
                                                }
                                            }}
                                        >
                                            <p className="text-xl select-none">{option.option}</p>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}