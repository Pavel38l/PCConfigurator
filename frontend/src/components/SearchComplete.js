import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { AutoComplete } from 'antd';
import YandexService from "../services/YandexService";
const { Option } = AutoComplete;

const SearchComplete = () => {
    const [result, setResult] = useState([]);

    const handleSearch = (value) => {
        let res = [];
        YandexService.getSearch('Дворцовая площадь, 3')
        if (!value || value.indexOf('@') >= 0) {
            res = [];
        } else {
            res = ['gmail.com', '163.com', 'qq.com'].map((domain) => `${value}@${domain}`);
        }

        setResult(res);
    };

    return (
        <AutoComplete
            style={{
                width: 200,
            }}
            onSearch={handleSearch}
            placeholder="input here"
        >
            {result.map((email) => (
                <Option key={email} value={email}>
                    {email}
                </Option>
            ))}
        </AutoComplete>
    );
};

export default SearchComplete;