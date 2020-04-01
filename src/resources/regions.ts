import { Region, RegionCode } from '../types';

export const allRegions: Region[] = [
    {
        code: 13,
        name: 'Abruzzo',
        population: 1311580,
        area: 10831.84,
    },
    {
        code: 17,
        name: 'Basilicata',
        population: 562869,
        area: 10073.32,
    },
    {
        code: 18,
        name: 'Calabria',
        population: 1947131,
        area: 15221.9,
    },
    {
        code: 15,
        name: 'Campania',
        population: 5801692,
        area: 13670.95,
    },
    {
        code: 8,
        name: 'Emilia Romagna',
        population: 4459477,
        area: 22452.78,
    },
    {
        code: 6,
        name: 'Friuli Venezia Giulia',
        population: 1215220,
        area: 7924.36,
    },
    {
        code: 12,
        name: 'Lazio',
        population: 5879082,
        area: 17232.29,
    },
    {
        code: 7,
        name: 'Liguria',
        population: 1550640,
        area: 5416.21,
    },
    {
        code: 3,
        name: 'Lombardia',
        population: 10060574,
        area: 23863.65,
    },
    {
        code: 11,
        name: 'Marche',
        population: 1525271,
        area: 9401.38,
    },
    {
        code: 14,
        name: 'Molise',
        population: 305617,
        area: 4460.65,
    },
    {
        code: 1,
        name: 'Piemonte',
        population: 4356406,
        area: 25387.07,
    },
    {
        code: 16,
        name: 'Puglia',
        population: 4029053,
        area: 19540.9,
    },
    {
        code: 20,
        name: 'Sardegna',
        population: 1639591,
        area: 24100.02,
    },
    {
        code: 19,
        name: 'Sicilia',
        population: 4999891,
        area: 25832.39,
    },
    {
        code: 9,
        name: 'Toscana',
        population: 3729641,
        area: 22987.04,
    },
    {
        code: 4,
        name: 'Trentino Alto Adige',
        population: 1072276,
        area: 13605.5,
    },
    {
        code: 10,
        name: 'Umbria',
        population: 882015,
        area: 8464.33,
    },
    {
        code: 2,
        name: "Valle d'Aosta",
        population: 125666,
        area: 3260.9,
    },
    {
        code: 5,
        name: 'Veneto',
        population: 4905854,
        area: 18345.35,
    },
];

export const regionsNameMap = allRegions.reduce((acc, reg) => {
    acc[reg.code] = reg.name;
    return acc;
}, {} as Record<RegionCode, string>);
