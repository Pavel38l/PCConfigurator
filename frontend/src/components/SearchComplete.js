import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { AutoComplete } from 'antd';
const { Option } = AutoComplete;

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
            const searchControl = new this.props.ymaps.control.SearchControl({
                options: {
                    provider: 'yandex#map'
                }
            });
            const promise = searchControl.search(value);
            promise.then( (ans) => {
                let localRes = ans.geoObjects.toArray().map((addr) => addr.getAddressLine());
                localRes = Array.from(new Set(localRes));
                //console.log(localRes);
                this.setState({result: localRes})
            })
        };
        const handleWithDelay = (value) => {
            _.delay(handleSearch, 100, value);
        }
        const results = this.state.result;
        return (
            <AutoComplete

                onSearch={handleWithDelay}
                onChange={this.props.onChange}
                placeholder="Input address"
            >
                {results.map((address) => (
                    <Option key={address} value={address}>
                        {address}
                    </Option>
                ))}
            </AutoComplete>
        );
    }

}

export default SearchComplete;