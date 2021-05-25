import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';

const { Option } = Select;
const _ = require('lodash');


const SearchComplete = ({ onSelect, onChange, ymaps, value }) => {
    const [results, setResults] = useState([]);
    const searchWithDebounce = _.debounce(async (ymaps, changedValue, setResults) => {
        if (!changedValue) {
            setResults([]);
            return;
        }
        const ans = await ymaps.search(changedValue);
        //console.log(ans.geoObjects.toArray()[0].properties.getAll());
        const localRes = ans.geoObjects.toArray().map((addr) => {
            const point = addr.properties.getAll();
            point.coordinates = ans.geoObjects.get(0).geometry.getCoordinates();
            return point;
        });
        setResults(localRes);
    }, 200);

    return (
        <Select
            showSearch
            onSelect={onSelect}
            onSearch={value => searchWithDebounce(ymaps, value, setResults)}
            onChange={onChange}
            placeholder="Input address"
            filterOption={false}
            value={value}
        >
            {results.map((address, i) => (
                <Option key={`${i}-option`} value={address.address}>
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

export default SearchComplete;
