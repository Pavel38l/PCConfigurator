import { YMaps } from "react-yandex-maps";
import React from "react";
import JourneyService from "./JourneyService";
import { SearchControl } from "react-yandex-maps";

class YandexService {

    getSearch(ymaps, token) {
        const searchControl = new ymaps.control.SearchControl({
            options: {
                provider: 'yandex#map'
            }
        });

        const promise = searchControl.search(token);
        promise.then(function (res) {
            const address = res.geoObjects.toArray().map((addr) => addr.getAddressLine());
            console.log(address);
        })
    }
}
export default new YandexService();