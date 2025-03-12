import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from "../../services/swapi-service";

import './app.css';

export default class App extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: null
    };

    onPersonSelected = (id) => {
        this.setState({ selectedPerson: id });
    };

    render() {
        return (
            <div>
                <Header />
                <RandomPlanet />

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={ this.swapiService.getAllStarships }
                            renderItem={ (item) => item.name }/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson} />
                    </div>
                </div>
            </div>
        );
    }
}
