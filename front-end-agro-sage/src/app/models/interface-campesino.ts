export interface InterfaceCampesino {
    idCampesino: number,
    documento: string,
    clave: string,
    nombres: string,
    apellidos: string,
    correo: string,
    telefono: string,
    direccion: string,
    latitud: number,
    longitud: number,
    estado: boolean,
}

export interface campesinoResponse{
    records: InterfaceCampesino[]
}
