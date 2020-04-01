import React from 'react';
import { RegionCode } from '../../../types';
import { regionsNameMap } from '../../../resources/regions';

export const TableHeader = ({ regions }: { regions: RegionCode[] }) => {
    return (
        <thead>
            <tr>
                <th className="text-left">Day</th>
                {regions.map(region => (
                    <th key={region} className="text-right">{regionsNameMap[region]}</th>
                ))}
                <th className="text-right">Metrics</th>
            </tr>
        </thead>
    );
};
