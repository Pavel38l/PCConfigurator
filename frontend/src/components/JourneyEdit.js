import { YMaps, Map } from 'react-yandex-maps';
import React, { useState, useEffect } from "react";
import {Container} from "react-bootstrap";

function JourneyEdit() {
    const [ymaps, setYmaps] = useState(null);
    const mapData = {
        center: [55.751574, 37.573856],
        zoom: 5,
    };
    const width = 600;
    const  height= 400;
    return (
        <Container className="mt-5">
            <YMaps
                query={{ lang: "ru_RU", load: "package.full", apikey: "!!!!!!!!!!!!!!!" }}
                onApiAvaliable={ymaps => {
                    setYmaps(ymaps);
                }}
            >
                <div>
                    My awesome application with maps!
                    <Map
                        defaultState={{
                            center: [55.751574, 37.573856],
                            zoom: 3,
                        }}
                        width={width}
                        height={height}
                    />
                </div>
            </YMaps>
        </Container>
    )
}

export default JourneyEdit