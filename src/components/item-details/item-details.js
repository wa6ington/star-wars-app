import React, { Component } from 'react';
import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{ label }:</span>
            <span>{ item[field] }</span>
        </li>
    );
};

export { Record };

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
        loading: true
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.setState({ loading: true }, this.updateItem);
        }
    }

    updateItem = () => {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            this.setState({ item: null, image: null, loading: false });
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item),
                    loading: false
                });
            })
            .catch(() => this.setState({ loading: false }));
    };

    render() {
        const { item, image, loading } = this.state;

        if (!item) return <span>Select an item from a list</span>;

        return (
            <div className="item-details card">
                {loading && <Spinner />}
                {!loading && <ItemDetailsView item={item} image={image}>{this.props.children}</ItemDetailsView>}
            </div>
        );
    }
}

const ItemDetailsView = ({ item, image, children }) => {
    const { name } = item;

    return (
        <React.Fragment>
            <img className="item-image" alt={name} src={image} />

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, { item });
                    })}
                </ul>
            </div>
        </React.Fragment>
    );
};
