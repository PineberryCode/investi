"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BadgeInfo } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [accepted, setAccepted] = useState(false)
  const [selected, setSelected] = useState<string>("")

  function handleAcceptation(data: boolean) {
    setAccepted(data)
  }

  function redirectToCalibration() {
    redirect('/calibrate')
  }

  useEffect(() => { }, [accepted, selected])

  return (
    <div className="flex justify-center">
      <Card className="max-w-9/12 my-10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Aviso importante</CardTitle>
          <CardDescription className="text-lg">Por favor, leer detenidamente el siguiente contenido.</CardDescription>
        </CardHeader>
        <CardContent className="mx-10 select-none">
          <ScrollArea className="h-72 border-8">
            <p className="text-justify">
              Este prototipo del trabajo de investigación tiene como objetivo validar
              los instrumentos tecnológicos para la detección de conductas sospechosas
              durante exámenes virtuales. A través de este prueba piloto, se evaluará
              el funcionamiento de las herramientas tecnológicas sin influir en los
              resultados del examen.
            </p><br />
            <p className="font-bold">Las condiciones para participar en este prototipo son:</p>
            <ol className="list-decimal list-inside mt-2">
              <li>El apoderado ha firmado el documento de consentimiento.</li>
              <li>El estudiante ha firmado el documento de asentimiento.</li>
              <li>El examen debe realizarse en un dispositivo de escritorio (PC o laptop)</li>
            </ol>
            <p className="mt-2">
              Duración del examen: Aproximadamente 3 minutos (o menos).
              Durante este tiempo, no es necesario que respondas correctamente las preguntas,
              ya que el propósito es exclusivamente probar la funcionalidad de los instrumentos
              tecnológicos que estamos utilizando.
            </p>
            <p className="mt-2 mb-2"><strong>Nota</strong>: Durante la grabación del examen, no se recopilará el audio, solo video.</p>
            <p>Las tecnologías que se utilizan son:</p>
            <ul className="list-disc list-inside mt-4">
              <li><strong>WHENet</strong>: Para estimación de la postura de la cabeza y detectar posibles desviaciones.</li>
              <li><strong>WebGazer.js</strong>: Para rastrear la dirección de la mirada del estudiante y asegurarse de que esté mirando hacia la pantalla durante el examen.</li>
              <li><strong>MediaPipe BlazeFace</strong>: Para detectar la posición y movimientos faciales.</li>
              <li><strong>Algoritmo OCSVM</strong>: Para identificar comportamientos atípicos que puedan indicar posibles irregularidades.</li>
            </ul>
            <p className="mt-2 text-justify">
              Es importante destacar que este es solo un prototipo para verificar el funcionamiento de estas tecnologías.
              No se evaluará el desempeño académico de los estudiantes durante este examen, solo el funcionamiento de los
              instrumentos tecnológicos.
            </p>
          </ScrollArea>
        </CardContent>
        <CardFooter className="grid grid-cols-1 mx-10">
          <div className="flex items-center gap-3">
            <Checkbox id="terms" className="border-2 cursor-pointer" onCheckedChange={(checked: boolean) => {handleAcceptation(checked)}} />
            <Label htmlFor="terms" className="cursor-pointer">He leído el aviso y cumplo con las condiciones mencionadas.</Label>
          </div>
          <div className="grid grid-rows-[auto_auto] justify-start mt-2">
            <div className="flex">
              <BadgeInfo /><p className="ml-2">Elige una condición:</p>
            </div>
            <div>
              <ul className="list-disc list-inside mt-4">
                <li><strong>Trampa: </strong>Indica que buscarás la respuesta en la web.</li>
                <li><strong>Sin trampa: </strong>Indica que responderás las preguntas en base a tu conocimiento sin necesidad de buscar la respuesta en la web.</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-2">
            <Label><strong>Elije un rol:</strong></Label>
            <ToggleGroup className="flex justify-center" type="single" onValueChange={(v) => {
              setSelected(v)
              localStorage.setItem('condition', v.toString())
            }}>
              <ToggleGroupItem className="border-4 cursor-pointer bg-white text-black 
             data-[state=on]:bg-blue-600 data-[state=on]:text-white
             hover:bg-gray-100 hover:text-black
             focus:outline-2 focus:outline-blue-600 focus:outline-offset-2 active:bg-blue-700" 
              value="st" aria-label="sn">
                Sin trampa
              </ToggleGroupItem>
              <ToggleGroupItem className="border-4 cursor-pointer bg-white text-black 
             data-[state=on]:bg-blue-600 data-[state=on]:text-white
             hover:bg-gray-100 hover:text-black
             focus:outline-2 focus:outline-blue-600 focus:outline-offset-2 active:bg-blue-700" 
              value="ct" aria-label="cn">
                Con trampa
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex justify-center mt-5">
            <Button
              onClick={() => redirectToCalibration()}
              className="cursor-pointer"
              disabled={!accepted || selected === ""}
            >
              Ingresar al examen
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
