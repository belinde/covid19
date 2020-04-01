import React, { useEffect } from 'react';
import { MetricCode, RegionCode, FilteredData } from '../../types';
import { metricsNameMap } from '../../resources/metrics';
import { regionsNameMap } from '../../resources/regions';
import Chart, { ChartDataSets, ChartPoint, PointStyle } from 'chart.js';
import { useDpcData } from '../../hooks/useDpcData';

interface Permutation {
    metric: MetricCode;
    region: RegionCode;
    label: string;
}

interface ColorComponent {
    r: number;
    g: number;
    b: number;
}

const colors: ColorComponent[] = [
    { r: 240, g: 163, b: 255 },
    { r: 0, g: 117, b: 220 },
    { r: 153, g: 63, b: 0 },
    { r: 76, g: 0, b: 92 },
    { r: 25, g: 25, b: 25 },
    { r: 0, g: 92, b: 49 },
    { r: 43, g: 206, b: 72 },
    { r: 255, g: 204, b: 153 },
    { r: 128, g: 128, b: 128 },
    { r: 148, g: 255, b: 181 },
    { r: 143, g: 124, b: 0 },
    { r: 157, g: 204, b: 0 },
    { r: 194, g: 0, b: 136 },
    { r: 0, g: 51, b: 128 },
    { r: 255, g: 164, b: 5 },
    { r: 255, g: 168, b: 187 },
    { r: 66, g: 102, b: 0 },
    { r: 255, g: 0, b: 16 },
    { r: 94, g: 241, b: 242 },
    { r: 0, g: 153, b: 143 },
    { r: 224, g: 255, b: 102 },
    { r: 116, g: 10, b: 255 },
    { r: 153, g: 0, b: 0 },
    { r: 255, g: 255, b: 128 },
    { r: 255, g: 255, b: 0 },
    { r: 255, g: 80, b: 5 },
];

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

const makeColor = (idx: number): string => {
    if (typeof colors[idx] === 'undefined') {
        return 'rgb(0,0,0)';
    }
    const col = colors[idx];
    return `rgb(${col.r},${col.g},${col.b})`;
};

const makePointStyle = (idx: MetricCode): PointStyle => {
    return typeof points[idx] === 'undefined' ? 'circle' : points[idx];
};

const makePermutations = (
    metrics: MetricCode[],
    regions: RegionCode[]
): Permutation[] => {
    return regions.reduce((acc, region) => {
        return acc.concat(
            metrics.map(metric => {
                return {
                    metric: metric,
                    region: region,
                    label: `${regionsNameMap[region]}, ${metricsNameMap[metric]}`,
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
    const permutations = makePermutations(metrics, regions);

    return permutations.map(perm => {
        return {
            label: perm.label,
            fill: false,
            borderColor: makeColor(perm.region),
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
