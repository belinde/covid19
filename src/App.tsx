import React, { useState, useCallback } from 'react';
import { RegionCode, MetricCode } from './types';
import { DataDisplayChooser } from './components/DataDisplayChooser';
import { NavigationBar } from './components/NavigationBar';

const App = function() {
    const [selectedMetrics, setSelectedMetrics] = useState<MetricCode[]>([
        MetricCode.totalCases,
    ]);
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
        <div style={{paddingTop:'80px'}}>
            <NavigationBar
                selectedRegions={selectedRegions}
                togglerRegions={toggleRegion}
                selectedMetrics={selectedMetrics}
                togglerMetrics={toggleMetric}
            />
            <div className="covid19it m-3">
                <DataDisplayChooser
                    metrics={selectedMetrics}
                    regions={selectedRegions}
                />
            </div>
        </div>
    );
};

export default App;
