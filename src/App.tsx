import React, {useEffect} from 'react';

interface Region {
    key: number;
    name: string;
    selected: boolean;
}

interface ValueType {
    key: DpcValueTypes,
    name: string;
    selected: boolean;
}

interface DpcRegionDayData {
    data: string;
    stato: string;
    codice_regione: number;
    denominazione_regione: string;
    lat: number;
    long: number;
    ricoverati_con_sintomi: number;
    terapia_intensiva: number;
    totale_ospedalizzati: number;
    isolamento_domiciliare: number;
    totale_attualmente_positivi: number;
    nuovi_attualmente_positivi: number;
    dimessi_guariti: number;
    deceduti: number;
    totale_casi: number;
    tamponi: number;
}

enum DpcValueTypes {
    hospitalizedWithSymptoms = "ricoverati_con_sintomi",
    intensiveTherapy = "terapia_intensiva",
    totalHospitalized = "totale_ospedalizzati",
    homeInsulation = "isolamento_domiciliare",
    totalCurrentlyPositive = "totale_attualmente_positivi",
    newCurrentlyPositive = "nuovi_attualmente_positivi",
    dischargedHealed = "dimessi_guariti",
    deceased = "deceduti",
    totalCases = "totale_casi",
    swabs = "tamponi"
}

const knownValueTypes: ValueType[] = [
    {
        key: DpcValueTypes.totalCases,
        name: "Total cases",
        selected: false
    },
    {
        key: DpcValueTypes.swabs,
        name: "Total swabs",
        selected: false
    },
    {
        key: DpcValueTypes.deceased,
        name: "Deceased",
        selected: false
    },
    {
        key: DpcValueTypes.hospitalizedWithSymptoms,
        name: "Hospitalized with symptoms",
        selected: false
    },
    {
        key: DpcValueTypes.intensiveTherapy,
        name: "Intensive therapy",
        selected: false
    },
    {
        key: DpcValueTypes.totalHospitalized,
        name: "Total hospitalized",
        selected: false
    },
    {
        key: DpcValueTypes.homeInsulation,
        name: "Home insulation",
        selected: false
    },
    {
        key: DpcValueTypes.totalCurrentlyPositive,
        name: "Total currently positive",
        selected: false
    },
    {
        key: DpcValueTypes.newCurrentlyPositive,
        name: "New currently positive",
        selected: false
    },
    {
        key: DpcValueTypes.dischargedHealed,
        name: "Discharged healed",
        selected: false
    }
];

const App = function () {
    const [loading, setLoading] = React.useState(true);
    const [regions, setRegions] = React.useState([] as Region[]);
    const [allData, setAllData] = React.useState([] as DpcRegionDayData[]);
    const [valueTypes, setValueTypes] = React.useState(knownValueTypes);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json')
            .then(response => response.json())
            .then((data: DpcRegionDayData[]) => {
                let regions = data.reduce(function (acc, row) {
                    acc[row.codice_regione] = {
                        key: row.codice_regione,
                        name: row.denominazione_regione,
                        selected: false
                    };
                    return acc;
                }, [] as Region[]);
                regions.sort((a, b): number => a.name.localeCompare(b.name));
                setRegions(regions);
                setAllData(data);
                setLoading(false);
            });
    }, []);

    const toggler = function <T>(setter: (value: any) => void, source: { key: T, selected: boolean }[]) {
        return function (key: T) {
            setter(
                source.map(
                    (curr) => {
                        if (curr.key === key) {
                            curr.selected = !curr.selected;
                        }
                        return curr;
                    }
                )
            );
        };
    };


    return (
        <div>
            <Loader visible={loading}/>
            <div className="covid19it m-3">
                <h1 className="mb-3">COVID-19 status and history in Italy</h1>
                <div className="row">
                    <div className="col-2">
                        <CheckableListGroup items={regions} toggler={toggler<number>(setRegions, regions)}/>
                    </div>
                    <div className="col-2">
                        <CheckableListGroup items={valueTypes} toggler={toggler<string>(setValueTypes, valueTypes)}/>
                    </div>
                    <div className="col-8">Grafico</div>
                </div>
            </div>
        </div>
    );
};

const Loader = ({visible}: { visible: boolean }) => {
    return (
        <div className="loader" style={{display: visible ? 'block' : 'none'}}>
            <div className="spinner-border text-light" style={{width: '4rem', height: '4rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

const ListGroupItem = ({name, selected, action}: { name: string, selected: boolean, action: () => void }) => {
    return (
        <div onClick={action}
             className='list-group-item list-group-item-action p-2'>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" checked={selected}/>
                <label className="form-check-label">{name}</label>
            </div>
        </div>
    );
};

const CheckableListGroup = ({items, toggler}: { items: any[], toggler: (key: any) => void }) => {
    return (
        <div className="CheckableListGroup list-group">
            {items.map(value => <ListGroupItem
                key={value.key}
                name={value.name}
                selected={value.selected}
                action={() => toggler(value.key)}/>)}
        </div>
    );
};

export default App;
