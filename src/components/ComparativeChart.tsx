import React, { useEffect } from 'react';
import { MetricCode, RegionCode, FilteredData } from '../types';
import { metricsNameMap } from '../resources/metrics';
import { regionsNameMap } from '../resources/regions';
import Chart, { ChartDataSets, ChartPoint, PointStyle } from 'chart.js';
import { useDpcData } from '../hooks/useDpcData';

const colors: {
    r: number;
    g: number;
    b: number;
}[] = [
    { r: 150, g: 0, b: 0 },
    { r: 0, g: 150, b: 0 },
    { r: 0, g: 0, b: 150 },
    { r: 150, g: 150, b: 0 },
    { r: 150, g: 0, b: 150 },
    { r: 0, g: 150, b: 150 },
    { r: 250, g: 0, b: 0 },
    { r: 0, g: 250, b: 0 },
    { r: 0, g: 0, b: 250 },
    { r: 250, g: 250, b: 0 },
    { r: 250, g: 0, b: 250 },
    { r: 0, g: 250, b: 250 }
];

const makeColor = (idx: number): string => {
    const col = colors[idx % colors.length];
    return `rgb(${col.r},${col.g},${col.b})`;
};

let points = {} as Record<MetricCode, PointStyle>;
points[MetricCode.hospitalizedWithSymptoms] = 'rect';
points[MetricCode.intensiveTherapy] = 'crossRot';
points[MetricCode.totalHospitalized] = 'rect';
points[MetricCode.homeInsulation] = 'triangle';
points[MetricCode.totalCurrentlyPositive] = 'circle';
points[MetricCode.newCurrentlyPositive] = 'rectRot';
points[MetricCode.newPositive] = 'dash';
points[MetricCode.dischargedHealed] = 'star';
points[MetricCode.deceased] = 'cross';
points[MetricCode.totalCases] = 'rectRounded';
points[MetricCode.swabs] = 'line';

const makePointStyle = (idx: MetricCode): PointStyle => {
    return typeof points[idx] === 'undefined' ? 'circle' : points[idx];
};

interface Permutation {
    metric: MetricCode;
    region: RegionCode;
    label: string;
    sequence: number;
}

const makePermutations = (
    metrics: MetricCode[],
    regions: RegionCode[]
): Permutation[] => {
    let seq = 0;
    return regions.reduce((acc, region) => {
        return acc.concat(
            metrics.map(metric => {
                return {
                    metric: metric,
                    region: region,
                    label: `${regionsNameMap[region]}, ${metricsNameMap[metric]}`,
                    sequence: seq++,
                };
            })
        );
    }, [] as Permutation[]);
};

const datasetMapper = (
    data: FilteredData,
    metrics: MetricCode[],
    regions: RegionCode[]
): ChartDataSets[] => {
    return makePermutations(metrics, regions).map(perm => {
        return {
            label: perm.label,
            fill: false,
            borderColor: makeColor(perm.sequence),
            radius: 5,
            pointBorderWidth: 3,
            pointStyle: makePointStyle(perm.metric),
            data: Object.keys(data).map(
                (day): ChartPoint => {
                    return {
                        t: new Date(day),
                        y: data[day][perm.region][perm.metric],
                    };
                }
            ),
        };
    }, [] as ChartDataSets[]);
};

const ComparativeChart = ({
    metrics,
    regions,
}: {
    metrics: MetricCode[];
    regions: RegionCode[];
}) => {
    const reference = React.createRef<HTMLCanvasElement>();

    const filteredData = useDpcData(regions, metrics);

    useEffect(() => {
        const myChart = new Chart(reference.current!, {
            type: 'line',
            options: {
                maintainAspectRatio: false,
                legend: {
                    align: 'start',
                    position: 'left',
                    labels: {
                        usePointStyle: true,
                    },
                },
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
            data: {
                datasets: datasetMapper(filteredData, metrics, regions),
            },
        });
        return () => {
            myChart.destroy();
        };
    }, [reference, filteredData, metrics, regions]);

    return (
        <div style={{ height: '800px' }}>
            <canvas ref={reference} />
        </div>
    );
};

export default ComparativeChart;
