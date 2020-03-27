import { Metric, MetricCode } from '../types';

export const allMetrics: Metric[] = [
    {
        code: MetricCode.totalCases,
        name: 'Total cases',
        description: 'Total amount of positive cases.',
    },
    {
        code: MetricCode.swabs,
        name: 'Total swabs',
        description: 'Tests performed.',
    },
    {
        code: MetricCode.deceased,
        name: 'Deceased',
        description: 'Deaths.',
    },
    {
        code: MetricCode.hospitalizedWithSymptoms,
        name: 'Hospitalized with symptoms',
        description: 'Hospitalised patients with symptoms.',
    },
    {
        code: MetricCode.intensiveTherapy,
        name: 'Intensive therapy',
        description: 'Intensive Care.',
    },
    {
        code: MetricCode.totalHospitalized,
        name: 'Total hospitalized',
        description: 'Total hospitalised patients.',
    },
    {
        code: MetricCode.homeInsulation,
        name: 'Home insulation',
        description: 'Home confinement.',
    },
    {
        code: MetricCode.totalCurrentlyPositive,
        name: 'Total currently positive',
        description: 'Total amount of current positive cases (Hospitalised patients + Home confinement).',
    },
    {
        code: MetricCode.newCurrentlyPositive,
        name: 'New currently positive',
        description: 'Amount of new current positive cases (Actual total amount of current positive cases - total amount of current positive cases of the previous day).',
    },
    {
        code: MetricCode.dischargedHealed,
        name: 'Discharged healed',
        description: 'Recovered',
    },
];

export const metricsNameMap = allMetrics.reduce((acc, typ) => {
    acc[typ.code] = typ.name;
    return acc;
}, {} as Record<MetricCode, string>);
