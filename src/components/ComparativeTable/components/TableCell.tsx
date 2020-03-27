import React from 'react';
import { MetricCode, RegionCode } from '../../../types';
import { RegionsValues } from '../types';

export const TableCell = ({
    region,
    metrics,
    data,
}: {
    region: RegionCode;
    metrics: MetricCode[];
    data: RegionsValues;
}) => {
    return (
        <td key={region}>
            {metrics.map(metric => (
                <div key={metric}>{data[region][metric].toLocaleString()}</div>
            ))}
        </td>
    );
};
