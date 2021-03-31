import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { AutoComplete, Select } from 'antd';
const { Option } = Select;

const _ = require('lodash');

class SearchComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: []
        }
    }

    render () {

        const handleSearch = (value) => {
            if (!value) {
                this.setState({result: []});
                return;
            }
            const promise = this.props.ymaps.search(value);
            promise.then( (ans) => {
                //console.log(ans.geoObjects.toArray()[0].properties.getAll());
                let localRes = ans.geoObjects.toArray().map((addr) => {
                    const point = addr.properties.getAll();
                    point.coordinates = ans.geoObjects.get(0).geometry.getCoordinates();
                    return point;
                });
                //console.log(localRes);
                this.setState({result: localRes})
            })
        };
        const handleWithDelay = (value) => {
            _.delay(handleSearch, 100, value);
        }
        const results = this.state.result;
        let i = 0;
        return (
            <Select
                showSearch
                onSelect={this.props.onSelect}
                onSearch={handleWithDelay}
                onChange={this.props.onChange}
                placeholder="Input address"
                value={this.props.value}
            >
                {results.map((address) => (
                    <Option
                        key={i++}
                        value={address.address}
                    >
                        <span style={{
                            fontSize: "95%"
                        }}>{address.address}</span>
                        <br/>
                        <span style={{
                            color: "grey",
                        }}>{address.name}</span>
                    </Option>
                ))}
            </Select>
        );
    }

}

export default SearchComplete;