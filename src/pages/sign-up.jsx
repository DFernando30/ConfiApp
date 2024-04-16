import {Input, Checkbox, Button, Typography} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";








export function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        tipoIdentificacion: "",
        numerodeIdentificacion: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (
            !formData.nombres ||
            !formData.apellidos ||
            !formData.tipoIdentificacion ||
            !formData.numerodeIdentificacion ||
            !formData.email ||
            !formData.telefono ||
            !formData.password
        ) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        // Validar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
            toast.error("Las contraseñas no coinciden.");
            return;
        } else {
            setPasswordMatch(true);
        }

        try {
            const {confirmPassword, ...dataToSend} = formData;
            const response = await axios.post("https://nuevomern-7y1b.onrender.com/api/register", dataToSend);
            console.log(response.data);
            const toastId = toast.success("Registro exitoso.");
            setFormData({
                nombres: "",
                apellidos: "",
                tipoIdentificacion: "",
                numerodeIdentificacion: "",
                email: "",
                telefono: "",
                password: "",
                confirmPassword: ""
            })
            setTimeout(() => {
                toast.dismiss(toastId); // Ocultar el toast después de 3 segundos
                navigate("/sign-in") // Redirigir al usuario
            }, 2000);

        } catch (error) {
            console.error("Error:", error);
            toast.error("Error al registrarse.");
        }
    };



    //modal terminos

    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal




    // Función para abrir el modal
    const openModal = () => {
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
    };



    return (
        <section className="m-8 flex">
            <Toaster/>
            <div className="w-2/5 h-full hidden lg:block">
                <img src="/img/ado.avif" className="h-full w-full object-cover rounded-3xl"/>
            </div>
            <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">
                        Registrate
                    </Typography>
                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
                        Ingresa tus datos para registrarte.
                    </Typography>
                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Nombres
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Pedro Ramon"
                            value={formData.nombres}
                            onChange={(e) => setFormData({...formData, nombres: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Apellidos
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Perez Perez"
                            value={formData.apellidos}
                            onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <br/>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Tipo de identificación
                        </Typography>
                        <select
                            size="lg"
                            placeholder="Selecciona tu tipo de identificación"
                            value={formData.tipoIdentificacion}
                            onChange={(e) => setFormData({...formData, tipoIdentificacion: e.target.value})}
                            className="border-t border-blue-gray-200 focus:border-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        >
                            <option value="" color="gray">
                                Selecciona tu tipo de identificación
                            </option>
                            <option value="cedula de ciudadania">Cedula de Ciudadanía</option>
                            <option value="cedula de extrangeria">Cedula de extrangería</option>
                        </select>
                    </div>
                    <br/>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Número de identificación
                        </Typography>
                        <Input
                            type="number"
                            size="lg"
                            placeholder="Debes ser mayor de edad"
                            value={formData.numerodeIdentificacion}
                            onChange={(e) => setFormData({...formData, numerodeIdentificacion: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Tu correo electronico
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Número de telefono/celular
                        </Typography>
                        <Input
                            type="number"
                            size="lg"
                            placeholder="300-456-7890"
                            value={formData.telefono}
                            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Escribe tu contraseña
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Confirma tu contraseña
                        </Typography>
                        <Input
                            size="lg"
                            type="password"
                            placeholder="********"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className={` !border-t-blue-gray-200 focus:!border-t-gray-900 ${
                                !passwordMatch ? "border-red-500" : ""
                            }`}
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                        {!passwordMatch && (
                            <Typography variant="small" color="red">
                                Las contraseñas no coinciden.
                            </Typography>
                        )}
                    </div>
                    <Checkbox
                        label={
                            <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
                                Acepta&nbsp;
                                <a href="#" onClick={openModal} className="font-normal text-black transition-colors hover:text-gray-900 underline">
                                    Términos y condiciones
                                </a>
                            </Typography>
                        }
                        containerProps={{className: "-ml-2.5"}}
                    />
                    <Button type="submit" className="mt-6" fullWidth>
                        Registrate ahora
                    </Button>


                    <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                        Ya tienes cuenta?
                        <Link to="/sign-in" className="text-gray-900 ml-1">Inicia sesión</Link>
                    </Typography>
                </form>

            </div>


{/* Modal */}
{showModal && (
               <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
               <div className="bg-white rounded-lg p-8 w-96 md:w-128">
                        <Typography variant="h4" className="font-bold mb-4">
                            Términos y Condiciones
                        </Typography>
                        
                        <Typography variant="h4" className="font-bold mb-4">
                        Políticas de Privacidad y Condiciones de Uso
                     </Typography>
                    <div className="max-h-60 overflow-y-auto mb-4">
    <Typography variant="paragraph">
        <strong>1. Propiedad del contenido del Portal web -Copyright-</strong><br/>
        Está prohibida la reproducción total o parcial, traducción, inclusión, transmisión, almacenamiento o acceso a través de medios analógicos, digitales o de cualquier otro sistema o tecnología creada o por crearse, sin autorización previa y escrita de MINCIENCIAS.
        No obstante, es posible descargar material de www.minciencias.gov.co para uso personal y no comercial, siempre y cuando se haga expresa mención de la propiedad en cabeza MINCIENCIAS.
    </Typography>
    <Typography variant="paragraph">
        <strong>2. Declaración de Privacidad</strong><br/>
    El portal institucional del Ministerio de Ciencia, Tecnología e Innovación - MINCIENCIAS es una instancia comprometida con los usuarios que además de proveer información, vela por su calidad y fidelidad. Para ello institucionalizó la Declaración de Privacidad, la cual determina y garantiza el debido proceso para utilizar información personal y privada de personas inscritas en el portal para no infligir de ninguna manera las disposiciones contenidas en la Ley Estatutaria del Habeas Data (Ley 1581 del 2012), reglamentada mediante el decreto 1377 del 2013 y en la Ley de Privacidad o Habeas Data Colombiana (Ley 1266 de 2008).
    Es interés de MINCIENCIAS la protección de la privacidad de la información personal del Usuario obtenida a través del Portal web, comprometiéndose a adoptar una política de confidencialidad según lo que se establece más adelante.
   Al acceder al portal institucional de MINCIENCIAS, usted debe aceptar las prácticas utilizadas en este sitio y contempladas en la Declaración, así:
   Recolección de información personal: El portal de MINCIENCIAS recolecta información personal de sus usuarios para garantizar algunas de sus actividades. Los datos que con mayor frecuencia se solicitan son: nombre, identificación, dirección de correo electrónico, dirección de residencia, número telefónico, edad, género, formación académica, producción académica y científica, preferencias e intereses.
   También cuenta con información que se captura automáticamente relacionada con el hardware y software de los usuarios o clientes de MINCIENCIAS, como dirección IP, tipo de explorador de Internet utilizado, nombre de dominio, tiempos de acceso y direcciones de sitios Web. Esta información es utilizada por el portal institucional para garantizar la operación del servicio, asegurar su calidad y brindar estadísticas generales sobre el uso del sitio Web.
   Es importante que el usuario del portal de MINCIENCIAS tenga en cuenta que, si divulga directamente información de identificación personal o datos privados a través de las herramientas públicas de comunicación en línea ofrecidas por este medio virtual, esa información puede ser recogida y usada por otros. El Usuario reconoce que el ingreso de información personal, lo realiza de manera voluntaria y ante la solicitud de requerimientos específicos MINCIENCIAS para realizar un trámite, presentar una queja o reclamo, o para acceder 
   a sus servicios. El usuario también comprende que los datos por él consignados harán parte de un archivo y/o base de datos que podrá ser usado por MINCIENCIAS, para efectos de surtir determinado proceso. El Usuario podrá modificar o actualizar la información suministrada en cualquier momento. MINCIENCIAS aconseja que el Usuario mantenga actualizada la información para optimizar el beneficio que puede recibir del Portal web.
   En razón a ello, MINCIENCIAS no es responsable por declaraciones de privacidad, enlaces u otros contenidos que se encuentren en sitios diferentes de su portal o que de alguna manera tengan conexión con el mismo.
   Es interés de MINCIENCIAS, la salvaguardia de la privacidad de la información personal del Usuario obtenida a través de la página web de la entidad, para lo cual se compromete a adoptar una política de seguridad de acuerdo con lo que se establece más adelante.
   La información personal proporcionada por el Usuario está asegurada por una clave de acceso que sólo él conoce. Por tanto, el usuario es el único responsable de mantener en secreto su clave. MINCIENCIAS se compromete a no acceder ni pretender conocer dicha clave. Debido a que ninguna transmisión por Internet es absolutamente segura ni puede garantizarse dicho extremo, usted asume el hipotético riesgo que ello implica, el cual acepta y conoce.
  MINCIENCIAS, no se responsabiliza por cualquier consecuencia derivada del ingreso indebido de terceros a la base de datos y/o por alguna falla técnica en el funcionamiento y/o conservación de datos en el sistema en cualquiera de los menús de su página web.
  MINCIENCIAS, no responderá en ningún caso y en ninguna circunstancia, por los ataques o incidentes contra la seguridad de su sitio WEB o contra sus sistemas de información; o por cualquier exposición o acceso no autorizado, fraudulento o ilícito a su sitio WEB y que puedan afectar la confidencialidad, integridad o autenticidad de la información publicada o asociada con los contenidos y servicios que se ofrecen en el.
  El Usuario podrá solicitar que su información personal no sea publicada o entregada por MINCIENCIAS a terceros, a través del envío de correo electrónico a la dirección atencionalciudadano@minciencias.gov.co en cuyo caso MINCIENCIAS no publicará ni entregará dicha información, salvo en caso que la misma sea requerida por orden judicial o para proteger los derechos de propiedad o cualquier otro derecho o garantía de MINCIENCIAS. 
  MINCIENCIAS, ha adoptado los niveles de seguridad de protección de los datos personales legalmente requeridos, instalando las medidas técnicas y organizativas necesarias para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los datos facilitados.
  Utilización de información personal: El portal de Ministerio de Ciencia, Tecnología e Innovación asegura la información personal de sus usuarios contra el acceso, el uso o la divulgación no autorizada mediante servidores ubicados en ambientes controlados y seguros, habiendo adoptado las medidas razonables que salvaguardan los derechos de los usuarios, sin ser responsable de ataques informáticos que sean realizados por terceros.
Estos datos personales se capturan y utilizan para operar servicios de información y procesos en línea que beneficien a los ciudadanos, para lo cual la institución informa previamente a sus usuarios.
Adicionalmente, la información de identificación personal se usa para acceder a otros productos o servicios, para enviar encuestas a los usuarios y contactarlos con el fin de conocer su opinión frente a los servicios prestados actualmente o potenciales servicios a ofrecer en el futuro.
MINCIENCIAS no vende, alquila o arrienda su lista de clientes y usuarios a terceras partes, especialmente si son de carácter privado o comercial. En caso de beneficiar a sus usuarios con la transferencia de información a otras organizaciones de tipo oficial, solicitará permiso expreso a cada una de las personas registradas en el portal institucional o en alguna de sus aplicaciones.
MINCIENCIAS puede compartir datos con socios confiables en los que delega el análisis estadístico, el envío de correo electrónico o postal, la atención al cliente, o los arreglos para la distribución y entrega de información.
Estos socios tienen prohibido el uso de la información personal que pueda identificar expresamente a los usuarios -salvo que se requiera para proveer servicios al portal- y de ninguna manera utilizan o divulgan la información privada sin consentimiento previo.
El portal institucional de MINCIENCIAS, divulgará información personal de sus usuarios sin notificarlo, sólo cuando así sea requerido por la ley o cuando se crea de buena fe que dicha acción es necesaria para: (a) conformar edictos legales b) cumplir con un proceso legal realizado sobre el portal (c) proteger y defender los derechos o la propiedad del portal del Ministerio de Ciencia, Tecnología e Innovación (d) actuar bajo circunstancias extremas con el fin de proteger la seguridad de los usuarios del portal o del público.
Modificaciones a esta Declaración: El portal de MINCIENCIAS, podrá ocasionalmente actualizar esta Declaración de Privacidad para reflejar las sugerencias tanto de la entidad como de los clientes. El usuario debe visitar esta página periódicamente para revisar tanto la Declaración de Privacidad como los Términos y Condiciones del Portal, debido a que estos mismos son de obligatorio conocimiento para el usuario.
Bases de Datos e información
Minciencias se permite informar que a la fecha ha recolectado y procesado datos personales de terceros garantizando la confidencialidad, integridad y disponibilidad de la información para el desarrollo de su operación. De acuerdo con lo establecido en el Artículo 10 del Decreto 1377 del 2013 Minciencias, por este medio solicita autorización de todos los titulares (empleados, proveedores, clientes, aportantes, usuarios, declarantes) de los datos así tratados para continuar haciéndolo con las siguientes finalidades:
<p>a) Ejecutar los contratos celebrados;</p>
<p> b) Realizar análisis con fines contractuales; </p>
<p> c) Utilizarlos para fines administrativos en las diferentes actividades que realiza Minciencias en ejercicio de sus funciones;</p>
<p>  d) Solicitar propuestas en el marco de nuestras convocatorias y; </p>
<p> e) Las demás definidas en nuestra política de tratamiento de datos.</p>
<br></br>
Los datos personales recolectados incluyen entre otros: identificación, datos de contacto, información profesional y corporativa. La entrega de datos sensibles es facultativo. Acorde con lo establecido en
el Decreto 1377 del 2013 si transcurridos treinta (30) días hábiles a partir de la fecha de publicación de esta Comunicación Minciencias no recibe manifestación alguna, podrá continuar con el tratamiento de la información personal para las mismas o similares finalidades del 
que ha sido objeto desde su recolección. Lo anterior no impedirá que los titulares en cualquier momento y conforme a la ley, puedan ejercer sus derechos de conocimiento, acceso, rectificación, actualización, revocatoria y supresión de sus datos personales, siempre que no exista un mandato legal o contractual que faculte a Minciencias para continuar con el tratamiento directamente.
    </Typography>
    <Typography variant="paragraph">
        <strong>3. Condiciones de Uso y Participación dentro del portal</strong><br/>

<p>Condiciones de Uso</p>
1. Por el hecho de ingresar al Portal y para garantizar el buen y adecuado uso de este, el Usuario reconoce en cabeza de MINCIENCIAS:
  <p>El derecho de modificar en cualquier tiempo y por cualquier razón sin previo aviso los Términos y Condiciones del Portal web.</p>
<p>El derecho de negar el registro a cualquier persona, en cualquier momento y por cualquier razón.</p>
<p> El derecho a utilizar la información personal y/o contenidos suministrados por los Usuarios de acuerdo con los Términos y Condiciones del Portal web.</p>
<p> El Portal, contiene links que remiten a otras páginas de Internet. Teniendo en cuenta que MINCIENCIAS no es responsable por la disponibilidad de dichos sitios, el Usuario deberá dirigirse directamente al administrador de dicho sitio cuando así lo requiera y usar dichos sitios de acuerdo con los términos de uso respectivos.</p>
<p> El registro al Portal web podrá darse por terminado por el Usuario en cualquier momento enviando un correo electrónico a atencionalciudadano@minciencias.gov.co</p>
<p>El Usuario deberá cumplir los Términos y Condiciones del Portal, así como toda condición adicional que se establezca en el Portal.</p>
<p>MINCIENCIAS no garantiza la disponibilidad y continuidad del funcionamiento del Portal. Cuando ello sea razonablemente posible, MINCIENCIAS advertirá previamente las interrupciones en el funcionamiento del Portal, cuando fueren previsibles o hubieren sido dispuestos por la entidad. MINCIENCIAS tampoco garantiza la utilidad del Portal para la realización de ninguna actividad en particular, ni su infalibilidad y, en particular, aunque no de modo exclusivo, que los Usuarios puedan efectivamente utilizar el Portal, acceder a las distintas páginas web o secciones que forman el Portal.</p>
<p>MINCIENCIAS no incurrirá en responsabilidad con el usuario o terceros, cuando su sitio WEB no se encuentre disponible.</p>
<p>MINCIENCIAS excluye cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a la falta de disponibilidad o de continuidad del funcionamiento del Portal, a la defraudación de la utilidad que los Usuarios hubieren podido atribuir al Portal y a los servicios, a la falibilidad del Portal, y en particular, aunque no de modo exclusivo, a las fallas en el acceso a las distintas páginas web o secciones del Portal.</p>
<p>MINCIENCIAS no controla ni garantiza, y por lo tanto no se hace responsable por, la ausencia de virus ni de otros elementos en los contenidos del Portal que puedan producir alteraciones en el sistema informático (software y hardware) del Usuario o en los documentos electrónicos y ficheros almacenados en el sistema informático del Usuario.</p>
<p>Es interés de MINCIENCIAS ser un espacio para el desarrollo de la ciencia y el trabajo con contenido de actualidad y de interés para los Usuarios. No obstante, MINCIENCIAS no puede garantizar que dicho contenido esté exento de errores o imprecisiones, en cuyo caso podrán solicitarse las aclaraciones o correcciones que sean del caso. MINCIENCIAS tampoco puede garantizar que el contenido del Portal sea suficiente y/o útil para el Usuario.</p>
<p>MINCIENCIAS no garantiza y por lo tanto no es responsable de, la licitud, fiabilidad, exactitud, exhaustividad, actualidad y utilidad de las columnas de opinión, y/o las opiniones e informaciones registradas por los Usuarios en el Portal.</p>
Uso del material: MINCIENCIAS, lo autoriza a usted a consultar, revisar y usar el material que se encuentra en el Portal, únicamente para su uso personal y no comercial. El contenido de este Portal, incluyendo pero sin limitarse a, los textos, gráficas, imágenes, logotipos, iconos, software y cualquier otro material (el "Material") están protegidos bajo las leyes colombianas de derechos de autor, leyes de propiedad industrial y otras leyes aplicables. Todo el Material es de propiedad de MINCIENCIAS o de sus proveedores o clientes. El uso no autorizado del material puede constituir una violación de las leyes colombianas o extranjeras sobre derechos de autor, leyes de privacidad como la de Habeas Data, leyes de propiedad industrial u otras leyes. Usted no podrá vender o modificar el Material en manera alguna, ni ejecutar o anunciar públicamente el Material ni distribuirlo para propósitos comerciales. Usted no podrá copiar o adaptar el código HTML que MINCIENCIAS crea para generar sus páginas ya que el mismo está protegido por los derechos de autor de MINCIENCIAS.
<p>Uso autorizado del Portal</p>
Reglas Generales: Los usuarios no pueden usar el Portal con el fin de transmitir, distribuir, almacenar o destruir material (i) en violación de cualquier ley aplicable o regulación, (ii) de manera que se infrinjan las leyes sobre privacidad de datos personales –Habeas Data, derechos de autor, propiedad industrial, secretos comerciales o cualquier otro derechos de propiedad intelectual de terceros o de manera que viole la privacidad, publicidad u otros derechos personales de terceros, o (iii) en forma que sea difamatoria, obscena, amenazante o abusiva. Reglas de Seguridad del Portal: A los usuarios les está prohibido violar o intentar violar la seguridad del Portal. Específicamente los usuarios no podrán (i) acceder a información que no esté dirigida o autorizada a dicho usuario o acceder a servidores o cuentas a los cuales el usuario no está autorizado a acceder, (ii) intentar probar la vulnerabilidad de un sistema o red sin la debida autorización o violar las medidas de seguridad o autenticación, (iii) intentar interferir con los servicios prestados a un usuario,
 servidor o red, incluyendo pero sin limitarse a, el envió de virus a través del Portal, (iv) enviar correo electrónico no solicitado (Spam), incluyendo promociones y/o publicidad de productos o servicios. La violación de cualquier sistema o red de seguridad puede resultar en responsabilidades civiles y penales. MINCIENCIAS investigará la ocurrencia de hechos que puedan constituir violaciones a lo anterior y cooperará con cualquier autoridad competente en la persecución de los usuarios que estén envueltos en tales violaciones.
</Typography>


<Typography variant="paragraph">
        <strong>4. Condiciones de Uso y Usos prohibidos del Portal</strong><br/>
<p>Se prohíbe la utilización total o parcial del portal para promocionar, publicitar, hacer propaganda, apología o cualquier exaltación de entidades sin ánimo de lucro, empresas mercantiles, personas naturales o jurídicas diferentes de MINCIENCIAS y sus funcionarios.</p>
<p>El Portal puede ser usado únicamente con propósitos relacionados con la innovación, ciencia, tecnología e investigación. MINCIENCIAS prohíbe el uso del Portal en cualquiera de las siguientes formas:</p>
<p>Incluir en el Portal cualquier información falsa o inexacta o información que no corresponda a la realidad.</p>
<p>Borrar o modificar cualquier material incluido en el Portal por cualquiera otra persona o entidad, sin la debida autorización.</p>
<p>Usar cualquier elemento, diseño, software o rutina para interferir o intentar interferir con el funcionamiento adecuado de este Portal o cualquier actividad que sea llevada a cabo en el Portal.</p>
<p>Intentar descifrar, de-compilar o desensamblar cualquier software comprendido en el Portal o que de cualquier manera haga parte del Portal.</p>
<p>En general, incluir o colocar en el Portal información falsa, inexacta, incompleta o engañosa.</p>
<p>Si usted tiene un password o contraseña que le permita el acceso a un área no pública de este Portal, no podrá revelar o compartir ese password o contraseña con terceras personas o usar el password o contraseña para propósitos no autorizados.</p>
<br></br>
<p>Estos Términos y Condiciones han sido dispuestos de conformidad con las leyes colombianas. Cualquier acción o reclamación deberá hacerse ante los Tribunales de Colombia y de conformidad con las leyes colombianas, así el reclamante se encuentre domiciliado en otro país.</p>
Registro y Participación del Usuario
<p>Por el hecho de ingresar al Portal y para garantizar el buen y adecuado uso del mismo, el Usuario deberá cumplir con lo siguiente:</p>
Observar Guía de principios y recomendaciones, los Términos y Condiciones y cualquier otra condición establecida en este Portal web.
Ser responsable por cualquier actividad que se lleve a cabo bajo su registro.
Ser responsable por mantener la confidencialidad de su password o contraseña. Usted será responsable por todos los usos de su registro en el Portal, sean o no autorizados por usted. Usted acuerda notificar inmediatamente a MINCIENCIAS, cualquier uso no autorizado de su registro y password o contraseña.- No abusar, acosar, amenazar o intimidar a otros usuarios del Portal ya sea a través de los chats, foros, blogs o cualquier otro espacio de participación que este activo o por activar en el futuro.
No usar este Portal como medio para desarrollar actividades ilegales o no autorizadas tanto en Colombia, como en cualquier otro país.
Abstenerse de enviar correo electrónico no deseado (SPAM) a otros Usuarios de este Portal, así como también le está prohibido transmitir virus o cualquier código de naturaleza destructiva.
 Canalizar sus quejas, reclamos y denuncias a través de la sección de Contacto en el Portal web.
 Agredir, injuriar, calumniar y en cualquier forma referirse en términos irrespetuosos o falsos a MINCIENCIAS y a otros usuarios del portal o a otras personas naturales o jurídicas así no sean usuarias del mismo.
 Vulnerar o intentar hacerlo, con cualquier comportamiento, las seguridades de las informaciones, datos, estadísticas y demás elementos que estén incorporados al portal o sean resultado de procesos investigativos de MINCIENCIAS o sus investigadores, so pena de hacerse acreedor a las sanciones contempladas en la Ley 1273 del 2009.
Mientras en el Portal estén prohibidas estas conductas, MINCIENCIAS no será responsable por su cumplimiento y el Usuario lo mantendrá indemne por todo concepto.

</Typography>

<Typography variant="paragraph">
        <strong> TÉRMINOS Y CONDICIONES DE USO DE CONFIAPP</strong><br/>
       
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
desaparecido e información de menores bajo la tutela del usuario.
<p></p>1.2 Al utilizar ConfiApp, el usuario autoriza de manera previa, expresa e informada el tratamiento
de sus datos personales conforme a los fines establecidos en estos Términos. ConfiApp se
compromete a cumplir con los principios de legalidad, finalidad, libertad, veracidad, transparencia,
acceso restringido, en el tratamiento de los datos personales de sus usuarios.
<p></p>1.3 ConfiApp actuará como responsable del tratamiento de los datos personales recolectados a
través de la Aplicación, y se obliga a cumplir con los deberes legales aplicables, como garantizar el
ejercicio de los derechos de los titulares, mantener medidas necesarias para evitar adversidades,
pérdida o acceso no autorizado, y tramitar de forma oportuna las solicitudes de los usuarios
relacionadas con sus datos personales.
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

</div>
    <Button onClick={closeModal}>Aceptar</Button>
                 </div>
                 </div>
               )}



        </section>
    );
}

export default SignUp;
