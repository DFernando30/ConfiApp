import {
  BellAlertIcon,
  CogIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/solid";

export const featuresData = [
  {

    color: "blue-600",
    title: "Misión y visión",
    icon: CogIcon,
    description: [
      "Facilitar la supervisión y comunicación efectiva entre tutores y menores a su cargo, proporcionando una plataforma intuitiva y confiable ", 
      "Convertirnos en la aplicación líder a nivel mundial en la protección y supervisión de menores, ofreciendo soluciones innovadoras y accesibles que promuevan la tranquilidad y confianza de las familias en su día a día.",
    ],
  },
  // {
  //   color: "gray",
  //   title: "De interés para ti",
  //   icon: ShieldCheckIcon,
  //   description:
  //     " Nuestra prioridad es que tengas ubicación del menor en tiempo real y enviar notificaciones instantáneas si se desvía de las rutas predefinidas por el tutor a cargo. Adicional, un tutor puede realizar como solicitudes publicat un menor desaparecido",
  // },
  {
    color: "gray",
    title: "¿ Que es ConfiApp ?",
    icon: BellAlertIcon,
    description:
      "Si un menor necesita comunicar al tutor una desviación para no  preocupar a su tutor responsable, puede enviarle un mensaje o dirigirlo realizar una llamada y avisar anticipadamente la notificación de alerta  ",
  },
];

export default featuresData;
