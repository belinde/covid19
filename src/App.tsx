import React, { useState, useCallback } from 'react';
import { RegionCode, MetricCode } from './types';
import { SelectableRegionList } from './components/SelectableRegionList';
import { ComparativeTable } from './components/ComparativeTable';

import {} from './resources/metrics';
import { SelectableMetricList } from './components/SelectableMetricList';

const App = function() {
    const [selectedMetrics, setSelectedMetrics] = useState<MetricCode[]>([]);
    const [selectedRegions, setSelectedRegions] = useState<RegionCode[]>([]);

    const toggleMetric = useCallback(
        (code: MetricCode) => {
            setSelectedMetrics(
                selectedMetrics.includes(code)
                    ? selectedMetrics.filter(val => val !== code)
                    : [...selectedMetrics, code]
            );
        },
        [selectedMetrics, setSelectedMetrics]
    );

    const toggleRegion = useCallback(
        (code: RegionCode) => {
            setSelectedRegions(
                selectedRegions.includes(code)
                    ? selectedRegions.filter(val => val !== code)
                    : [...selectedRegions, code]
            );
        },
        [selectedRegions, setSelectedRegions]
    );

    return (
        <>
            <div className="covid19it m-3">
                <h1 className="mb-3">COVID-19 status and history in Italy</h1>
                <div className="row">
                    <div className="col-3">
                        <SelectableRegionList
                            selected={selectedRegions}
                            toggler={toggleRegion}
                        />
                    </div>
                    <div className="col-2">
                        <SelectableMetricList
                            selected={selectedMetrics}
                            toggler={toggleMetric}
                        />
                    </div>
                    <div className="col-7">
                        <ComparativeTable
                            metrics={selectedMetrics}
                            regions={selectedRegions}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
