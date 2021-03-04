import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import { Table, Column, defaultTableRowRenderer } from "react-virtualized";
import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps";



const SortableTable = SortableContainer(Table, { withRef: true });
const SortableTableRowRenderer = SortableElement(defaultTableRowRenderer);
const defmapState = {
  center: [55.751574, 37.573856],
  zoom: 5
};


class EditTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapState: defmapState,
            data: [],
            minvalue: [0,0,0],
            maxvalue:[100,100,100],
            value : 20,
            ymaps: null,
            selectedPoint: null,
            width: 750, 
            height: 300,
            //points: POINTS,
            coords: []
        }
    }

    renderSlider(i){
        return(
        <RangeSlider
                value={this.state.value}
                min={this.state.minvalue[i]}
                max={this.state.maxvalue[i]}
                onChange={changeEvent => this.setState({value:changeEvent.target.value}) } />);
    }

    

    _cellRenderer = {
      ID: ({ rowData }) => rowData.ID,
      Address: ({ rowData }) =>rowData.Address,
    };
    _handleSort = ({ oldIndex, newIndex }) => {
      this.setState(prevState => ({
        data: arrayMove(prevState.data, oldIndex, newIndex)
      }));
    };
    _rowGetter = ({ index }) => {
      return this.state.data[index];
    };
    _rowRenderer = props => {
      return <SortableTableRowRenderer {...props} />;
    };
    onMapClick(event) {
      const target = "https://geocode-maps.yandex.ru/1.x/?apikey=!!!!!!!!!!!!!!!!!aff&format=json&geocode="
        let result = event.get("coords");
        let adress = "";
        fetch(target+result[1]+", "+result[0])
          .then(res => res.json())
          .then(datas => {
            try{
              adress = datas.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
              this.setState(state => {
                //alert(event.get("coords"))
                return {
                  coords: [...state.coords, event.get("coords")], //TODO Delete
                  data: [...state.data, {
                    'ID': state.coords.length+1,
                    'Address': adress,
                    'Coords': event.get("coords")
                  }]
                };
              });
              console.log(this.state.data);
            } catch(e) {console.log("Ошибка при обращении к Геокодеру");}
    })  
      console.log(this.state.coords);
    }
  

    renderList(){
      return (
        <SortableTable
          width={400}
          height={300}
          getContainer={wrappedInstance =>
            ReactDOM.findDOMNode(wrappedInstance.Grid)
          }
          rowRenderer={this._rowRenderer}
          rowGetter={this._rowGetter}
          rowHeight={50}
          rowCount={this.state.data.length}
          data={this.state.data}
          onSortEnd={this._handleSort}
        >
          <Column
            width={200}
            dataKey="ID"
            flexGrow={1}
            cellRenderer={this._cellRenderer.ID}
          />
          <Column
            width={100}
            dataKey="Address"
            cellRenderer={this._cellRenderer.Address}
          />

        </SortableTable>
      );
    }

    renderMap(){
      return(<YMaps query={{ lang: "ru_RU", load: "package.full" }}>
          <Map
            state={this.state.mapState}
            width={this.state.width} height={this.state.height}
            onLoad={ymaps => this.setState({ ymaps })}
            onClick={this.onMapClick.bind(this)}
          >
          {this.state.data.map(el => (
            <Placemark
              key={el.Coords.join(",")}
              geometry={{ coordinates: el.Coords }}
              properties={{iconCaption: el.ID }}
            />
          ))}
            

            
          </Map>
        </YMaps>);
    }



    
    
    
    
    render(){
        return (
            <div className="container-fluid">
                {this.renderMap()}
                {this.renderList()}
                {this.renderSlider(0)}
                <button onClick={clicked=> console.log(this.state.data)}>test</button>
            </div>
        );
    }

}

export default EditTrip