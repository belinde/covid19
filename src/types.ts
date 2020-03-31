export enum MetricCode {
    hospitalizedWithSymptoms = 'ricoverati_con_sintomi',
    intensiveTherapy = 'terapia_intensiva',
    totalHospitalized = 'totale_ospedalizzati',
    homeInsulation = 'isolamento_domiciliare',
    totalCurrentlyPositive = 'totale_attualmente_positivi',
    newCurrentlyPositive = 'nuovi_attualmente_positivi',
    dischargedHealed = 'dimessi_guariti',
    deceased = 'deceduti',
    totalCases = 'totale_casi',
    swabs = 'tamponi',
}

export type RegionCode =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20;

export type DpcRegionDayData = {
    data: string;
    stato: string;
    codice_regione: RegionCode;
    denominazione_regione: string;
    lat: number;
    long: number;
} & {
    [propName in MetricCode]: number;
};

export interface Region {
    code: RegionCode;
    name: string;
    population: number;
    area: number;
}

export interface Metric {
    code: MetricCode;
    name: string;
    description: string;
    composedBy: Metric[];
}
