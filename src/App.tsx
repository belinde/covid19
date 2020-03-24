import React from 'react';

interface CovidState {
    loading: boolean;
    regions: Region[];
}

interface Region {
    key: number;
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

class App extends React.Component<Readonly<any>, CovidState> {
    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            loading: true,
            regions: [],
        }
    }

    componentDidMount(): void {
        fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json')
            .then((response) => {
                return response.json();
            })
            .then((data: DpcRegionDayData[]) => {
                let newState: CovidState = {
                    loading: false,
                    regions: [],
                };
                for (let row of data) {
                    newState.regions[row.codice_regione] = {
                        key: row.codice_regione,
                        name: row.denominazione_regione,
                        selected: false
                    };
                }
                newState.regions.sort((a, b): number => a.name.localeCompare(b.name));

                window.setTimeout(() => this.setState(newState), 200);
            });
    }

    toggleRegion(code: number) {
        // sicuramente il modo sbagliato
        let oldState = this.state;
        for (let curr in oldState.regions) {
            if (oldState.regions[curr].key === code) {
                oldState.regions[curr].selected = !oldState.regions[curr].selected;
            }
        }
        this.setState(oldState);
    }

    render(): React.ReactElement {
        return (
            <div>
                <Loader visible={this.state.loading}/>
                <div className="covid19it m-3">
                    <h1 className="mb-3">COVID-19 status and history in Italy</h1>
                    <div className="row">
                        <div className="col-2">
                            <ListRegions items={this.state.regions} toggler={this.toggleRegion.bind(this)}/>
                        </div>
                        <div className="col-2">Tipo dati</div>
                        <div className="col-8">Grafico</div>
                    </div>
                </div>
            </div>
        );
    }
}

interface LoaderProps {
    visible: boolean;
}

class Loader extends React.Component<LoaderProps, any> {
    render(): React.ReactElement {
        const disp: React.CSSProperties = {
            display: this.props.visible ? 'block' : 'none'
        };
        const spinStyle: React.CSSProperties = {
            width: '4rem',
            height: '4rem'
        };
        return (
            <div className="loader" style={disp}>
                <div className="spinner-border text-light" style={spinStyle} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

interface ListGroupItemProps {
    name: string;
    selected: boolean;
    action: () => void;
}

class ListGroupItem extends React.Component<ListGroupItemProps, any> {
    render(): React.ReactElement {
        return (
            <button type="button"
                    onClick={this.props.action}
                    className={'list-group-item list-group-item-action' + (this.props.selected ? ' active' : '')}>{this.props.name}</button>
        );
    }
}

interface ListRegionsProps {
    items: Region[];
    toggler: (code: number) => void;
}

class ListRegions extends React.Component<ListRegionsProps, any> {
    render(): React.ReactElement {
        return (
            <div className="list-group">
                {this.props.items.map(value => <ListGroupItem
                    key={value.key}
                    name={value.name}
                    selected={value.selected}
                    action={() => this.props.toggler(value.key)}/>)}
            </div>
        );
    }
}


export default App;
