import React, {useState} from 'react';

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
import {FingerPrintIcon, UsersIcon} from "@heroicons/react/24/solid";
import {PageTitle, Footer, DesaparecidosUpload} from "@/widgets/layout";
import {FeatureCard, TeamCard} from "@/widgets/cards";
import {featuresData, teamData, contactData} from "@/data";




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


    return (
        <>
            <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('/img/background-5.png')] bg-cover bg-center"/>
                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center"/>
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                             Bienvenido a ConfiApp
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                            Planifica las rutas para tus menores a cargo  <br />
                            y mantén una comunicación constante con ellos en todo momento.
                            </Typography>

                                <br />

                                <div className="flex justify-center">
                            <a href="# " className="w-150">
                                <Button variant="text" size="sm" fullWidth style={{ width:"150px", height:"50px", color: "#ffffff", borderRadius:"#000000", border: "2px solid #ffffff" }}>
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
                        {featuresData.map(({color, title, icon, description}) => (
                            <FeatureCard
                                key={title}
                                color={color}
                                title={title}
                                
                                icon={React.createElement(icon, {
                                    
                                    className: "w-5 h-5 text-white  ",
                                })}
                                description={description}
                                
                            />
                        ))}
                    </div>
<br />
<br />

<br />
<div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-5/12 lg:mt-2" style={{ width: '1200px', height: '300px' }}>


    {/* imagen # 1 */}
    <div className="relative rounded-lg overflow-hidden shadow-lg" style={{marginRight: '20px' }}>
        <img
            alt="Imagen de ejemplo"
            src="/img/equipo.jpg"
            className="w-full h-auto"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-75 text-white py-2 px-4">
            <h3 className="text-lg font-bold">Título de la imagen</h3>
            <p className="text-sm">Descripción breve de la imagen</p>
        </div>
    </div>

    {/* imagen # 2 */}
    <div className="relative rounded-lg overflow-hidden shadow-lg" style={{marginRight: '20px' }}>
        <img
            alt="Imagen de ejemplo"
            src="/img/equipo.jpg"
            className="w-full h-auto"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-75 text-white py-2 px-4">
            <h3 className="text-lg font-bold">Título de la imagen</h3>
            <p className="text-sm">Descripción breve de la imagen</p>
        </div>
    </div>

    {/* imagen # 3 */}
    <div className="relative rounded-lg overflow-hidden shadow-lg" style={{marginRight: '20px' }}>
        <img
            alt="Imagen de ejemplo"
            src="/img/equipo.jpg"
            className="w-full h-auto"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-75 text-white py-2 px-4">
            <h3 className="text-lg font-bold">Título de la imagen</h3>
            <p className="text-sm">Descripción breve de la imagen</p>
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
                                Cada integrante de nuestro equipo aporta su talento y dedicación para desarrollar una
                                aplicación que prioriza la seguridad y la tranquilidad de tu familia. Desde el diseño de
                                funciones hasta la implementación de medidas de seguridad, trabajamos juntos para
                                ofrecerte una experiencia fluida y confiable. Nuestro compromiso es asegurarnos de que
                                cada aspecto de la aplicación esté cuidadosamente diseñado para brindarte la mejor
                                experiencia posible.
                                <br/>
                            </Typography>
                            {/* <Button variant="filled">Leer Mas</Button> */}
                        </div>


                    </div>
                </div>
            </section>
            <div className="bg-white">
                <Footer/>
            </div>
        </>
    );
}

export default Home;
