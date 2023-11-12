
export interface ItemExcel {
    dcTitle:                                                     ExcelDspace;
    dcDate:                                                      DcDate;
    dcCreator:                                                   ExcelDspace;
    nombre:                                                      ExcelDspace;
    direccion:                                                   ExcelDspace;
    pertence:                                                    ExcelDspace;
    localidad:                                                   ExcelDspace;
    municipio:                                                   ExcelDspace;
    entidad:                                                     ExcelDspace;
    jurisdiccionEclesiasticaFundacion:                           ExcelDspace;
    categoriaActual:                                             ExcelDspace;
    categoriaOriginal:                                           ExcelDspace;
    epocaConstruccion:                                           ExcelDspace;
    anioConstruccion:                                            ExcelDspace;
    usoActual:                                                   ExcelDspace;
    fundador:                                                    ExcelDspace;
    constructor:                                                 ExcelDspace;
    estadoConservacion:                                          ExcelDspace;
    tipologia:                                                   ExcelDspace;
    tipologiaArquitectonicaIglesias:                             ExcelDspace;
    muros:                                                       ExcelDspace;
    sistemaCubiertaOriginal:                                     ExcelDspace;
    sistemaEstructuralPresbiterio:                               ExcelDspace;
    sistemaEstructuralCoro:                                      ExcelDspace;
    pisos:                                                       ExcelDspace;
    acabados:                                                    ExcelDspace;
    materiales:                                                  ExcelDspace;
    gallinasCiegas:                                              ExcelDspace;
    bienesMueblesElementosSignificativosRelevantes:              ExcelDspace;
    observacionesBienesMueblesElementosSignificativosRelevantes: ExcelDspace;
    observacionesGenerales:                                      ExcelDspace;
}

export interface ExcelDspace {
    excel:  string;
    dspace: string;
}

export interface DcDate {
    sistema: string;
    dspace:  string;
}
