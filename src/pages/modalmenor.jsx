import React from 'react';
import { Typography, Button } from "@material-tailwind/react"; // Asegúrate de importar los componentes necesarios de Material Tailwind

const ModalMenor = ({ onClose, childInfo }) => {
    const { nombres, apellidos, tipoIdentificacion, numeroIdentificacion, edad, telefono, correo } = childInfo;

    return (
        // <div className="modal">
        //     <div className="modal-content">
        //         <Typography variant="h5" color="blue-gray">
        //             Información del menor
        //         </Typography>
        //         <div>
        //             <Typography variant="paragraph" className="font-normal" color="gray">
        //                 Nombre: {nombres}
        //             </Typography>
        //             <Typography variant="paragraph" className="font-normal" color="gray">
        //                 Apellido: {apellidos}
        //             </Typography>
        //             <Typography variant="paragraph" className="font-normal" color="gray">
        //                 Tipo de identificación: {tipoIdentificacion}
        //             </Typography>
        //             <Typography variant="paragraph" className="font-normal" color="gray">
        //                 Número de identificación: {numeroIdentificacion}
        //             </Typography>
        //             <Typography variant="paragraph" className="font-normal" color="gray">
        //                 Edad: {edad}
        //             </Typography>
        //             <Typography variant="paragraph" className="font-normal" color="gray">
        //                 Teléfono: {telefono}
        //             </Typography>
        //             <Typography variant="paragraph" className="font-normal" color="gray">
        //                 Correo electrónico: {correo}
        //             </Typography>
        //         </div>
        //         <Button onClick={onClose} color="blue-gray" ripple="light">
        //             Cerrar
        //         </Button>
        //     </div>
        // </div>








        <div className="modal">
    <div className="modal-content" style={{ width: '400px' }}>
        <Typography variant="h4" color="primary" gutterBottom>
            Detalles del Menor
        </Typography>
        <div className="info-container">
            <div className="info-item" style={{ textAlign: 'left' }}>
                <Typography variant="body1" color="textSecondary">
                    <strong>Nombre:</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                    {nombres}
                </Typography>
            </div>
            <div className="info-item" style={{ textAlign: 'left' }}>
                <Typography variant="body1" color="textSecondary">
                    <strong>Apellido:</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                    {apellidos}
                </Typography>
            </div>
            <div className="info-item" style={{ textAlign: 'left' }}>
                <Typography variant="body1" color="textSecondary">
                    <strong>Tipo de ID:</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                    {tipoIdentificacion}
                </Typography>
            </div>
            <div className="info-item" style={{ textAlign: 'left' }}>
                <Typography variant="body1" color="textSecondary">
                    <strong>ID:</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                    {numeroIdentificacion}
                </Typography>
            </div>
            <div className="info-item" style={{ textAlign: 'left' }}>
                <Typography variant="body1" color="textSecondary">
                    <strong>Edad:</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                    {edad}
                </Typography>
            </div>
            <div className="info-item" style={{ textAlign: 'left' }}>
                <Typography variant="body1" color="textSecondary">
                    <strong>Teléfono:</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                    {telefono}
                </Typography>
            </div>
            <div className="info-item" style={{ textAlign: 'left' }}>
                <Typography variant="body1" color="textSecondary">
                    <strong>Correo electrónico:</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                    {correo}
                </Typography>
            </div>
        </div>
        <br />
        <Button onClick={onClose} color="primary" variant="contained" style={{ background: "#7ED2F3", color: "#000000" }}>
            Cerrar
        </Button>
    </div>
</div>

    );
};

export default ModalMenor;