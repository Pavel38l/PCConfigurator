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
import { Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";



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
            minvalue: [0,10,20],
            maxvalue:[10,50,100],
            value : [3,11,30],
            count: [0,0,0],
            ymaps: null,
            selectedPoint: null,
            width: 600, 
            height: 300,
            //points: POINTS,
            coords: []
        }
    }

    renderSlider(){
        return(
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <Form.Group md="2">
                  <Form.Label>Small count</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      min="1"
                      name="smallCount"
                      value={this.state.count[0]}
                      onChange={changeEvent => {
                        let newValues = this.state.count;
                        newValues[0] = changeEvent.target.value;
                        this.setState({count:newValues})
                    }}
                    />
                    <Form.Label>Small cost</Form.Label>
                    <RangeSlider
                      value={this.state.value[0]}
                      min={this.state.minvalue[0]}
                      max={this.state.maxvalue[0]}
                      onChange={changeEvent => {
                        let newValues = this.state.value;
                        newValues[0] = changeEvent.target.value;
                        this.setState({value:newValues})
                        }} />
                </Form.Group>
                </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <Form.Group md="2">
                  <Form.Label>Avg count</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      min="1"
                      name="avgCount"
                      value={this.state.count[1]}
                      onChange={changeEvent => {
                        let newValues = this.state.count;
                        newValues[1] = changeEvent.target.value;
                        this.setState({count:newValues})
                    }}
                    />
                    <Form.Label>Avg cost</Form.Label>
                    <RangeSlider
                      value={this.state.value[1]}
                      min={this.state.minvalue[1]}
                      max={this.state.maxvalue[1]}
                      onChange={changeEvent => {
                        let newValues = this.state.value;
                        newValues[1] = changeEvent.target.value;
                        this.setState({value:newValues})
                        }} />
                </Form.Group>
                </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <Form.Group md="2">
                  <Form.Label>Big count</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      min="1"
                      name="bigCount"
                      value={this.state.count[2]}
                      onChange={changeEvent => {
                        let newValues = this.state.count;
                        newValues[2] = changeEvent.target.value;
                        this.setState({count:newValues})
                    }}
                    />
                    <Form.Label>Big cost</Form.Label>
                    <RangeSlider
                      value={this.state.value[2]}
                      min={this.state.minvalue[2]}
                      max={this.state.maxvalue[2]}
                      onChange={changeEvent => {
                        let newValues = this.state.value;
                        newValues[2] = changeEvent.target.value;
                        this.setState({value:newValues})
                        }} />
                </Form.Group>
                </div>
            </div>
            
          </div>
            
            
          );
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
      return <div><div><SortableTableRowRenderer {...props} /></div></div>;
      
      
    };
    onMapClick(event) {
      const target = "https://geocode-maps.yandex.ru/1.x/?apikey=c23fb47e-a86c-40a3-95a6-866811b17aff&format=json&geocode="
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

    clearList= () => {this.setState({data:[], coords:[]})}
  

    renderList(){
      return (
        <div>
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
            width={50}
            dataKey="ID"
            flexGrow={1}
            cellRenderer={this._cellRenderer.ID}
            
          />
          <Column
            width={250}
            dataKey="Address"
            cellRenderer={this._cellRenderer.Address}
            
          />

        </SortableTable>
        <button onClick={this.clearList}>Очистить</button>
        </div>
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



    
    //TODO comment field
    
    
    render(){
        return ( 
        <div>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                {this.renderMap()}
              </div>
              <div class="col-sm">
                {this.renderList()}
              </div>
            </div>
          </div>
          {this.renderSlider()}
        </div>
        );
    }

} 

export default EditTrip