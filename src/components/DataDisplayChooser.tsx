import React, { useState } from 'react';
import { MetricCode, RegionCode } from '../types';
import ComparativeTable from './ComparativeTable';
import ComparativeChart from './ComparativeChart';

const NavButton = ({
    display,
    value,
    label,
    setter,
}: {
    display: string;
    value: string;
    label: string;
    setter: (val: string) => void;
}) => {
    return (
        <li className="nav-item">
            <label
                style={{ cursor: 'pointer' }}
                onClick={() => setter(value)}
                className={
                    display === value ? 'nav-link m-0 active' : 'nav-link m-0'
                }
            >
                {label}
            </label>
        </li>
    );
};

export const DataDisplayChooser = ({
    metrics,
    regions,
}: {
    metrics: MetricCode[];
    regions: RegionCode[];
}) => {
    const [display, setDisplay] = useState('chart');
    let body;
    switch (display) {
        case 'chart':
            body = <ComparativeChart metrics={metrics} regions={regions} />;
            break;
        case 'table':
            body = <ComparativeTable metrics={metrics} regions={regions} />;
            break;
        default:
            body = <div>Unknown visualization type required</div>;
            break;
    }
    return (
        <div className="card text-center">
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                    <NavButton
                        display={display}
                        value="chart"
                        label="Chart"
                        setter={setDisplay}
                    />
                    <NavButton
                        display={display}
                        value="table"
                        label="Table"
                        setter={setDisplay}
                    />
                </ul>
            </div>
            <div className="card-body">
                {body}
            </div>
        </div>
    );
};
