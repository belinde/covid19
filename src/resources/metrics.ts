import { Metric, MetricCode } from '../types';

export const allMetrics: Metric[] = [
    {
        code: MetricCode.totalCases,
        name: 'Total cases',
        description: '',
    },
    {
        code: MetricCode.swabs,
        name: 'Total swabs',
        description: '',
    },
    {
        code: MetricCode.deceased,
        name: 'Deceased',
        description: '',
    },
    {
        code: MetricCode.hospitalizedWithSymptoms,
        name: 'Hospitalized with symptoms',
        description: '',
    },
    {
        code: MetricCode.intensiveTherapy,
        name: 'Intensive therapy',
        description: '',
    },
    {
        code: MetricCode.totalHospitalized,
        name: 'Total hospitalized',
        description: '',
    },
    {
        code: MetricCode.homeInsulation,
        name: 'Home insulation',
        description: '',
    },
    {
        code: MetricCode.totalCurrentlyPositive,
        name: 'Total currently positive',
        description: '',
    },
    {
        code: MetricCode.newCurrentlyPositive,
        name: 'New currently positive',
        description: '',
    },
    {
        code: MetricCode.dischargedHealed,
        name: 'Discharged healed',
        description: '',
    },
];

export const metricsNameMap = allMetrics.reduce((acc, typ) => {
    acc[typ.code] = typ.name;
    return acc;
}, {} as Record<MetricCode, string>);
