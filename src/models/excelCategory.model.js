const prefixArq = 'arq.';
const prefixDc = 'dc.';
/*

 addRegularData( 'dc.creator', $Row[9] );
                addRegularData( 'dc.title', $Row[0] );
                addRegularData( 'dc.date', $dspaceDate );
                */
export const excelCategory = {
   // dcCreator:{ excel: 'Nombre', dspace: `${prefixDc}creator` },
    dcTitle:{ excel: 'Nombre', dspace: `${prefixDc}title` },
    dcDate:{ sistema: 'DUMMY EXCEL', dspace: `${prefixDc}date` },
    dcCreator:{ excel: 'Entidad', dspace: `${prefixDc}creator` },
    nombre: { excel: 'Nombre', dspace: `${prefixArq}Nombre` }, // ✅
    direccion: {excel:'Dirección',dspace:`${prefixArq}Direccion`}, // ✅
    pertence: {excel:'Pertenece a',dspace:`${prefixArq}Pertenencia`},// ✅
    localidad: {excel:'Localidad',dspace:`${prefixArq}Localidad`},// ✅
    municipio: {excel:'Municipio',dspace:`${prefixArq}Municipio`},// ✅
    entidad: {excel:'Entidad',dspace:`${prefixArq}Entidad`},// ✅
    jurisdiccionEclesiasticaFundacion: {excel:'Jurisdiccion eclesiastica de su fundacion',dspace:`${prefixArq}Jurisdiccion`},// ✅
    categoriaActual:{excel:'Categoria actual',dspace:`${prefixArq}CategoriaActual`},// ✅
    categoriaOriginal: {excel:'Categoría original',dspace:`${prefixArq}CategoriaOriginal`},// ✅
    epocaConstruccion: {excel:'Epoca de construcción',dspace:`${prefixArq}Epoca`},
    anioConstruccion: {excel:'Año de construcción y fechas significativas',dspace:`${prefixArq}Anio`},// ✅
    usoActual: {excel:'usoActual',dspace:`${prefixArq}UsoActual`},// ✅
    fundador: {excel:'fundador',dspace:`${prefixArq}Fundador`},// ✅
    constructor: {excel:'constructor',dspace:`${prefixArq}Constructor`},// ✅
    estadoConservacion:{excel:'Estado de conservación',dspace:`${prefixArq}EstadoConservacion`},// ✅
    tipologia:{excel:'Tipología',dspace:`${prefixArq}Tipologia`},
    tipologiaArquitectonicaIglesias:{excel:'Tipología arquitectónica de las iglesias',dspace:`${prefixArq}TipologiaArqui`},
    muros:{excel:'muros',dspace:`${prefixArq}Muros`},
    sistemaCubiertaOriginal:{excel:'Sistema de cubierta original',dspace:`${prefixArq}SistemaCubierta`},
    sistemaEstructuralPresbiterio:{excel:'Sistema estructural del presbiterio',dspace:`${prefixArq}SisEstructPresbiterio`},
    sistemaEstructuralCoro:{excel:'Sistema estructural del coro',dspace:`${prefixArq}SisEstructCoro`},
    pisos:{excel:'pisos',dspace:`${prefixArq}Pisos`},// ✅
    acabados:{excel:'acabados',dspace:`${prefixArq}Acabados`},// ✅
    materiales:{excel:'materiales',dspace:`${prefixArq}Materiales`},// ✅
    gallinasCiegas:{excel:'Gallinas ciegas',dspace:`${prefixArq}GallinasCiegas`},// ✅
    bienesMueblesElementosSignificativosRelevantes:{excel:'Bienes muebles y elementos significativos relevantes',dspace:`${prefixArq}Bienes`},// ✅
    observacionesBienesMueblesElementosSignificativosRelevantes:{excel:'Observaciones de bienes muebles y elementos significativos relevantes',dspace:`${prefixArq}ObservBienes`},// ✅
    observacionesGenerales:{excel:'Observaciones generales',dspace:`${prefixArq}ObservGenerales`},// ✅
    mapsLatitud:{excel:'Latitud',dspace:`${prefixArq}Latitud`},
    mapsLongitud:{excel:'Longitud',dspace:`${prefixArq}Longitud`}
}