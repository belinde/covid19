import React, { useState, useEffect } from 'react';
import { MetricCode, RegionCode, DpcRegionDayData } from '../../../types';
import { metricsNameMap } from '../../../resources/metrics';
import { RegionsValues, MetricsValues, FilteredData } from '../types';
import { TableCell } from './TableCell';

function emptyDay(regions: RegionCode[], metrics: MetricCode[]): RegionsValues {
    let day = {} as RegionsValues;
    for (let region of regions) {
        day[region] = {} as MetricsValues;
        for (let metric of metrics) {
            day[region][metric] = 0;
        }
    }
    return day;
}

const getDpcCleaner = (regions: RegionCode[], metrics: MetricCode[]) => {
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

export const TableBody = ({
    regions,
    metrics,
}: {
    regions: RegionCode[];
    metrics: MetricCode[];
}) => {
    const [roughData, setRoughData] = useState<DpcRegionDayData[]>([]);

    useEffect(() => {
        const source =
            'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json';
        fetch(source)
            .then(response => response.json())
            .then((data: DpcRegionDayData[]) => setRoughData(data));
    }, [setRoughData]);

    const allData = roughData
        .filter(row => regions.includes(row.codice_regione))
        .reduce(getDpcCleaner(regions, metrics), {} as FilteredData);

    const typeDescriptions = metrics.map(metric => (
        <div key={metric}>
            <small>{metricsNameMap[metric]}</small>
        </div>
    ));

    const content = Object.keys(allData)
        .sort()
        .map((day: string) => {
            return (
                <tr key={day}>
                    <td>{new Date(day).toLocaleDateString()}</td>
                    {regions.map(region => (
                        <TableCell
                            key={region}
                            region={region}
                            metrics={metrics}
                            data={allData[day]}
                        />
                    ))}
                    <td>{typeDescriptions}</td>
                </tr>
            );
        });
    return <tbody>{content}</tbody>;
};
