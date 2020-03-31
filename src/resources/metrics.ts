import { Metric, MetricCode } from '../types';

export const allMetrics: Metric[] = [
    {
        code: MetricCode.totalCases,
        name: 'Total cases',
        description: 'Total amount of positive cases.',
        composedBy: []
    },
    {
        code: MetricCode.swabs,
        name: 'Total swabs',
        description: 'Cumulative number of tests performed. Some patients could be tested multiple times.',
        composedBy: []
    },
    {
        code: MetricCode.deceased,
        name: 'Deceased',
        description: 'Cumulative number of deaths.',
        composedBy: []
    },
    {
        code: MetricCode.totalCurrentlyPositive,
        name: 'Total currently positive',
        description: 'Total amount of current positive cases.',
        composedBy: [
            {
                code: MetricCode.totalHospitalized,
                name: 'Total hospitalized',
                description: 'Total hospitalised patients.',
                composedBy: [
                    {
                        code: MetricCode.hospitalizedWithSymptoms,
                        name: 'Hospitalized with symptoms',
                        description: 'Hospitalised patients with symptoms.',
                        composedBy: []
                    },
                    {
                        code: MetricCode.intensiveTherapy,
                        name: 'Intensive therapy',
                        description: 'Intensive Care.',
                        composedBy: []
                    },]
            },
            {
                code: MetricCode.homeInsulation,
                name: 'Home insulation',
                description: 'Number of people confined at home.',
                composedBy: []
            },]
    },
    {
        code: MetricCode.newCurrentlyPositive,
        name: 'New currently positive',
        description: 'Amount of new current positive cases (current total amount of positive cases, minus the number of current positive cases of the previous day).',
        composedBy: []
    },
    {
        code: MetricCode.dischargedHealed,
        name: 'Discharged healed',
        description: 'Cumulative amount of patients fully recovered',
        composedBy: []
    },
];

export const metricsNameMap = allMetrics.reduce((acc, typ) => {
    acc[typ.code] = typ.name;
    return acc;
}, {} as Record<MetricCode, string>);
