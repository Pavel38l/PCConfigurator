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
            selectedPoint: 0,
            width: 600, 
            height: 300,
            //points: POINTS,
            coords: [],
            dateState: ''
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
                  coords: [...state.coords, event.get("coords")], 
                  data: [...state.data, {
                    'ID': state.coords.length+1,
                    'Address': adress,
                    'Coords': event.get("coords"),
                    'Date': "2000-03-12T12:00",
                    'Comment': state.coords.length+1
                  }]
                };
              });
              console.log(this.state.data);
            } catch(e) {console.log("Geocoder error");}
    })  
      console.log(this.state.coords);
    }

    clearList= () => {this.setState({data:[], coords:[]})}
    testList= () => {console.log(this.state.data[this.state.selectedPoint])}

    handleDateChange = event => {
      let newValues = this.state.data;
      let id = this.state.selectedPoint;
      newValues[id].Date = event.target.value;
      this.setState({data:newValues})
      //this.setState({ [event.target.name]: event.target.value });
  }
  

    renderList(){
      if(this.state.data.length>0){
        let mark = this.state.selectedPoint;
        let date = this.state.data[mark].date;
        let comment = this.state.data[mark].comment;
      return (
        <div>
        <button onClick={this.clearList}>Clear all</button>
        <button onClick={this.testList}>test all</button>
        <h5>Point: {this.state.selectedPoint+1}</h5>
        <Form.Control
          required
          type="datetime-local"
          name="datePick"
          value={date}
          onChange={this.handleDateChange}
        />
        <Form.Control
          required
          name="comment"
          value={comment}
        />

        
       
        </div>
      );}
    }

    renderMap(){
      return(<YMaps query={{ lang: "en-US", load: "package.full" }}> 
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
              properties={
                {iconCaption: el.ID }
              }
              onClick={this.onPlacemarkClick(el)}
            />
          ))}
            

            
          </Map>
        </YMaps>);
    }



  onPlacemarkClick = point => () => {
    this.setState({ selectedPoint: point.ID-1 });
    //console.log(point);
  };

  
    
    
    render(){
        return ( 
        <div>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                {this.renderMap()}
              </div>
              <div class="col-sm">
                { this.renderList()}
              </div>
            </div>
          </div>
          {this.renderSlider()}
          
                            
        </div>
        );
    }

} 

export default EditTrip