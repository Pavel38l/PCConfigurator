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
                    provider: 'yandex#search'
                }
            });
            const promise = searchControl.search(value);
            promise.then( (ans) => {
                //console.log(ans.geoObjects.toArray()[0].properties.getAll());
                let localRes = ans.geoObjects.toArray().map((addr) => addr.properties.getAll());
                localRes = Array.from(new Set(localRes));
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
            <AutoComplete

                onSearch={handleWithDelay}
                onChange={this.props.onChange}
                placeholder="Input address"
            >
                {results.map((address) => (
                    <Option key={i++} value={address.address}>
                        <span style={{
                            fontSize: "95%"
                        }}>{address.address}</span>
                        <br/>
                        <span style={{
                            color: "grey",
                        }}>{address.name}</span>
                    </Option>
                ))}
            </AutoComplete>
        );
    }

}

export default SearchComplete;