import {
    RegionCode,
    MetricCode,
    DpcRegionDayData,
    RegionsValues,
    MetricsValues,
    FilteredData,
} from '../types';
import { useState, useEffect } from 'react';

const getDpcCleaner = (regions: RegionCode[], metrics: MetricCode[]) => {
    const emptyDay = (
        regions: RegionCode[],
        metrics: MetricCode[]
    ): RegionsValues => {
        let day = {} as RegionsValues;
        for (let region of regions) {
            day[region] = {} as MetricsValues;
            for (let metric of metrics) {
                day[region][metric] = 0;
            }
        }
        return day;
    };

    return (acc: FilteredData, row: DpcRegionDayData): FilteredData => {
        const dayKey = row.data.slice(0, 10);
        if (typeof acc[dayKey] === 'undefined') {
            acc[dayKey] = emptyDay(regions, metrics);
        }
        for (let metric of metrics) {
            acc[dayKey][row.codice_regione][metric] += row[metric];
        }
        return acc;
    };
};

export const useDpcData = (
    regions: RegionCode[],
    metrics: MetricCode[]
): FilteredData => {
    const [roughData, setRoughData] = useState<DpcRegionDayData[]>([]);

    useEffect(() => {
        const source =
            'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json';
        fetch(source)
            .then(response => response.json())
            .then((data: DpcRegionDayData[]) => setRoughData(data));
    }, [setRoughData]);

    return roughData
        .filter(row => regions.includes(row.codice_regione))
        .reduce(getDpcCleaner(regions, metrics), {} as FilteredData);
};
