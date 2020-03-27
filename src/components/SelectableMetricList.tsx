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
        <label className="list-group-item list-group-item-action p-2 mb-0">
            <div className="form-check">
                <input
                    type="checkbox"
                    value={metric.code}
                    className="form-check-input"
                    checked={checked}
                    onChange={handleChange}
                />
                <strong>{metric.name}</strong>

                <small>
                    <em>{metric.description}</em>
                </small>
            </div>
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
        <div className="SelectableMetricList list-group">
            {allMetrics.map(metric => (
                <MetricItem
                    metric={metric}
                    checked={selected.includes(metric.code)}
                    toggler={toggler}
                    key={metric.code}
                />
            ))}
        </div>
    );
};
