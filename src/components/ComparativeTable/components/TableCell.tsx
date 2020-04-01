import React from 'react';
import { MetricCode, RegionCode, RegionsValues } from '../../../types';

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
                <div key={metric} className="text-right">{data[region][metric].toLocaleString()}</div>
            ))}
        </td>
    );
};
