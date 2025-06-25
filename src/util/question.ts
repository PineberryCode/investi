export type Option = {
    option: string,
    color: string
}

export type QO = {
    question: string,
    options: Option[],
    color: string,
}

export const QuestionsAndOptions: QO[] = [
    {
        question: "¿Cuál es el sujeto en la oración “Ayer llegaron los nuevos estudiantes al campus”?",
        options: [
            { option: "Ayer", color: "red" },
            { option: "Al campus", color: "green" },
            { option: "Llegaron", color: "blue" },
            { option: "Los nuevos estudiantes", color: "violet" },
        ],
        color: "indigo",
    },
    {
        question: "¿Qué ocurre con la masa de un objeto cuando se lleva a la Luna?",
        options: [
            { option: "Aumenta", color: "red" },
            { option: "Disminuye", color: "green" },
            { option: "No cambia", color: "blue" },
            { option: "Ninguna de las opciones", color: "violet" },
        ],
        color: "red",
    },
    {
        question: "En la oración “Juan estudia porque quiere ingresar”, ¿qué tipo de oración es?",
        options: [
            { option: "Coordinada copulativa", color: "red" },
            { option: "Subordinada causal", color: "green" },
            { option: "Coordinada disyuntiva", color: "blue" },
            { option: "Subordinada condicional", color: "violet" },
        ],
        color: "orange",
    },
    {
        question: "¿Cuál es la función principal de los ribosomas en la célula?",
        options: [
            { option: "Producción de energía", color: "red" },
            { option: "Digestión celular", color: "green" },
            { option: "Síntesis de proteínas", color: "blue" },
            { option: "Transporte de nutrientes", color: "violet" },
        ],
        color: "amber",
    },
    {
        question: "¿Qué figura literaria se presenta en “Tus ojos son dos luceros”?",
        options: [
            { option: "Hipérbole", color: "red" },
            { option: "Metáfora", color: "green" },
            { option: "Ironía", color: "blue" },
            { option: "Anáfora", color: "violet" },
        ],
        color: "yellow",
    },
    {
        question: "¿Cuál de los siguientes NO es un estado de la materia?",
        options: [
            { option: "Sólido", color: "red" },
            { option: "Gaseoso", color: "green" },
            { option: "Iónico", color: "blue" },
            { option: "Plasmático", color: "violet" },
        ],
        color: "lime",
    },
    {
        question: '¿Cuál es el conector adecuado para la siguiente oración? "Estudió mucho, ___ no aprobó el examen."',
        options: [
            { option: "pero", color: "red" },
            { option: "y", color: "green" },
            { option: "porque", color: "blue" },
            { option: "o", color: "violet" },
        ],
        color: "green",
    },
    {
        question: "¿Cuál es la principal función del sistema operativo?",
        options: [
            { option: "Diseñar interfaces gráficas", color: "red" },
            { option: "Ejecutar código fuente directamente", color: "green" },
            { option: "Gestionar recursos del sistema y coordinar hardware", color: "blue" },
            { option: "Generar archivos ejecutables automáticamente", color: "violet" },
        ],
        color: "emerald",
    },
    {
        question: "¿Qué modelo OSI representa la capa de transporte?",
        options: [
            { option: "Capa 1", color: "red" },
            { option: "Capa 4", color: "green" },
            { option: "Capa 6", color: "blue" },
            { option: "Capa 7", color: "violet" },
        ],
        color: "cyan",
    },
    {
        question: "¿Cuál de las siguientes bases de datos es NoSQL?",
        options: [
            { option: "Oracle", color: "red" },
            { option: "MySQL", color: "green" },
            { option: "PostgreSQL", color: "blue" },
            { option: "MongoDB", color: "violet" },
        ],
        color: "blue",
    },
    {
        question: "En programación orientada a objetos, ¿qué es la herencia?",
        options: [
            { option: "Crear múltiples objetos desde una clase", color: "red" },
            { option: "Reutilizar código de una clase base en una clase derivada", color: "green" },
            { option: "Agrupar funciones en una sola clase", color: "blue" },
            { option: "Crear variables globales", color: "violet" },
        ],
        color: "violet",
    },
    {
        question: "¿Qué protocolo se utiliza para enviar correos electrónicos?",
        options: [
            { option: "FTP", color: "red" },
            { option: "SMTP", color: "green" },
            { option: "HTTP", color: "blue" },
            { option: "POP3", color: "violet" },
        ],
        color: "pink",
    },
    {
        question: "¿Qué es una dirección IP?",
        options: [
            { option: "El número de puerto de una aplicación", color: "red" },
            { option: "Un identificador único de una red inalámbrica", color: "green" },
            { option: "La dirección física de un dispositivo", color: "blue" },
            { option: "Una dirección lógica para identificar dispositivos en red", color: "violet" },
        ],
        color: "rose",
    },
    {
        question: "¿Cuál es la complejidad temporal del algoritmo de búsqueda binaria en el peor caso?",
        options: [
            { option: "O(n)", color: "red" },
            { option: "O(n²)", color: "green" },
            { option: "O(log n)", color: "blue" },
            { option: "O(1)", color: "violet" },
        ],
        color: "blue",
    },
    {
        question: "¿Qué componente de red conecta múltiples dispositivos en una LAN y filtra el tráfico por direcciones MAC?",
        options: [
            { option: "Router", color: "red" },
            { option: "Hub", color: "green" },
            { option: "Switch", color: "blue" },
            { option: "Repetidor", color: "violet" },
        ],
        color: "sky",
    },
]