import React, {useState} from "react";
import {Map, Placemark, Polyline, SearchControl} from "react-yandex-maps";

function JourneyMap(props) {
    const [points, setPoints] = useState([]);
    const width = 600;
    const height = 500;
    const defmapState = {
        center: [55.751574, 37.573856],
        zoom: 5
    };

    const renderPoints = () => {
        const ps = (props.pointsList).map((point, index) => {
            return {geoData: point ? point.geoData : undefined, index: index};
        }).filter(point => point.geoData);
        return (
            <>
                {ps.map(el =>
                    <Placemark
                        key={el.index + 1}
                        geometry={el.geoData.coordinates}
                        properties={{
                            hintContent: el.geoData.text,
                            balloonContent: el.geoData.balloonContent,
                            iconContent: el.index + 1
                        }}
                        options={{
                            draggable: false
                        }}
                    />
                )}
                <Polyline
                    key={1}
                    geometry={
                        ps.map(el =>
                            el.geoData.coordinates
                        )
                    }
                    options={{
                        balloonCloseButton: false,
                        strokeColor: '#1E90FF',
                        strokeWidth: 4,
                        strokeOpacity: 0.5,
                    }}
                />
            </>
        )
    }

    return (
        <Map
            defaultState={defmapState}
            width={width}
            height={height}
            onClick={props.onMapClick.bind(this)}
            onLoad={props.onMapLoad}
        >
            <SearchControl
                options={{ provider: 'yandex#search' }}
            />
            {renderPoints()}
        </Map>
    );
}

export default JourneyMap;