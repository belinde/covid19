import { Region, RegionCode } from '../types';
import {allRegions} from '../resources/regions';
import React, { useCallback, ChangeEvent } from 'react';

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
        (event: ChangeEvent<HTMLInputElement>) => toggler(parseInt(event.target.value) as RegionCode),
        [toggler]
    );

    return (
        <label className="list-group-item list-group-item-action p-2 mb-0">
            <div className="form-check">
                <input
                    type="checkbox"
                    value={region.code}
                    className="form-check-input"
                    checked={checked}
                    onChange={handleChange}
                />
                <strong>{region.name}</strong>
                <div className="text-small row">
                    <div className="col-6">
                        <small>
                            <em>
                                Population {region.population.toLocaleString()}
                            </em>
                        </small>
                    </div>
                    <div className="col-6">
                        <small>
                            <em>
                                Area {region.area.toLocaleString()} Km
                                <sup>2</sup>
                            </em>
                        </small>
                    </div>
                </div>
            </div>
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
    );
};
