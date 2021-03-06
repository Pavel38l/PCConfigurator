import React from "react";
import JourneyService from "../services/JourneyService";
import Container from "react-bootstrap/Container";
import "antd/dist/antd.css";
import SearchComplete from "./SearchComplete";
import { Map, YMaps } from "react-yandex-maps";
import { Form, Button, DatePicker, InputNumber } from "antd";
import JourneyCard from "./journey/JourneyCard";
import isAuth from "./utils/isAuth";

// TODO сделать имя обязательным
// TODO валидациия полей дат при создании поездки

class Home extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      journeys: [],
      ymaps: null,
    };
  }

  componentDidMount() {
    JourneyService.getJourneys().then((response) => {
      this.setState({
        journeys: response.data,
      });
    });
  }

  submitHandler = (data) => {
    const fromPromise = this.state.ymaps.geocode(data.from).then((result) => {
      return result.geoObjects.get(0).geometry.getCoordinates();
    });
    const toPromise = this.state.ymaps.geocode(data.to).then((result) => {
      return result.geoObjects.get(0).geometry.getCoordinates();
    });
    Promise.all([fromPromise, toPromise])
      .then((points) => {
        const filterDto = {
          startTravelPoint: {
            x: points[0][0],
            y: points[0][1],
          },
          endTravelPoint: {
            x: points[1][0],
            y: points[1][1],
          },
          dispatchDate: data.dispatchDate.format(),
          arrivalDate: data.arrivalDate.format(),
          maxOrderCount: data.maxOrderCount,
          rating: data.rating,
        };
        JourneyService.filterJourneys(filterDto).then((res) => {
          this.setState({
            journeys: res.data,
          });
        });
      })
      .catch((err) =>
        alert(
          "Can't find the specified destinations! Please check the entered data!"
        )
      );
  };

  cancelHandler = (event) => {
    event.preventDefault();
    JourneyService.getJourneys().then((res) => {
      this.setState({
        journeys: res.data,
      });
    });
    this.formRef.current.resetFields();
  };

  render() {
    const defmapState = {
      center: [55.751574, 37.573856],
      zoom: 5,
    };
    const journeys = this.state.journeys;
    const journeyCards = journeys.map((journey) => {
      return (
        <JourneyCard key={journey.id} journey={journey} createButton={isAuth()} />
      );
    });

    const onFinishFailed = (errorInfo) => {
    };

    const tailLayout = {
      wrapperCol: {
        offset: 4,
        span: 14,
      },
    };
    return (
      <YMaps
        query={{
          lang: "en_US",
          load: "package.full",
          apikey: "c23fb47e-a86c-40a3-95a6-866811b17aff",
        }}
      >
        <Map
          defaultState={defmapState}
          onLoad={(ymaps) => this.setState({ ymaps: ymaps })}
          style={{ appearance: "none" }}
        />
        <div>
          <div className="container-image">
          <Container className="main-form">
            <h1 className="Align">
              Service for finding and sending passing links
            </h1>
            
              <Form
                colon={false}
                ref={this.formRef}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                name="basic"
                onFinish={this.submitHandler}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="From">
                  <Form.Item
                    label="Dispatch point"
                    name="from"
                    rules={[
                      {
                        required: true,
                        message: "Please input dispatch point address!",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(70% - 8px)",
                    }}
                  >
                    <SearchComplete ymaps={this.state.ymaps} />
                  </Form.Item>
                  <Form.Item
                    name="dispatchDate"
                    label="Dispatch date"
                    rules={[
                      {
                        required: true,
                        message: "Please input dispatch date!",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(30% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <DatePicker showTime />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="To">
                  <Form.Item
                    label="Arrival point"
                    name="to"
                    rules={[
                      {
                        required: true,
                        message: "Please input arrival point address!",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(70% - 8px)",
                    }}
                  >
                    <SearchComplete ymaps={this.state.ymaps} />
                  </Form.Item>
                  <Form.Item
                    label="Arrival date"
                    name="arrivalDate"
                    rules={[
                      { required: true, message: "Please input arrival date!" },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(30% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <DatePicker showTime />
                  </Form.Item>
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Form.Item
                    name="rating"
                    label="Min owner rating"
                    tooltip="Each author of the trip has a rating, the higher it is, the more trust in him
                                  "
                    rules={[
                      {
                        required: false,
                        type: "number",
                        min: 0,
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(30% - 8px)",
                    }}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    name="maxOrderCount"
                    label="Number of orders"
                    tooltip="Specify the number of orders to be shipped so as not to display trips that will not accommodate so many orders"
                    rules={[
                      {
                        required: false,
                        type: "number",
                        min: 1,
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(30% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <InputNumber />
                  </Form.Item>
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" className="mr-2">
                    Filter
                  </Button>
                  <Button htmlType="button" onClick={this.cancelHandler}>
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </Container>
          </div>
          <Container className="mt-5">{journeyCards}</Container>
        </div>
      </YMaps>
    );
  }
}

export default Home;
