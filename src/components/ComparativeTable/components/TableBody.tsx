import React from 'react';
import { MetricCode, RegionCode} from '../../../types';
import { metricsNameMap } from '../../../resources/metrics';
import { TableCell } from './TableCell';
import { useDpcData } from '../../../hooks/useDpcData';

export const TableBody = ({
    regions,
    metrics,
}: {
    regions: RegionCode[];
    metrics: MetricCode[];
}) => {
    const allData = useDpcData(regions, metrics);

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
                    <td className="text-left">{new Date(day).toLocaleDateString()}</td>
                    {regions.map(region => (
                        <TableCell
                            key={region}
                            region={region}
                            metrics={metrics}
                            data={allData[day]}
                        />
                    ))}
                    <td className="text-right">{typeDescriptions}</td>
                </tr>
            );
        });
    return <tbody>{content}</tbody>;
};
