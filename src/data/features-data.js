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
    title: "¿ Que puedes hacer con ConfiApp ?",
    icon: BellAlertIcon,
    description:
      "Como tutor responsable puedes crear una ruta para uno o varios menores a cargo, y él menor seguir esa ruta predefinida y en caso de cualquier emergencia el menor será dirigido a realizar una llamada a su tutor responsable. También un tutor podrá solicitar realizar una publicación de un reporte de un menor en caso de desaparición.  ",
  },
];

export default featuresData;
