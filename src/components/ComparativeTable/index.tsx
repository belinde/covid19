import React from 'react';
import { MetricCode, RegionCode } from '../../types';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';

const ComparativeTable = ({
    metrics,
    regions,
}: {
    metrics: MetricCode[];
    regions: RegionCode[];
}) => {
    return (
        <table className="table table-hover table-sm">
            <TableHeader regions={regions} />
            <TableBody regions={regions} metrics={metrics} />
        </table>
    );
};

export default ComparativeTable;
