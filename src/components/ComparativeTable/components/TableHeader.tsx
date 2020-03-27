import React from 'react';
import { RegionCode } from '../../../types';
import { regionsNameMap } from '../../../resources/regions';

export const TableHeader = ({ regions }: { regions: RegionCode[] }) => {
    return (
        <thead>
            <tr>
                <th>Day</th>
                {regions.map(region => (
                    <th key={region}>{regionsNameMap[region]}</th>
                ))}
                <th>Metrics</th>
            </tr>
        </thead>
    );
};
