import React from 'react';
import logo from './resources/logo.png';
import { RegionCode, MetricCode } from '../../types';
import { SelectableRegionList } from '../SelectableRegionList';
import { SelectableMetricList } from '../SelectableMetricList';

export const NavigationBar = ({
    selectedRegions,
    togglerRegions,
    selectedMetrics,
    togglerMetrics,
}: {
    selectedRegions: RegionCode[];
    togglerRegions: (code: RegionCode) => void;
    selectedMetrics: MetricCode[];
    togglerMetrics: (code: MetricCode) => void;
}) => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
            <span className="navbar-brand">
                <img
                    src={logo}
                    width="32"
                    height="32"
                    className="d-inline-block align-top mr-1"
                    alt="COVID-19"
                />
                COVID-19 in Italy
            </span>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav mr-auto">
                    <SelectableRegionList
                        selected={selectedRegions}
                        toggler={togglerRegions}
                    />
                    <SelectableMetricList
                        selected={selectedMetrics}
                        toggler={togglerMetrics}
                    />
                </ul>
            </div>
        </nav>
    );
};
