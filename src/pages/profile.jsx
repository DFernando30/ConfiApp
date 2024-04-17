import { motion } from 'framer-motion';

import { Input, Avatar, Typography, Button, Card, Textarea, Checkbox } from "@material-tailwind/react";
import {
    MapPinIcon, BriefcaseIcon, BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer, DesaparecidosUpload } from "@/widgets/layout";
import { contactData } from "@/data";
import { PageTitle } from "@/widgets/layout";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import News from "@/widgets/layout/News.jsx";
import ModalMenor from "@/pages/modalmenor";
import '../styles/modalmenor.css';
import { useNavigate } from "react-router-dom";


export function Profile() {

    const navigate = useNavigate()

    const [showChildModal, setShowChildModal] = useState(false);
    const [selectedChild, setSelectedChild] = useState({});// Nuevo estado para controlar el modal del menor

    const openChildModal = (menor) => {
        setSelectedChild(menor);
        setShowChildModal(true);
    };

    const dataUsers = localStorage.getItem("user");
    let idTutor = {};

    if (dataUsers !== null && dataUsers !== undefined) {
        idTutor = JSON.parse(dataUsers);
    } else {
        console.error("No se encontró la información del usuario en el almacenamiento local.");
    }

    const [data, setData] = useState({})
    const [menores, setMenores] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showModalReport, setShowModalReport] = useState(false);
    const [showModalDes, setShowModalDes] = useState(false);
    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        tipoIdentificacion: "",
        numeroIdentificacion: "",
        edad: "",
        telefono: "",
        correo: "",
        idTutor: idTutor.id
    });

    const closeChildModal = () => {
        setShowChildModal(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.nombres ||
            !formData.apellidos ||
            !formData.tipoIdentificacion ||
            !formData.numeroIdentificacion ||
            !formData.edad ||
            !formData.telefono ||
            !formData.correo
        ) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await axios.post("https://nuevomern-7y1b.onrender.com/api/menor", formData);
            console.log(response.data);

            const toastId = toast.success("Registro menor exitoso.");
            setTimeout(() => {
                setFormData({
                    nombres: "",
                    apellidos: "",
                    tipoIdentificacion: "",
                    numeroIdentificacion: "",
                    edad: "",
                    telefono: "",
                    correo: "",
                    idTutor: ""
                })
                toast.dismiss(toastId); // Ocultar el toast después de 3 segundos
                setShowModal(false)
                loadDataUser()
            }, 1000);

        } catch (error) {
            console.error("Error:", error);
            toast.error("Error en el registro, verifica que tus datos sean correctos");
        }

    };

    useEffect(() => {
        loadDataUser()
    }, []);

    const loadDataUser = async () => {
        try {
            const storedUserData = localStorage.getItem("user");
            const userData = JSON.parse(storedUserData);

            const response = await axios.get("https://nuevomern-7y1b.onrender.com/api/profile", {
                headers: {
                    Authorization: userData.token
                }
            });

            const responseMinMenores = await axios.get(`https://nuevomern-7y1b.onrender.com/api/menores/${idTutor.id}`);
            setMenores(responseMinMenores.data);
            setData(response.data);

        } catch (error) {
            console.error("Error:", error.response.data);
        }
    }


    //_-_----------------


    // Definimos las opciones del menú
    const menuOptions = [
        { label: ' Ver reportes', action: () => setShowModalDes(true) },
        { label: ' Cerrar sesion', action: () => logoutUsers() }
    ];

    // Estado para controlar la visibilidad del menú desplegable
    const [menuOpen, setMenuOpen] = useState(false);

    // Función para manejar el clic en el ícono del menú
    const handleMenuClick = () => {
        setMenuOpen(!menuOpen); // Cambiamos el estado para mostrar u ocultar el menú
    };

    // Función para manejar las acciones del menú
    const handleMenuOptionClick = (action) => {
        action(); // Ejecutamos la acción asociada a la opción del menú
        setMenuOpen(false); // Ocultamos el menú después de hacer clic en una opción
    };

    const [dataDes, setDataDes] = useState({
        nombre: "",
        foto: "",
        descripcion: "",
        aceptaTerminos: false // Nuevo estado para el checkbox
    });

    const handleSubmitDes = async () => {

        if (
            !dataDes.nombre ||
            !dataDes.foto ||
            !dataDes.descripcion ||
            !dataDes.aceptaTerminos // Verificamos que el usuario haya aceptado los términos
        ) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        const formData = new FormData();
        formData.append('nombre', dataDes.nombre);
        formData.append('imagePhoto', dataDes.foto);
        formData.append('descripcion', dataDes.descripcion);

        try {
            const response = await axios.post("https://nuevomern-7y1b.onrender.com/api/noticias", formData);
            console.log(response.data);
            const toastId = toast.success("Tu publicación está en proceso de revisión por el administrador.");
            setTimeout(() => {
                toast.dismiss(toastId);
                setShowModalReport(false)
                setDataDes({
                    nombre: "",
                    foto: "",
                    descripcion: "",
                    aceptaTerminos: false // Restablecemos el estado del checkbox
                })
            }, 2000);

        } catch (error) {
            console.error("Error:", error);
            toast.error("Error en el reporte.");
        }

    };

    const logoutUsers = () => {
        localStorage.clear()
        toast.success("Sesion cerrada")
        setTimeout(() => {
            navigate("/home")
        }, 1500)
    }


    const handleImageChange = (e) => {
        setDataDes({...dataDes, foto: e.target.files[0]});
    };




     // Estado para controlar el modal de términos y condiciones
     const [showModalTerms, setShowModalTerms] = useState(false); // Estado para controlar la visibilidad del modal de términos y condiciones

     const handleToggleModalTerms = () => {
         setShowModalTerms(!showModalTerms); // Función para alternar la visibilidad del modal
     };

    return (
        <>
            <section className="relative block h-[50vh]">
                <Toaster />
                <div
                    className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/backi.png')] bg-cover bg-center scale-100" />
                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />

                {/* Botón del menú */}
                <span
                    className="bg-[#7ED2F3] rounded-md p-2.5 cursor-pointer hover:bg-blue-00 transition-colors duration-300 absolute top-4 right-9 z-100"
                    style={{ width: "50px", height: "50px" }}
                    onClick={() => handleMenuClick()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-black"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3zm0 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8zm0 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>


                {/* Menú desplegable */}
                {menuOpen && (
                    <div className="absolute top-10 right-20 bg-white shadow-md rounded-md ">
                        {menuOptions.map((option, index) => (
                            <div
                                key={index}
                                className="p-3 hover:bg-[#4D5AA6]  text-[#000000] cursor-pointer  "
                                style={{ width: "200px" }}

                                onClick={() => handleMenuOptionClick(option.action)}>
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}

            </section>

            <section className="relative bg-white py-16">
                <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
                    <div className="container mx-auto">
                        <div className="flex flex-col lg:flex-row justify-between">
                            <div className="relative flex gap-6 items-start">

                                <div className="-mt-20 w-40">
                                    <Avatar
                                        src="/img/perfil2.png"
                                        alt="Profile picture"
                                        variant="circular"
                                        className="h-full w-full"
                                    />
                                </div>
                                <div className="flex flex-col mt-2">
                                    <Typography variant="h4" color="blue-gray">
                                        {data.nombres} {data.apellidos}
                                    </Typography>
                                    <Typography variant="paragraph" color="gray"
                                        className="!mt-0 font-normal">{data.email}</Typography>

                                    <div className="flex items-center gap-2">
                                        <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                                        <Typography className="font-medium text-blue-gray-500">
                                            Tel: {data.telefono}
                                        </Typography>

                                    </div>
                                </div>


                            </div>


                            <div className="mt-8 mb-10 flex justify-center gap-4  ">
                                <Button
                                    style={{ background: "#7ED2F3", color: "#000000" }}
                                    type="button"
                                    onClick={() => setShowModal(true)}>
                                    Agregar un menor
                                </Button>


                                <Button
                                    style={{ background: "#7ED2F3", color: "#000000" }}
                                    type="button"
                                    onClick={() => setShowModalReport(true)}
                                >
                                    Reportar un menor desaparecido
                                </Button>

                                <img src="/img/logopngconfiazul-copia.png" alt="" style={{ width: "50px" }} />




                                <div className="mr-200 p-3 text-center -ml-4">


                                    {showChildModal && (
                                        <ModalMenor
                                            onClose={closeChildModal}
                                            childInfo={selectedChild}
                                        />
                                    )}


                                </div>


                                <div className="mr-4 p-3 text-center">

                                </div>
                                {/* <div className="p-3 text-center lg:mr-4">
                                                    <Typography
                                                        variant="lead"
                                                        color="blue-gray"
                                                        className="font-bold uppercase">
                                                        10
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-blue-gray-500">
                                                        Rutas realizadas
                                                    </Typography>
                                                </div> */}
                            </div>

                        </div>
                    </div>
                    <div className="-mt-4 container space-y-2">
                        {/* <div className="flex items-center gap-2">
                                <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500"/>
                                <Typography className="font-medium text-blue-gray-500">
                                    Tel: {data.telefono}
                                </Typography>
                            </div> */}


                    </div>


                    <div className="container mx-auto mt-8">
                        <div className="  bg-blue-100 px-4 py-6 rounded-lg shadow-md ">
                            <Typography
                                variant="lead"
                                color="blueGray"
                                className="font-bold text-sm uppercase mb-4">
                                Menores a Cargo
                            </Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {menores.map((menor) => (

                                    <div key={menor._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <Typography className="font-bold text-blueGray-700">
                                            {menor.nombres} {menor.apellidos}
                                        </Typography>
                                        <Typography className="text-blueGray-500">
                                            {menor.edad} años
                                        </Typography>

                                        <button
                                            className="text-[#4D5AA6] font-semibold hover:underline focus:outline-none focus:text-blue-600 transition duration-200"
                                            onClick={() => openChildModal(menor)}>
                                            Ver Detalles
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="mb-10 py-6">

                    </div>

                </div>

            </section>


            <div className="bg-white">
                <Footer />
            </div>


            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div
                        className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <Typography variant="h5" className="font-bold mb-4">
                                        Registro Menor
                                    </Typography>

                                    <div className="grid grid-cols-1 gap-3">

                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Nombres:
                                        </Typography>
                                        <Input
                                            type="text"
                                            size="regular"
                                            placeholder="Nombres"
                                            value={formData.nombres}
                                            onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                                        />
                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Apellidos:
                                        </Typography>
                                        <Input
                                            type="text"
                                            size="regular"
                                            placeholder="Apellidos"
                                            value={formData.apellidos}
                                            onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                                        />

                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Tipo de identificación:
                                        </Typography>
                                        <select
                                            value={formData.tipoIdentificacion}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                tipoIdentificacion: e.target.value
                                            })}
                                            className="border-t border-blue-gray-200 focus:border-gray-900 px-4 py-2 rounded-md"
                                        >
                                            <option value="">
                                                Selecciona tu tipo de identificación:
                                            </option>
                                            <option value="tarjeta de identidad">Tarjeta de identidad</option>
                                            <option value="registro">Registro</option>
                                        </select>
                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Número de identificación:
                                        </Typography>
                                        <Input
                                            type="number"
                                            size="regular"
                                            placeholder="Número de identificación"
                                            value={formData.numeroIdentificacion}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                numeroIdentificacion: e.target.value
                                            })}
                                        />
                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Edad:
                                        </Typography>
                                        <Input
                                            type="number"
                                            size="regular"
                                            placeholder="Edad"
                                            value={formData.edad}
                                            onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                                        />
                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Teléfono:
                                        </Typography>
                                        <Input
                                            type="number"
                                            size="regular"
                                            placeholder="Teléfono"
                                            value={formData.telefono}
                                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                        />
                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Correo electrónico:
                                        </Typography>
                                        <Input
                                            type="email"
                                            size="regular"
                                            placeholder="Correo electrónico"
                                            value={formData.correo}
                                            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <Button
                                        style={{ background: "#7ED2F3", color: "#000000" }}
                                        type="submit"
                                        color="blue"
                                        buttonType="filled"
                                        size="regular"
                                        block={false}
                                        iconOnly={false}
                                        ripple="light"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Registrar menor
                                    </Button>
                                    <Button
                                        color="gray"
                                        buttonType="filled"
                                        size="regular"
                                        block={false}
                                        iconOnly={false}
                                        ripple="light"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setShowModal(false)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showModalReport && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div
                        className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <Typography variant="h5" className="font-bold mb-4">
                                        Reportar Menor Desaparecido
                                    </Typography>
                                    <div>

                                        <div className="my-4 flex gap-8">
                                            <Input
                                                variant="outlined" size="sm"
                                                label="Nombre completo del menor"
                                                value={dataDes.nombre}
                                                onChange={(e) => setDataDes({ ...dataDes, nombre: e.target.value })} />
                                        </div>

                                        <div className="my-4 flex gap-8">
                                            <Input type="file" id="imageInput" accept="image/* " name="imagePhoto" variant="outlined" size="sm"
                                                label="Foto del menor"
                                                onChange={handleImageChange} />
                                        </div>

                                        <Textarea variant="outlined" size="sm"
                                            label="Descripcion y donde fue visto por última vez. (También agrega un número de contacto)"
                                            rows={5}
                                            value={dataDes.descripcion}
                                            onChange={(e) => setDataDes({
                                                ...dataDes,
                                                descripcion: e.target.value
                                            })} />

                                        {/* Agregamos el campo de Checkbox */}
                                        <div className="mt-0 flex items-center gap-1">
                                            <Checkbox
                                                checked={dataDes.aceptaTerminos}
                                                onChange={(e) => setDataDes({
                                                    ...dataDes,
                                                    aceptaTerminos: e.target.checked
                                                })}
                                            />
                                           <Typography
                                                variant="small"
                                                color="gray"
                                                className="flex items-center justify-start font-medium"
                                            >
                                                Aceptas &nbsp;
                                                <a
                                                 href="#"
                                                onClick={handleToggleModalTerms}
                                                className="font-normal text-black transition-colors hover:text-gray-900 underline"
                                             >
                                            Términos y condiciones
                                           </a>
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <Button
                                        style={{ background: "#7ED2F3", color: "#000000" }}
                                        type="button"
                                        color="blue"
                                        buttonType="filled"
                                        size="regular"
                                        block={false}
                                        iconOnly={false}
                                        ripple="light"
                                        onClick={() => handleSubmitDes()}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Enviar reporte
                                    </Button>
                                    <Button
                                        color="gray"
                                        buttonType="filled"
                                        size="regular"
                                        block={false}
                                        iconOnly={false}
                                        ripple="light"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setShowModalReport(false)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModalDes && (
                <div className="modal">
                    <div className="flex flex-col items-center modal-contenido w-full h-full">
                        <div className="flex flex-col items-center">
                            <News />
                            <Button className="w-full my-5" 
                             style={{ background: "#4D5AA6", color: "#ffffff" }}
                            onClick={() => setShowModalDes(false)} color="blue-gray"
                                ripple="light">
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}






              {/* Modal de términos y condiciones */}
            {/* Modal de términos y condiciones */}
            {showModalTerms && (
    <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <Typography variant="paragraph">
                <strong>LEY DE HABEAS DATA</strong>
                 <p></p>
                <strong>LEY ESTATUTARIA 1581 DE 2012</strong>
<br/>
<br/>
LEY ESTATUTARIA 1581 DE 2012
OTRAS DISPOSICIONES
(octubre 17)
Diario Oficial No. 48.587 de 18 de octubre de 2012
CONGRESO DE LA REPÚBLICA
Por la cual se dictan disposiciones generales para la protección de datos personales.
EL CONGRESO DE COLOMBIA
DECRETA:
ARTÍCULO 1o. OBJETO. La presente ley tiene por objeto desarrollar el derecho
constitucional que tienen todas las personas a conocer, actualizar y rectificar las
informaciones que se hayan recogido sobre ellas en bases de datos o archivos, y los
demás derechos, libertades y garantías constitucionales a que se refiere el artículo 15 de
la Constitución Política; así como el derecho a la información consagrado en el artículo 20
de la misma.<br></br>
ARTÍCULO 2o. ÁMBITO DE APLICACIÓN. Los principios y disposiciones contenidas en
la presente ley serán aplicables a los datos personales registrados en cualquier base de
datos que los haga susceptibles de tratamiento por entidades de naturaleza pública o
privada.
La presente ley aplicará al tratamiento de datos personales efectuado en territorio
colombiano o cuando al Responsable del Tratamiento o Encargado del Tratamiento no
establecido en territorio nacional le sea aplicable la legislación colombiana en virtud de
normas y tratados internacionales.
El régimen de protección de datos personales que se establece en la presente ley no será
de aplicación:
a) A las bases de datos o archivos mantenidos en un ámbito exclusivamente personal o
doméstico.
Cuando estas bases de datos o archivos vayan a ser suministrados a terceros se deberá,
de manera previa, informar al Titular y solicitar su autorización. En este caso los
Responsables y Encargados de las bases de datos y archivos quedarán sujetos a las
disposiciones contenidas en la presente ley;
b) A las bases de datos y archivos que tengan por finalidad la seguridad y defensa
nacional, así como la prevención, detección, monitoreo y control del lavado de activos y el
financiamiento del terrorismo;
c) A las Bases de datos que tengan como fin y contengan información de inteligencia y
contrainteligencia;
d) A las bases de datos y archivos de información periodística y otros contenidos
editoriales;
e) A las bases de datos y archivos regulados por la Ley 1266 de 2008;
f) A las bases de datos y archivos regulados por la Ley 79 de 1993.
PARÁGRAFO. Los principios sobre protección de datos serán aplicables a todas las
bases de datos, incluidas las exceptuadas en el presente artículo, con los límites
dispuestos en la presente ley y sin reñir con los datos que tienen características de estar
amparados por la reserva legal. En el evento que la normatividad especial que regule las
bases de datos exceptuadas prevea principios que tengan en consideración la naturaleza
especial de datos, los mismos aplicarán de manera concurrente a los previstos en la
presente ley.<br></br>
ARTÍCULO 3o. DEFINICIONES. Para los efectos de la presente ley, se entiende por:
a) Autorización: Consentimiento previo, expreso e informado del Titular para llevar a cabo
el Tratamiento de datos personales;
b) Base de Datos: Conjunto organizado de datos personales que sea objeto de
Tratamiento;
c) Dato personal: Cualquier información vinculada o que pueda asociarse a una o varias
personas naturales determinadas o determinables;
d) Encargado del Tratamiento: Persona natural o jurídica, pública o privada, que por sí
misma o en asocio con otros, realice el Tratamiento de datos personales por cuenta del
Responsable del Tratamiento;
e) Responsable del Tratamiento: Persona natural o jurídica, pública o privada, que por sí
misma o en asocio con otros, decida sobre la base de datos y/o el Tratamiento de los
datos;
f) Titular: Persona natural cuyos datos personales sean objeto de Tratamiento;
g) Tratamiento: Cualquier operación o conjunto de operaciones sobre datos personales,
tales como la recolección, almacenamiento, uso, circulación o supresión.
Título II. Principios Rectores
ARTÍCULO 4o. PRINCIPIOS PARA EL TRATAMIENTO DE DATOS PERSONALES. En
el desarrollo, interpretación y aplicación de la presente ley, se aplicarán, de manera
armónica e integral, los siguientes principios:
a) Principio de legalidad en materia de Tratamiento de datos: El Tratamiento a que
se refiere la presente ley es una actividad reglada que debe sujetarse a lo
establecido en ella y en las demás disposiciones que la desarrollen;
b) Principio de finalidad: El Tratamiento debe obedecer a una finalidad legítima de
acuerdo con la Constitución y la Ley, la cual debe ser informada al Titular;
c) Principio de libertad: El Tratamiento sólo puede ejercerse con el
consentimiento, previo, expreso e informado del Titular. Los datos personales no
podrán ser obtenidos o divulgados sin previa autorización, o en ausencia de
mandato legal o judicial que releve el consentimiento;
d) Principio de veracidad o calidad: La información sujeta a Tratamiento debe ser
veraz, completa, exacta, actualizada, comprobable y comprensible. Se prohíbe el
Tratamiento de datos parciales, incompletos, fraccionados o que induzcan a error;
e) Principio de transparencia: En el Tratamiento debe garantizarse el derecho del
Titular a obtener del Responsable del Tratamiento o del Encargado del
Tratamiento, en cualquier momento y sin restricciones, información acerca de la
existencia de datos que le conciernan;<br></br>
f) Principio de acceso y circulación restringida: El Tratamiento se sujeta a los
límites que se derivan de la naturaleza de los datos personales, de las
disposiciones de la presente ley y la Constitución. En este sentido, el Tratamiento
sólo podrá hacerse por personas autorizadas por el Titular y/o por las personas
previstas en la presente ley;
Los datos personales, salvo la información pública, no podrán estar disponibles en
Internet u otros medios de divulgación o comunicación masiva, salvo que el
acceso sea técnicamente controlable para brindar un conocimiento restringido
sólo a los Titulares o terceros autorizados conforme a la presente ley;
g) Principio de seguridad: La información sujeta a Tratamiento por el Responsable
del Tratamiento o Encargado del Tratamiento a que se refiere la presente ley, se
deberá manejar con las medidas técnicas, humanas y administrativas que sean
necesarias para otorgar seguridad a los registros evitando su adulteración,
pérdida, consulta, uso o acceso no autorizado o fraudulento;
h) Principio de confidencialidad: Todas las personas que intervengan en el
Tratamiento de datos personales que no tengan la naturaleza de públicos están
obligadas a garantizar la reserva de la información, inclusive después de
finalizada su relación con alguna de las labores que comprende el Tratamiento,
pudiendo sólo realizar suministro o comunicación de datos personales cuando ello
corresponda al desarrollo de las actividades autorizadas en la presente ley y en
los términos de la misma.<br></br>
b) Título III. Categorías Especiales de Datos
c) ARTÍCULO 5o. DATOS SENSIBLES. Para los propósitos de la presente ley, se
entiende por datos sensibles aquellos que afectan la intimidad del Titular o cuyo
uso indebido puede generar su discriminación, tales como aquellos que revelen el
origen racial o étnico, la orientación política, las convicciones religiosas o
filosóficas, la pertenencia a sindicatos, organizaciones sociales, de derechos
humanos o que promueva intereses de cualquier partido político o que garanticen
los derechos y garantías de partidos políticos de oposición así como los datos
relativos a la salud, a la vida sexual y los datos biométricos.
d) ARTÍCULO 6o. TRATAMIENTO DE DATOS SENSIBLES. Se prohíbe el
Tratamiento de datos sensibles, excepto cuando:
e) a) El Titular haya dado su autorización explícita a dicho Tratamiento, salvo en los
casos que por ley no sea requerido el otorgamiento de dicha autorización;
b) El Tratamiento sea necesario para salvaguardar el interés vital del Titular y este
se encuentre física o jurídicamente incapacitado. En estos eventos, los
representantes legales deberán otorgar su autorización;
c) El Tratamiento sea efectuado en el curso de las actividades legítimas y con las
debidas garantías por parte de una fundación, ONG, asociación o cualquier otro
organismo sin ánimo de lucro, cuya finalidad sea política, filosófica, religiosa o
sindical, siempre que se refieran exclusivamente a sus miembros o a las personas
que mantengan contactos regulares por razón de su finalidad. En estos eventos,
los datos no se podrán suministrar a terceros sin la autorización del Titular;
d) El Tratamiento se refiera a datos que sean necesarios para el reconocimiento,
ejercicio o defensa de un derecho en un proceso judicial;
e) El Tratamiento tenga una finalidad histórica, estadística o científica. En este
evento deberán adoptarse las medidas conducentes a la supresión de identidad
de los Titulares.<br></br>
ARTÍCULO 7o. DERECHOS DE LOS NIÑOS, NIÑAS Y ADOLESCENTES. En el
Tratamiento se asegurará el respeto a los derechos prevalentes de los niños,
niñas y adolescentes.
Queda proscrito el Tratamiento de datos personales de niños, niñas y
adolescentes, salvo aquellos datos que sean de naturaleza pública.
Es tarea del Estado y las entidades educativas de todo tipo proveer información y
capacitar a los representantes legales y tutores sobre los eventuales riesgos a los
que se enfrentan los niños, niñas y adolescentes respecto del Tratamiento
indebido de sus datos personales, y proveer de conocimiento acerca del uso
responsable y seguro por parte de niños, niñas y adolescentes de sus datos
personales, su derecho a la privacidad y protección de su información personal y
la de los demás. El Gobierno Nacional reglamentará la materia, dentro de los seis
(6) meses siguientes a la promulgación de esta ley.
Título IV. Derechos y Condiciones de Legalidad para El Tratamiento de Datos
ARTÍCULO 8o. DERECHOS DE LOS TITULARES. El Titular de los datos personales
tendrá los siguientes derechos:<br></br>
a) Conocer, actualizar y rectificar sus datos personales frente a los Responsables del
Tratamiento o Encargados del Tratamiento. Este derecho se podrá ejercer, entre otros
frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o
aquellos cuyo Tratamiento esté expresamente prohibido o no haya sido autorizado;
b) Solicitar prueba de la autorización otorgada al Responsable del Tratamiento salvo
cuando expresamente se exceptúe como requisito para el Tratamiento, de conformidad
con lo previsto en el artículo 10 de la presente ley;
c) Ser informado por el Responsable del Tratamiento o el Encargado del Tratamiento,
previa solicitud, respecto del uso que le ha dado a sus datos personales;
d) Presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a lo
dispuesto en la presente ley y las demás normas que la modifiquen, adicionen o
complementen;
e) Revocar la autorización y/o solicitar la supresión del dato cuando en el Tratamiento no
se respeten los principios, derechos y garantías constitucionales y legales. La revocatoria
y/o supresión procederá cuando la Superintendencia de Industria y Comercio haya
determinado que en el Tratamiento el Responsable o Encargado han incurrido en
conductas contrarias a esta ley y a la Constitución;
f) Acceder en forma gratuita a sus datos personales que hayan sido objeto de
Tratamiento.
ARTÍCULO 9o. AUTORIZACIÓN DEL TITULAR. Sin perjuicio de las excepciones
previstas en la ley, en el Tratamiento se requiere la autorización previa e informada del
Titular, la cual deberá ser obtenida por cualquier medio que pueda ser objeto de consulta
posterior.<br></br>
ARTÍCULO 10. CASOS EN QUE NO ES NECESARIA LA AUTORIZACIÓN. La
autorización del Titular no será necesaria cuando se trate de:
a) Información requerida por una entidad pública o administrativa en ejercicio de sus
funciones legales o por orden judicial;
b) Datos de naturaleza pública;
c) Casos de urgencia médica o sanitaria;
d) Tratamiento de información autorizado por la ley para fines históricos, estadísticos o
científicos;
e) Datos relacionados con el Registro Civil de las Personas.
Quien acceda a los datos personales sin que medie autorización previa deberá en todo
caso cumplir con las disposiciones contenidas en la presente ley.
ARTÍCULO 11. SUMINISTRO DE LA INFORMACIÓN. La información solicitada podrá
ser suministrada por cualquier medio, incluyendo los electrónicos, según lo requiera el
Titular. La información deberá ser de fácil lectura, sin barreras técnicas que impidan su
acceso y deberá corresponder en un todo a aquella que repose en la base de datos.
El Gobierno Nacional establecerá la forma en la cual los Responsables del Tratamiento y
Encargados del Tratamiento deberán suministrar la información del Titular, atendiendo a
la naturaleza del dato personal, Esta reglamentación deberá darse a más tardar dentro del
año siguiente a la promulgación de la presente ley.<br></br>
ARTÍCULO 12. DEBER DE INFORMAR AL TITULAR. El Responsable del Tratamiento,
al momento de solicitar al Titular la autorización, deberá informarle de manera clara y
expresa lo siguiente:<br></br>
a) El Tratamiento al cual serán sometidos sus datos personales y la finalidad del mismo;
b) El carácter facultativo de la respuesta a las preguntas que le sean hechas, cuando
estas versen sobre datos sensibles o sobre los datos de las niñas, niños y adolescentes;
c) Los derechos que le asisten como Titular;
d) La identificación, dirección física o electrónica y teléfono del Responsable del
Tratamiento.<br></br>
PARÁGRAFO. El Responsable del Tratamiento deberá conservar prueba del
cumplimiento de lo previsto en el presente artículo y, cuando el Titular lo solicite,
entregarle copia de esta.
ARTÍCULO 13. PERSONAS A QUIENES SE LES PUEDE SUMINISTRAR LA
INFORMACIÓN. La información que reúna las condiciones establecidas en la presente
ley podrá suministrarse a las siguientes personas:
a) A los Titulares, sus causahabientes o sus representantes legales;
b) A las entidades públicas o administrativas en ejercicio de sus funciones legales o por
orden judicial;
c) A los terceros autorizados por el Titular o por la ley.<br></br>
Título V. Procedimientos
ARTÍCULO 14. CONSULTAS. Los Titulares o sus causahabientes podrán consultar la
información personal del Titular que repose en cualquier base de datos, sea esta del
sector público o privado. El Responsable del Tratamiento o Encargado del Tratamiento
deberán suministrar a estos toda la información contenida en el registro individual o que
esté vinculada con la identificación del Titular.
La consulta se formulará por el medio habilitado por el Responsable del Tratamiento o
Encargado del Tratamiento, siempre y cuando se pueda mantener prueba de esta.
PUBLICIDAD
La consulta será atendida en un término máximo de diez (10) días hábiles contados a
partir de la fecha de recibo de la misma. Cuando no fuere posible atender la consulta
dentro de dicho término, se informará al interesado, expresando los motivos de la demora
y señalando la fecha en que se atenderá su consulta, la cual en ningún caso podrá
superar los cinco (5) días hábiles siguientes al vencimiento del primer término.
PARÁGRAFO. Las disposiciones contenidas en leyes especiales o los reglamentos
expedidos por el Gobierno Nacional podrán establecer términos inferiores, atendiendo a la
naturaleza del dato personal.<br></br>
ARTÍCULO 15. RECLAMOS. El Titular o sus causahabientes que consideren que la
información contenida en una base de datos debe ser objeto de corrección, actualización
o supresión, o cuando adviertan el presunto incumplimiento de cualquiera de los deberes
contenidos en esta ley, podrán presentar un reclamo ante el Responsable del Tratamiento
o el Encargado del Tratamiento el cual será tramitado bajo las siguientes reglas:
1. El reclamo se formulará mediante solicitud dirigida al Responsable del Tratamiento o al
Encargado del Tratamiento, con la identificación del Titular, la descripción de los hechos
que dan lugar al reclamo, la dirección, y acompañando los documentos que se quiera
hacer valer. Si el reclamo resulta incompleto, se requerirá al interesado dentro de los
cinco (5) días siguientes a la recepción del reclamo para que subsane las fallas.
Transcurridos dos (2) meses desde la fecha del requerimiento, sin que el solicitante
presente la información requerida, se entenderá que ha desistido del reclamo.
En caso de que quien reciba el reclamo no sea competente para resolverlo, dará traslado
a quien corresponda en un término máximo de dos (2) días hábiles e informará de la
situación al interesado.<br></br>
2. Una vez recibido el reclamo completo, se incluirá en la base de datos una leyenda que
diga “reclamo en trámite” y el motivo del mismo, en un término no mayor a dos (2) días
hábiles. Dicha leyenda deberá mantenerse hasta que el reclamo sea decidido.
3. El término máximo para atender el reclamo será de quince (15) días hábiles contados a
partir del día siguiente a la fecha de su recibo. Cuando no fuere posible atender el
reclamo dentro de dicho término, se informará al interesado los motivos de la demora y la
fecha en que se atenderá su reclamo, la cual en ningún caso podrá superar los ocho (8)
días hábiles siguientes al vencimiento del primer término.
ARTÍCULO 16. REQUISITO DE PROCEDIBILIDAD. El Titular o causahabiente sólo
podrá elevar queja ante la Superintendencia de Industria y Comercio una vez haya
agotado el trámite de consulta o reclamo ante el Responsable del Tratamiento o
Encargado del Tratamiento.<br></br>
Título VI. Deberes de los Responsables del Tratamiento y Encargados del Tratamiento
ARTÍCULO 17. DEBERES DE LOS RESPONSABLES DEL TRATAMIENTO. Los
Responsables del Tratamiento deberán cumplir los siguientes deberes, sin perjuicio de las
demás disposiciones previstas en la presente ley y en otras que rijan su actividad:
a) Garantizar al Titular, en todo tiempo, el pleno y efectivo ejercicio del derecho de hábeas
data;
b) Solicitar y conservar, en las condiciones previstas en la presente ley, copia de la
respectiva autorización otorgada por el Titular;
c) Informar debidamente al Titular sobre la finalidad de la recolección y los derechos que
le asisten por virtud de la autorización otorgada;
d) Conservar la información bajo las condiciones de seguridad necesarias para impedir su
adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento;
e) Garantizar que la información que se suministre al Encargado del Tratamiento sea
veraz, completa, exacta, actualizada, comprobable y comprensible;
f) Actualizar la información, comunicando de forma oportuna al Encargado del
Tratamiento, todas las novedades respecto de los datos que previamente le haya
suministrado y adoptar las demás medidas necesarias para que la información
suministrada a este se mantenga actualizada;
g) Rectificar la información cuando sea incorrecta y comunicar lo pertinente al Encargado
del Tratamiento;
h) Suministrar al Encargado del Tratamiento, según el caso, únicamente datos cuyo
Tratamiento esté previamente autorizado de conformidad con lo previsto en la presente
ley;
i) Exigir al Encargado del Tratamiento en todo momento, el respeto a las condiciones de
seguridad y privacidad de la información del Titular;
j) Tramitar las consultas y reclamos formulados en los términos señalados en la presente
ley;
k) Adoptar un manual interno de políticas y procedimientos para garantizar el adecuado
cumplimiento de la presente ley y en especial, para la atención de consultas y reclamos;
l) Informar al Encargado del Tratamiento cuando determinada información se encuentra
en discusión por parte del Titular, una vez se haya presentado la reclamación y no haya
finalizado el trámite respectivo;
m) Informar a solicitud del Titular sobre el uso dado a sus datos;
n) Informar a la autoridad de protección de datos cuando se presenten violaciones a los
códigos de seguridad y existan riesgos en la administración de la información de los
Titulares.
o) Cumplir las instrucciones y requerimientos que imparta la Superintendencia de Industria
y Comercio.<br></br>
ARTÍCULO 18. DEBERES DE LOS ENCARGADOS DEL TRATAMIENTO. Los
Encargados del Tratamiento deberán cumplir los siguientes deberes, sin perjuicio de las
demás disposiciones previstas en la presente ley y en otras que rijan su actividad:
a) Garantizar al Titular, en todo tiempo, el pleno y efectivo ejercicio del derecho de hábeas
data;
b) Conservar la información bajo las condiciones de seguridad necesarias para impedir su
adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento;
c) Realizar oportunamente la actualización, rectificación o supresión de los datos en los
términos de la presente ley;
d) Actualizar la información reportada por los Responsables del Tratamiento dentro de los
cinco (5) días hábiles contados a partir de su recibo;
e) Tramitar las consultas y los reclamos formulados por los Titulares en los términos
señalados en la presente ley;
f) Adoptar un manual interno de políticas y procedimientos para garantizar el adecuado
cumplimiento de la presente ley y, en especial, para la atención de consultas y reclamos
por parte de los Titulares;
g) Registrar en la base de datos las leyenda “reclamo en trámite” en la forma en que se
regula en la presente ley;
h) Insertar en la base de datos la leyenda “información en discusión judicial” una vez
notificado por parte de la autoridad competente sobre procesos judiciales relacionados
con la calidad del dato personal;
i) Abstenerse de circular información que esté siendo controvertida por el Titular y cuyo
bloqueo haya sido ordenado por la Superintendencia de Industria y Comercio;
j) Permitir el acceso a la información únicamente a las personas que pueden tener acceso
a ella;
k) Informar a la Superintendencia de Industria y Comercio cuando se presenten
violaciones a los códigos de seguridad y existan riesgos en la administración de la
información de los Titulares;
l) Cumplir las instrucciones y requerimientos que imparta la Superintendencia de Industria
y Comercio.<br></br>
PARÁGRAFO. En el evento en que concurran las calidades de Responsable del
Tratamiento y Encargado del Tratamiento en la misma persona, le será exigible el
cumplimiento de los deberes previstos para cada uno.
Título VII. De los Mecanismos de Vigilancia y Sanción
Capítulo I.
De La Autoridad de Protección de Datos
ARTÍCULO 19. AUTORIDAD DE PROTECCIÓN DE DATOS.
 La Superintendencia de Industria y Comercio, a través
de una Delegatura para la Protección de Datos Personales, ejercerá la vigilancia para
garantizar que en el Tratamiento de datos personales se respeten los principios,
derechos, garantías y procedimientos previstos en la presente ley.
PARÁGRAFO 1o. El Gobierno Nacional en el plazo de seis (6) meses contados a partir de
la fecha de entrada en vigencia de la presente ley incorporará dentro de la estructura de la
Superintendencia de Industria y Comercio un despacho de Superintendente Delegado
para ejercer las funciones de Autoridad de Protección de Datos.
PARÁGRAFO 2o. La vigilancia del tratamiento de los datos personales regulados en la
Ley 1266 de 2008 se sujetará a lo previsto en dicha norma.
ARTÍCULO 20. RECURSOS PARA EL EJERCICIO DE SUS FUNCIONES. La
Superintendencia de Industria y Comercio contará con los siguientes recursos para
ejercer las funciones que le son atribuidas por la presente ley:
a) Los recursos que le sean destinados en el Presupuesto General de la Nación.
ARTÍCULO 21. FUNCIONES.La Superintendencia de Industria y Comercio ejercerá las
siguientes funciones:
a) Velar por el cumplimiento de la legislación en materia de protección de datos
personales;
b) Adelantar las investigaciones del caso, de oficio o a petición de parte y, como resultado
de ellas, ordenar las medidas que sean necesarias para hacer efectivo el derecho de
hábeas data. Para el efecto, siempre que se desconozca el derecho, podrá disponer que
se conceda el acceso y suministro de los datos, la rectificación, actualización o supresión
de los mismos;
c) Disponer el bloqueo temporal de los datos cuando, de la solicitud y de las pruebas
aportadas por el Titular, se identifique un riesgo cierto de vulneración de sus derechos
fundamentales, y dicho bloqueo sea necesario para protegerlos mientras se adopta una
decisión definitiva;
d) Promover y divulgar los derechos de las personas en relación con el Tratamiento de
datos personales e implementará campañas pedagógicas para capacitar e informar a los
ciudadanos acerca del ejercicio y garantía del derecho fundamental a la protección de
datos;
e) Impartir instrucciones sobre las medidas y procedimientos necesarios para la
adecuación de las operaciones de los Responsables del Tratamiento y Encargados del
Tratamiento a las disposiciones previstas en la presente ley;
f) Solicitar a los Responsables del Tratamiento y Encargados del Tratamiento la
información que sea necesaria para el ejercicio efectivo de sus funciones.
g) Proferir las declaraciones de conformidad sobre las transferencias internacionales de
datos;
h) Administrar el Registro Nacional Público de Bases de Datos y emitir las órdenes y los
actos necesarios para su administración y funcionamiento;
i) Sugerir o recomendar los ajustes, correctivos o adecuaciones a la normatividad que
resulten acordes con la evolución tecnológica, informática o comunicacional;
j) Requerir la colaboración de entidades internacionales o extranjeras cuando se afecten
los derechos de los Titulares fuera del territorio colombiano con ocasión, entre otras, de la
recolección internacional de datos personajes;
k) Las demás que le sean asignadas por ley
    </Typography>
<br></br>
    <Typography variant="paragraph">
        <strong>Terminos y Condiciones</strong><br/>
   <br></br>    
   1. Propiedad del contenido del Portal web -Copyright-
Está prohibida la reproducción total o parcial, traducción, inclusión, transmisión, almacenamiento o acceso a través de medios analógicos, digitales o de cualquier otro sistema o tecnología creada o por crearse, sin autorización previa y escrita de MINCIENCIAS.
No obstante, es posible descargar material de www.minciencias.gov.co para uso personal y no comercial, siempre y cuando se haga expresa mención de la propiedad en cabeza MINCIENCIAS.
2. Declaración de Privacidad
El portal institucional del Ministerio de Ciencia, Tecnología e Innovación - MINCIENCIAS es una instancia comprometida con los usuarios que además de proveer información, vela por su calidad y fidelidad. Para ello institucionalizó la Declaración de Privacidad, la cual determina y garantiza el debido proceso para utilizar información personal y privada de personas inscritas en el portal para no infligir de ninguna manera las disposiciones contenidas en la Ley Estatutaria del Habeas Data (Ley 1581 del 2012), reglamentada mediante el decreto 1377 del 2013 y en la Ley de Privacidad o Habeas Data Colombiana (Ley 1266 de 2008).
Es interés de MINCIENCIAS la protección de la privacidad de la información personal del Usuario obtenida a través del Portal web, comprometiéndose a adoptar una política de confidencialidad según lo que se establece más adelante.
Al acceder al portal institucional de MINCIENCIAS, usted debe aceptar las prácticas utilizadas en este sitio y contempladas en la Declaración, así:
Recolección de información personal: El portal de MINCIENCIAS recolecta información personal de sus usuarios para garantizar algunas de sus actividades. Los datos que con mayor frecuencia se solicitan son: nombre, identificación, dirección de correo electrónico, dirección de residencia, número telefónico, edad, género, formación académica, producción académica y científica, preferencias e intereses.
También cuenta con información que se captura automáticamente relacionada con el hardware y software de los usuarios o clientes de MINCIENCIAS, como dirección IP, tipo de explorador de Internet utilizado, nombre de dominio, tiempos de acceso y direcciones de sitios Web. Esta información es utilizada por el portal institucional para garantizar la operación del servicio, asegurar su calidad y brindar estadísticas generales sobre el uso del sitio Web.
Es importante que el usuario del portal de MINCIENCIAS tenga en cuenta que, si divulga directamente información de identificación personal o datos privados a través de las herramientas públicas de comunicación en línea ofrecidas por este medio virtual, esa información puede ser recogida y usada por otros. El Usuario reconoce que el ingreso de información personal, lo realiza de manera voluntaria y ante la solicitud de requerimientos específicos MINCIENCIAS para realizar un trámite, presentar una queja o reclamo, o para acceder a sus servicios. El usuario también comprende que los datos por él consignados harán parte de un
archivo y/o base de datos que podrá ser usado por MINCIENCIAS, para efectos de surtir determinado proceso. El Usuario podrá modificar o actualizar la información suministrada en cualquier momento. MINCIENCIAS aconseja que el Usuario mantenga actualizada la información para optimizar el beneficio que puede recibir del Portal web.
En razón a ello, MINCIENCIAS no es responsable por declaraciones de privacidad, enlaces u otros contenidos que se encuentren en sitios diferentes de su portal o que de alguna manera tengan conexión con el mismo.
Es interés de MINCIENCIAS, la salvaguardia de la privacidad de la información personal del Usuario obtenida a través de la página web de la entidad, para lo cual se compromete a adoptar una política de seguridad de acuerdo con lo que se establece más adelante.
La información personal proporcionada por el Usuario está asegurada por una clave de acceso que sólo él conoce. Por tanto, el usuario es el único responsable de mantener en secreto su clave. MINCIENCIAS se compromete a no acceder ni pretender conocer dicha clave. Debido a que ninguna transmisión por Internet es absolutamente segura ni puede garantizarse dicho extremo, usted asume el hipotético riesgo que ello implica, el cual acepta y conoce.
MINCIENCIAS, no se responsabiliza por cualquier consecuencia derivada del ingreso indebido de terceros a la base de datos y/o por alguna falla técnica en el funcionamiento y/o conservación de datos en el sistema en cualquiera de los menús de su página web.
MINCIENCIAS, no responderá en ningún caso y en ninguna circunstancia, por los ataques o incidentes contra la seguridad de su sitio WEB o contra sus sistemas de información; o por cualquier exposición o acceso no autorizado, fraudulento o ilícito a su sitio WEB y que puedan afectar la confidencialidad, integridad o autenticidad de la información publicada o asociada con los contenidos y servicios que se ofrecen en el.
El Usuario podrá solicitar que su información personal no sea publicada o entregada por MINCIENCIAS a terceros, a través del envío de correo electrónico a la dirección atencionalciudadano@minciencias.gov.co en cuyo caso MINCIENCIAS no publicará ni entregará dicha información, salvo en caso que la misma sea requerida por orden judicial o para proteger los derechos de propiedad o cualquier otro derecho o garantía de MINCIENCIAS.
MINCIENCIAS, ha adoptado los niveles de seguridad de protección de los datos personales legalmente requeridos, instalando las medidas técnicas y organizativas necesarias para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los datos facilitados.
Utilización de información personal: El portal de Ministerio de Ciencia, Tecnología e Innovación asegura la información personal de sus usuarios contra el acceso, el uso o la divulgación no autorizada mediante servidores ubicados en ambientes controlados y seguros, habiendo adoptado las medidas razonables que salvaguardan los derechos de los usuarios, sin ser responsable de ataques informáticos que sean realizados por terceros.
<br></br>
Estos datos personales se capturan y utilizan para operar servicios de información y procesos en línea que beneficien a los ciudadanos, para lo cual la institución informa previamente a sus usuarios.
Adicionalmente, la información de identificación personal se usa para acceder a otros productos o servicios, para enviar encuestas a los usuarios y contactarlos con el fin de conocer su opinión frente a los servicios prestados actualmente o potenciales servicios a ofrecer en el futuro.
MINCIENCIAS no vende, alquila o arrienda su lista de clientes y usuarios a terceras partes, especialmente si son de carácter privado o comercial. En caso de beneficiar a sus usuarios con la transferencia de información a otras organizaciones de tipo oficial, solicitará permiso expreso a cada una de las personas registradas en el portal institucional o en alguna de sus aplicaciones.
MINCIENCIAS puede compartir datos con socios confiables en los que delega el análisis estadístico, el envío de correo electrónico o postal, la atención al cliente, o los arreglos para la distribución y entrega de información.
Estos socios tienen prohibido el uso de la información personal que pueda identificar expresamente a los usuarios -salvo que se requiera para proveer servicios al portal- y de ninguna manera utilizan o divulgan la información privada sin consentimiento previo.
El portal institucional de MINCIENCIAS, divulgará información personal de sus usuarios sin notificarlo, sólo cuando así sea requerido por la ley o cuando se crea de buena fe que dicha acción es necesaria para: (a) conformar edictos legales b) cumplir con un proceso legal realizado sobre el portal (c) proteger y defender los derechos o la propiedad del portal del Ministerio de Ciencia, Tecnología e Innovación (d) actuar bajo circunstancias extremas con el fin de proteger la seguridad de los usuarios del portal o del público.
Modificaciones a esta Declaración: El portal de MINCIENCIAS, podrá ocasionalmente actualizar esta Declaración de Privacidad para reflejar las sugerencias tanto de la entidad como de los clientes. El usuario debe visitar esta página periódicamente para revisar tanto la Declaración de Privacidad como los Términos y Condiciones del Portal, debido a que estos mismos son de obligatorio conocimiento para el usuario.
Bases de Datos e información
Minciencias se permite informar que a la fecha ha recolectado y procesado datos personales de terceros garantizando la confidencialidad, integridad y disponibilidad de la información para el desarrollo de su operación. De acuerdo con lo establecido en el Artículo 10 del Decreto 1377 del 2013 Minciencias, por este medio solicita autorización de todos los titulares (empleados, proveedores, clientes, aportantes, usuarios, declarantes) de los datos así tratados para continuar haciéndolo con las siguientes finalidades:
a) Ejecutar los contratos celebrados; b) Realizar análisis con fines contractuales; c) Utilizarlos para fines administrativos en las diferentes actividades que realiza Minciencias en ejercicio de sus funciones; d) Solicitar propuestas en el marco de nuestras convocatorias y; e) Las demás definidas en nuestra política de tratamiento de datos.
Los datos personales recolectados incluyen entre otros: identificación, datos de contacto, información profesional y corporativa. La entrega de datos sensibles es facultativo. Acorde con lo establecido en el Decreto 1377 del 2013 si transcurridos treinta (30) días hábiles a partir de la fecha de publicación de esta Comunicación Minciencias no recibe manifestación alguna, podrá continuar con el tratamiento de la información personal para las mismas o similares finalidades del que ha sido objeto desde su recolección. Lo anterior no impedirá que los titulares en cualquier momento y conforme a la ley, puedan ejercer sus derechos de conocimiento, acceso, rectificación, actualización, revocatoria y supresión de sus datos personales, siempre que no exista un mandato legal o contractual que faculte a Minciencias para continuar con el tratamiento directamente.
En caso de consulta o quejas en relación con sus datos personales, por favor enviar una solicitud al correo electrónico atencionalciudadano@minciencias.gov.co o dirigirse a la dirección Av. Calle 26 # 57- 41 / 83 Torre 8 Piso
<br></br>
Condiciones de Uso y Participación dentro del portal
<br></br>
Condiciones de Uso
1. Por el hecho de ingresar al Portal y para garantizar el buen y adecuado uso de este, el Usuario reconoce en cabeza de MINCIENCIAS:
·  El derecho de modificar en cualquier tiempo y por cualquier razón sin previo aviso los Términos y Condiciones del Portal web.
 El derecho de negar el registro a cualquier persona, en cualquier momento y por cualquier razón.
El derecho a utilizar la información personal y/o contenidos suministrados por los Usuarios de acuerdo con los Términos y Condiciones del Portal web.
2. El Portal, contiene links que remiten a otras páginas de Internet. Teniendo en cuenta que MINCIENCIAS no es responsable por la disponibilidad de dichos sitios, el Usuario deberá dirigirse directamente al administrador de dicho sitio cuando así lo requiera y usar dichos sitios de acuerdo con los términos de uso respectivos.
3. El registro al Portal web podrá darse por terminado por el Usuario en cualquier momento enviando un correo electrónico a atencionalciudadano@minciencias.gov.co
4. El Usuario deberá cumplir los Términos y Condiciones del Portal, así como toda condición adicional que se establezca en el Portal.
5. MINCIENCIAS no garantiza la disponibilidad y continuidad del funcionamiento del Portal. Cuando ello sea razonablemente posible, MINCIENCIAS advertirá previamente las interrupciones en el funcionamiento del Portal, cuando fueren previsibles o hubieren sido dispuestos por la entidad. MINCIENCIAS tampoco garantiza la utilidad del Portal para la realización de ninguna actividad en particular, ni su infalibilidad y, en particular, aunque no de modo exclusivo, que los Usuarios puedan efectivamente utilizar el Portal, acceder a las distintas páginas web o secciones que forman el Portal.
6. MINCIENCIAS no incurrirá en responsabilidad con el usuario o terceros, cuando su sitio WEB no se encuentre disponible.
7. MINCIENCIAS excluye cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a la falta de disponibilidad o de continuidad del funcionamiento del Portal, a la defraudación de la utilidad que los Usuarios hubieren podido atribuir al Portal y a los servicios, a la falibilidad del Portal, y en particular, aunque no de modo exclusivo, a las fallas en el acceso a las distintas páginas web o secciones del Portal.
8. MINCIENCIAS no controla ni garantiza, y por lo tanto no se hace responsable por, la ausencia de virus ni de otros elementos en los contenidos del Portal que puedan producir alteraciones en el sistema informático (software y hardware) del Usuario o en los documentos electrónicos y ficheros almacenados en el sistema informático del Usuario.
9. Es interés de MINCIENCIAS ser un espacio para el desarrollo de la ciencia y el trabajo con contenido de actualidad y de interés para los Usuarios. No obstante, MINCIENCIAS no puede garantizar que dicho contenido esté exento de errores o imprecisiones, en cuyo caso podrán solicitarse las aclaraciones o correcciones que sean del caso. MINCIENCIAS tampoco puede garantizar que el contenido del Portal sea suficiente y/o útil para el Usuario.
10. MINCIENCIAS no garantiza y por lo tanto no es responsable de, la licitud, fiabilidad, exactitud, exhaustividad, actualidad y utilidad de las columnas de opinión, y/o las opiniones e informaciones registradas por los Usuarios en el Portal.
<br></br>
Uso del material: MINCIENCIAS, lo autoriza a usted a consultar, revisar y usar el material que se encuentra en el Portal, únicamente para su uso personal y no comercial. El contenido de este Portal, incluyendo pero sin limitarse a, los textos, gráficas, imágenes, logotipos, iconos, software y cualquier otro material (el "Material") están protegidos bajo las leyes colombianas de derechos de autor, leyes de propiedad industrial y otras leyes aplicables. Todo el Material es de propiedad de MINCIENCIAS o de sus proveedores o clientes. El uso no autorizado del material puede constituir una violación de las leyes colombianas o extranjeras sobre derechos de autor, leyes de privacidad como la de Habeas Data, leyes de propiedad industrial u otras leyes. Usted no podrá vender o modificar el Material en manera alguna, ni ejecutar o anunciar públicamente el Material ni distribuirlo para propósitos comerciales. Usted no podrá copiar o adaptar el código HTML que MINCIENCIAS crea para generar sus páginas ya que el mismo está protegido por los derechos de autor de MINCIENCIAS.
Uso autorizado del Portal
Reglas Generales: Los usuarios no pueden usar el Portal con el fin de transmitir, distribuir, almacenar o destruir material (i) en violación de cualquier ley aplicable o regulación, (ii) de manera que se infrinjan las leyes sobre privacidad de datos personales –Habeas Data, derechos de autor, propiedad industrial, secretos comerciales o cualquier otro derechos de propiedad intelectual de terceros o de manera que viole la privacidad, publicidad u otros derechos personales de terceros, o (iii) en forma que sea difamatoria, obscena, amenazante o abusiva. Reglas de Seguridad del Portal: A los usuarios les está prohibido violar o intentar violar la seguridad del Portal. Específicamente los usuarios no podrán (i) acceder a información que no esté dirigida o autorizada a dicho usuario o acceder a servidores o cuentas a los cuales el usuario no está autorizado a acceder, (ii) intentar probar la vulnerabilidad de un sistema o red sin la debida autorización o violar las medidas de seguridad o autenticación, (iii) intentar interferir con los servicios prestados a un usuario, servidor o red, incluyendo pero sin limitarse a, el envió de virus a través del Portal, (iv) enviar correo electrónico no solicitado (Spam), incluyendo promociones y/o publicidad de productos o servicios. La violación de cualquier sistema o red de seguridad puede resultar en responsabilidades civiles y penales. MINCIENCIAS investigará la ocurrencia de hechos que puedan constituir violaciones a lo anterior y cooperará con cualquier autoridad competente en la persecución de los usuarios que estén envueltos en tales violaciones.
Usos prohibidos del Portal
Se prohíbe la utilización total o parcial del portal para promocionar, publicitar, hacer propaganda, apología o cualquier exaltación de entidades sin ánimo de lucro, empresas mercantiles, personas naturales o jurídicas diferentes de MINCIENCIAS y sus funcionarios.
El Portal puede ser usado únicamente con propósitos relacionados con la innovación, ciencia, tecnología e investigación. MINCIENCIAS prohíbe el uso del Portal en cualquiera de las siguientes formas:
Incluir en el Portal cualquier información falsa o inexacta o información que no corresponda a la realidad.
Borrar o modificar cualquier material incluido en el Portal por cualquiera otra persona o entidad, sin la debida autorizaciónUsar cualquier elemento, diseño, software o rutina para interferir o intentar interferir con el funcionamiento adecuado de este Portal o cualquier actividad que sea llevada a cabo en el Portal.
 Intentar descifrar, de-compilar o desensamblar cualquier software comprendido en el Portal o que de cualquier manera haga parte del Portal.
En general, incluir o colocar en el Portal información falsa, inexacta, incompleta o engañosa.
Si usted tiene un password o contraseña que le permita el acceso a un área no pública de este Portal, no podrá revelar o compartir ese password o contraseña con terceras personas o usar el password o contraseña para propósitos no autorizados.
Estos Términos y Condiciones han sido dispuestos de conformidad con las leyes colombianas. Cualquier acción o reclamación deberá hacerse ante los Tribunales de Colombia y de conformidad con las leyes colombianas, así el reclamante se encuentre domiciliado en otro país.
Registro y Participación del Usuario
Por el hecho de ingresar al Portal y para garantizar el buen y adecuado uso del mismo, el Usuario deberá cumplir con lo siguiente:
Observar Guía de principios y recomendaciones, los Términos y Condiciones y cualquier otra condición establecida en este Portal web.Ser responsable por cualquier actividad que se lleve a cabo bajo su registro.
Ser responsable por mantener la confidencialidad de su password o contraseña. Usted será responsable por todos los usos de su registro en el Portal, sean o no autorizados por usted. Usted acuerda notificar inmediatamente a MINCIENCIAS, cualquier uso no autorizado de su registro y password o contraseña.- No abusar, acosar, amenazar o intimidar a otros usuarios del Portal ya sea a través de los chats, foros, blogs o cualquier otro espacio de participación que este activo o por activar en el futuro.
 No usar este Portal como medio para desarrollar actividades ilegales o no autorizadas tanto en Colombia, como en cualquier otro país.
Abstenerse de enviar correo electrónico no deseado (SPAM) a otros Usuarios de este Portal, así como también le está prohibido transmitir virus o cualquier código de naturaleza destructiva.
Canalizar sus quejas, reclamos y denuncias a través de la sección de Contacto en el Portal web.
Agredir, injuriar, calumniar y en cualquier forma referirse en términos irrespetuosos o falsos a MINCIENCIAS y a otros usuarios del portal o a otras personas naturales o jurídicas así no sean usuarias del mismo.
Vulnerar o intentar hacerlo, con cualquier comportamiento, las seguridades de las informaciones, datos, estadísticas y demás elementos que estén incorporados al portal o sean resultado de procesos investigativos de MINCIENCIAS o sus investigadores, so pena de hacerse acreedor a las sanciones contempladas en la Ley 1273 del 2009.
Mientras en el Portal estén prohibidas estas conductas, MINCIENCIAS no será responsable por su cumplimiento y el Usuario lo mantendrá indemne por todo concepto.
    </Typography>
<br></br>
    <Typography variant="paragraph">
        <strong> TÉRMINOS Y CONDICIONES DE USO DE CONFIAPP</strong><br/>
       <br></br>
Los presentes Términos y Condiciones de Uso ("Términos") regulan el acceso y utilización de la
aplicación móvil y sitio web ConfiApp ("la Aplicación") propiedad de [Nombre de la empresa
desarrolladora]. Al acceder y utilizar la Aplicación, usted acepta quedar vinculado por estos
Términos. Si no está de acuerdo con alguna de las disposiciones aquí contenidas, no debe utilizar
la Aplicación.
<br></br>
<p></p>1. TRATAMIENTO DE DATOS PERSONALES
<p></p>1.1 ConfiApp recolecta y trata datos personales de sus usuarios con el fin de prestar los servicios
ofrecidos a través de la Aplicación, como son el registro de usuarios, la publicación de alertas
sobre menores desaparecidos, el monitoreo de rutas de menores, y la comunicación entre tutores
y menores. Los datos personales recolectados incluyen, entre otros, nombre, identificación, datos
de contacto, ubicación geográfica, fotografías al hacer una publicación sobre un menor
<br></br>
desaparecido e información de menores bajo la tutela del usuario.
<p></p>1.2 Al utilizar ConfiApp, el usuario autoriza de manera previa, expresa e informada el tratamiento
de sus datos personales conforme a los fines establecidos en estos Términos. ConfiApp se
compromete a cumplir con los principios de legalidad, finalidad, libertad, veracidad, transparencia,
acceso restringido, en el tratamiento de los datos personales de sus usuarios.
<br></br>
<p></p>1.3 ConfiApp actuará como responsable del tratamiento de los datos personales recolectados a
través de la Aplicación, y se obliga a cumplir con los deberes legales aplicables, como garantizar el
ejercicio de los derechos de los titulares, mantener medidas necesarias para evitar adversidades,
pérdida o acceso no autorizado, y tramitar de forma oportuna las solicitudes de los usuarios
relacionadas con sus datos personales.
<br></br>
<p></p>1.4 El usuario tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos
personales en cualquier momento, así como a revocar la autorización otorgada para el
tratamiento de los mismos. Estas solicitudes podrán realizarse a través de los canales de atención
al usuario dispuestos por ConfiApp.
<br></br>
<p></p>2. DERECHOS DE MENORES DE EDAD
<p></p>2.1 ConfiApp reconoce la prevalencia de los derechos de los menores de edad en relación con el
tratamiento de sus datos personales. En consecuencia, adoptará medidas especiales de
protección, para el manejo de los datos de menores registrados en la Aplicación
<br></br>
<p></p>3. LIMITACIÓN DE RESPONSABILIDAD
<p></p>3.1 ConfiApp no se responsabiliza por cualquier daño, perjuicio o pérdida derivada del uso
indebido de la Aplicación por parte de los usuarios. Los usuarios son los únicos responsables por la
veracidad, integridad y legalidad de los datos personales y demás información que proporcionen a
través de la Aplicación.<br></br>
<p></p>3.2 ConfiApp no garantiza la disponibilidad y continuidad ininterrumpida de la Aplicación, ni el
acceso y uso permanente de la misma, ya que su funcionamiento puede verse afectado por
circunstancias fuera de su control
<br></br>
<p></p>4. MODIFICACIONES
<p></p>ConfiApp se reserva el derecho de modificar estos Términos en cualquier momento. Las
modificaciones entrarán en vigencia a partir de su publicación en la Aplicación, y el uso continuado
de la misma por parte del usuario constituirá la aceptación de los nuevos Términos.
<br></br>
<p></p>5. LEGISLACIÓN APLICABLE
<p></p>Estos Términos se rigen por las leyes vigentes en la República de Colombia, en particular por la Ley
1581 de 2012 y el Decreto 1074 de 2015 en lo concerniente al tratamiento de datos personales.
</Typography>
   

                    {/* Agregar más contenido aquí */}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                        onClick={handleToggleModalTerms}
                        className="font-normal text-white bg-blue-300 rounded-full py-2 px-4 hover:bg-blue-500"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    </div>
)}

            <div className="mt-0 flex items-center gap-1">
                <Checkbox
                    checked={dataDes.aceptaTerminos}
                    onChange={(e) => setDataDes({
                        ...dataDes,
                        aceptaTerminos: e.target.checked
                    })}
                />
                <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center justify-start font-medium"
                >
                    Aceptas &nbsp;
                    {/* Aquí colocamos el enlace de Términos y condiciones */}
                    <a
                        href="#"
                        className="font-normal text-black transition-colors hover:text-gray-900 underline"
                        onClick={handleToggleModalTerms} // Agrega este evento onClick
                    >
                        Términos y condiciones
                    </a>
                </Typography>
            </div>
        </>
    );
};
       



export default Profile;
