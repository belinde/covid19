import { MetricCode, Metric } from '../types';
import React, { useCallback, ChangeEvent } from 'react';
import { allMetrics } from '../resources/metrics';

const MetricItem = ({
    metric,
    checked,
    toggler,
}: {
    metric: Metric;
    checked: boolean;
    toggler: (code: MetricCode) => void;
}) => {
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) =>
            toggler(event.target.value as MetricCode),
        [toggler]
    );

    return (
        <label className="form-check dropdown-item mb-0">
            <input
                type="checkbox"
                value={metric.code}
                className="form-check-input"
                checked={checked}
                onChange={handleChange}
            />
            <span className="form-check-label">{metric.name}</span>
        </label>
    );
};

export const SelectableMetricList = function({
    selected,
    toggler,
}: {
    selected: MetricCode[];
    toggler: (code: MetricCode) => void;
}) {
    return (
        <li className="nav-item dropdown">
            <label
                className="nav-link dropdown-toggle"
                id="regionDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Metrics
            </label>
            <div className="dropdown-menu" aria-labelledby="regionDropdown">
                <div className="SelectableRegionList list-group">
                    {allMetrics.map(metric => (
                        <MetricItem
                            metric={metric}
                            checked={selected.includes(metric.code)}
                            toggler={toggler}
                            key={metric.code}
                        />
                    ))}
                </div>
            </div>
        </li>
    );
};
