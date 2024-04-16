import { motion, useViewportScroll, useTransform } from 'framer-motion';

import React, { useState } from 'react';

import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    IconButton,
    Input,
    Textarea,
    Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer, DesaparecidosUpload } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";






export function Home() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [posicion, setPosition] = useState(null); // Agrega estado para la posición

    const manejarClicBoton = (position) => {
        setModalAbierto(true);
        setPosition(position); // Guarda la posición en el estado del modal
    };

    const cerrarModal = () => {
        setModalAbierto(false);
    };


    const { scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);






   // ------------------------------
    
   


    return (
        <>
            <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">

                <motion.div
                    style={{ scale }}
                    className="absolute top-0 h-full w-full bg-[url('/img/background-5.png')] bg-cover bg-center"
                />

                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            >
                                <Typography variant="h1" color="white" className="mb-6 font-black">
                                    <motion.span
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                        Bienvenido a ConfiApp
                                    </motion.span>
                                </Typography>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                            >
                                <Typography variant="lead" color="white" className="opacity-80">
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.5 }}
                                    >
                                        Planifica las rutas para tus menores a cargo
                                    </motion.span>
                                    <br />
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.7 }}
                                    >
                                        y mantén una comunicación constante con ellos en todo momento.
                                    </motion.span>
                                </Typography>
                            </motion.div>


                            <br />

                            <div className="flex justify-center">
                                <a href="# " className="w-150">
                                    <Button variant="text" size="sm" fullWidth style={{ width: "150px", height: "50px", color: "#ffffff", borderRadius: "#000000", border: "2px solid #ffffff" }}>
                                        Descargar App
                                    </Button>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <section className="-mt-32 bg-white px-4 pb-20 pt-4" style={{ background: "#f0f0f0" }}>
                <div className="container mx-auto " >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 ">
                        {featuresData.map(({ color, title, icon, description }, index) => (
                            <motion.div
                                key={title}
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 50 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <FeatureCard
                                    color={color}
                                    title={title}
                                    icon={React.createElement(icon, {
                                        className: 'w-5 h-5 text-white',
                                    })}
                                    description={description}
                                />
                            </motion.div>
                        ))}
                    </div>
                    



                    <div class="mx-auto my-24 px-4 sm:px-0 max-w-screen-xl">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="relative rounded-lg overflow-hidden shadow-lg">
            <img
                alt="Imagen de ejemplo"
                src="/img/ruta.jpg"
                class="w-full h-auto"
            />
            <div class="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-75 text-white py-2 px-4">
                <h3 class="text-lg font-bold">Título de la imagen</h3>
                <p class="text-sm">Descripción breve de la imagen</p>
            </div>
        </div>

        <div class="relative rounded-lg overflow-hidden shadow-lg">
            <img
                alt="Imagen de ejemplo"
                src="/img/hablando-2.jpg"
                class="w-full h-auto"
            />
            <div class="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-75 text-white py-2 px-4">
                <h3 class="text-lg font-bold">Título de la imagen</h3>
                <p class="text-sm">Descripción breve de la imagen</p>
            </div>
        </div>

        <div class="relative rounded-lg overflow-hidden shadow-lg">
            <img
                alt="Imagen de ejemplo"
                src="/img/mising.png"
                class="w-full h-auto"
            />
            <div class="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-75 text-white py-2 px-4">
                <h3 class="text-lg font-bold">Título de la imagen</h3>
                <p class="text-sm">Descripción breve de la imagen</p>
            </div>
        </div>
    </div>
</div>







                    <div className="mt-32 flex flex-wrap items-center"
                        id="nosotros">

                        <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-5/12 lg:mt-0">
                            <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                                <CardHeader floated={false} className="relative h-866">
                                    <img
                                        alt="Card Image"
                                        src="/img/equipo.jpg"
                                        className="h-full w-full "
                                    />
                                </CardHeader>
                                <CardBody>
                                    <Typography variant="small" color="blue-gray" className="font-normal"></Typography>
                                    {/* <Typography
                                        variant="h5"
                                        color="blue-gray"
                                        className="mb-3 mt-2 font-bold"
                                    >
                                        Somos un equipo
                                    </Typography>
                                    <Typography className="font-normal text-blue-gray-500">
                                        Transparencia y confiabilidad: Nos comprometemos a mantener una comunicación
                                        abierta y transparente contigo en todo momento.

                                    </Typography> */}
                                </CardBody>
                            </Card>
                        </div>


                        <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
                            {/* <div
                                className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                                <FingerPrintIcon className="h-8 w-8 text-white "/>
                            </div> */}
                            <Typography
                                variant="h3"
                                className="mb-3 font-bold"
                                color="blue-gray"
                            >    ConfiApp:
                                <p></p>
                            </Typography>
                            <Typography className="mb-8 font-normal text-blue-gray-500">
                                Cada miembro de nuestro equipo contribuye con su talento y esfuerzo para desarrollar una aplicación que pone en primer plano el bienestar y la comodidad de tu familia.
                                Desde el diseño de funciones hasta la implementación de medidas de calidad, colaboramos para ofrecerte una experiencia fluida y confiable.
                                Nuestro compromiso es asegurar que cada detalle de la aplicación esté meticulosamente diseñado para proporcionarte la mejor experiencia posible.
                                <br />
                            </Typography>
                            {/* <Button variant="filled">Leer Mas</Button> */}
                        </div>


                    </div>
                </div>
            </section>
            <div className="bg-white">
                <Footer />
            </div>
        </>
    );
}

export default Home;
