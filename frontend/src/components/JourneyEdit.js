import {YMaps, Map, SearchControl, Placemark} from 'react-yandex-maps';
import React, { useState, useEffect } from "react";
import {Container} from "react-bootstrap";

function JourneyEdit() {
    const [ymaps, setYmaps] = useState(null);
    const [points, setPoints] = useState([]);
    const defmapState = {
        center: [55.751574, 37.573856],
        zoom: 5
    };
    const width = 600;
    const  height= 400;
    const placeMark = {
        geometry: [56.848217, 53.236675],
        properties: {
            hintContent: 'Это хинт',
            balloonContent: 'Это балун'
        }
    }

    function onMapClick(event) {
        let position = event.get('coords');
        let newPoints = points.slice();
        newPoints.push(position);
        setPoints(newPoints);
        console.log(points);
    }

    return (
        <Container className="mt-5">
            <YMaps
                query={{ lang: "ru_RU", load: "package.full", apikey: "c23fb47e-a86c-40a3-95a6-866811b17aff" }}
                onApiAvaliable={ymaps => {
                    setYmaps(ymaps);
                }}
            >
                <div>
                    My awesome application with maps!
                    <Map
                        state={defmapState}
                        width={width}
                        height={height}
                        onClick={onMapClick.bind(this)}
                    >
                        <SearchControl
                            options={{ provider: 'yandex#search' }}
                        />
                        <Placemark {...placeMark} />
                        {points.map(coordinate =>
                            <Placemark
                                key={coordinate[0]}
                                geometry={coordinate}
                            />
                        )}
                    </Map>
                </div>
            </YMaps>
        </Container>
    )
}

export default JourneyEdit