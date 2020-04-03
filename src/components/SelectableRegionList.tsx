import { Region, RegionCode } from '../types';
import { allRegions } from '../resources/regions';
import React, { useCallback } from 'react';

const RegionItem = ({
    region,
    checked,
    toggler,
}: {
    region: Region;
    checked: boolean;
    toggler: (code: RegionCode) => void;
}) => {
    const handleChange = useCallback(
        event => toggler(Number(event.target.value) as RegionCode),
        [toggler]
    );

    return (
        <label className="form-check dropdown-item mb-0">
            <input
                type="checkbox"
                value={region.code}
                id={'region'+region.code}
                className="form-check-input"
                checked={checked}
                onChange={handleChange}
            />
            <span className="form-check-label">{region.name}</span>
        </label>
    );
};

export const SelectableRegionList = function({
    selected,
    toggler,
}: {
    selected: RegionCode[];
    toggler: (code: RegionCode) => void;
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
                Regions
            </label>
            <div className="dropdown-menu" aria-labelledby="regionDropdown">
                <div className="SelectableRegionList list-group">
                    {allRegions.map(region => (
                        <RegionItem
                            region={region}
                            checked={selected.includes(region.code)}
                            toggler={toggler}
                            key={region.code}
                        />
                    ))}
                </div>
            </div>
        </li>
    );
};
