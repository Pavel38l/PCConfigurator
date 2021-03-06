import { YMaps } from "react-yandex-maps";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "../App.css";
import {
  Typography,
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Space,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import SearchComplete from "./SearchComplete";
import CustomSlider from "./CustomSlider";
import JourneyMap from "./JourneyMap";
import JourneyService from "../services/JourneyService";
import { useHistory } from "react-router-dom";
import useCurrentUser from "./utils/useCurrentUser";
import useCurrentUserProfileUrl from "./utils/useCurrentUserProfileUrl";
const { Title } = Typography;

function JourneyEdit() {
  const [ymaps, setYmaps] = useState(null);
  const [points, setPoints] = useState([]);
  const history = useHistory();
  const currentUserId = useCurrentUser();
  const currentUserProfileUrl = useCurrentUserProfileUrl();

  const onMapClick = (event) => {
    let position = event.get("coords");
    ymaps.geocode(position).then((result) => {
      let newPoint = result.geoObjects.get(0).properties.getAll();
      newPoint.coordinates = position;
      newPoint.pointName =
        newPoint.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName;
      addOutside(newPoint);
      onPointsListChange();
    });
  };

  const onMapLoad = (ymaps) => {
    setYmaps(ymaps);
  };

  const onAddressSelect = (index, value) => {
    ymaps.geocode(value).then((result) => {
      let newPoint = result.geoObjects.get(0).properties.getAll();
      newPoint.coordinates = result.geoObjects.get(0).geometry.getCoordinates();
      newPoint.pointName =
        newPoint.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName;
      const pointsList = pointsForm.getFieldsValue("points").points || [];
      const point = pointsList[index];
      point.geoData = newPoint;
      pointsForm.setFieldsValue({ points: pointsList });
      onPointsListChange();
    });
  };

  const onJourneyFinish = async (values) => {
    const dto = {
      maxOrderCount: values.maxOrderCount,
      travelPoints: values.points.map((point, index) => {
        return {
          comment: point.comment,
          x: point.geoData.coordinates[0],
          y: point.geoData.coordinates[1],
          address: point.geoData.text,
          pointName: point.geoData.pointName,
          dispatchDate: point.dispatchDate.format(),
          arrivalDate: point.arrivalDate.format(),
          pointIndex: index,
        };
      }),
      journeyCosts: [
        { orderSize: { id: 3 }, cost: values.smallCost },
        { orderSize: { id: 2 }, cost: values.avgCost },
        { orderSize: { id: 3 }, cost: values.largeCost },
      ],
      owner: { id: currentUserId },
    };
    if (values.points.length > 1) {
      await JourneyService.createJourney(dto);
      message.success("Journey created!");
      const searchParams = new URLSearchParams({
        activeTab: 2,
      });
      history.push({
        pathname: currentUserProfileUrl,
        search: searchParams.toString(),
      });
      //console.log(dto);
    } else {
      alert("You must create more then 1 travel point!");
    }
  };

  const [pointsForm] = Form.useForm();

  const onArrivalDateChange = (index, value) => {
    const pointsList = pointsForm.getFieldsValue("points").points || [];
    const point = pointsList[index];
    point.dispatchDate = value;
    pointsForm.setFieldsValue({ points: pointsList });
  };

  const onPointsListChange = () => {
    setPoints(pointsForm.getFieldsValue("points").points || []);
  };

  const addOutside = (newPoint) => {
    const pointsList = pointsForm.getFieldsValue("points").points || [];
    const geo = { address: newPoint.text, geoData: newPoint };
    if (pointsList.length > 0) {
      let point = pointsList[pointsList.length - 1]
        ? pointsList[pointsList.length - 1]
        : {};
      if (!point.geoData) {
        point = { ...point, ...geo };
        pointsList[pointsList.length - 1] = point;
      } else {
        pointsList.push(geo);
      }
    } else {
      pointsList.push(geo);
    }
    pointsForm.setFieldsValue({ points: pointsList });
  };

  const onReset = () => {
    pointsForm.resetFields();
    onPointsListChange();
  };

  return (
    <div>
      <YMaps
        query={{
          lang: "en_US",
          load: "package.full",
          apikey: "c23fb47e-a86c-40a3-95a6-866811b17aff",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Create trip
        </Title>
        <Form
          onFinish={onJourneyFinish}
          form={pointsForm}
          colon={false}
          layout="vertical"
          name="dynamic_form_nest_item"
          autoComplete="off"
          initialValues={{
            smallCost: 0,
            avgCost: 0,
            largeCost: 0,
          }}
        >
          <Row justify="space-between">
            <Col>
              <Title level={3}>Trip points:</Title>
              <Form.List name="points" initialValue={[{}]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <>
                        <Space
                          key={field.key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Title level={3} key={field.key}>
                            {field.name + 1}
                          </Title>
                          <Form.Item
                            {...field}
                            label="Point address"
                            name={[field.name, "address"]}
                            key={[field.fieldKey, "address"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input point address!",
                              },
                            ]}
                            style={{ width: 300, display: "inline-block" }}
                          >
                            <SearchComplete
                              onSelect={(value) => {
                                onAddressSelect(field.name, value);
                              }}
                              ymaps={ymaps}
                            />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            label="Arrival date"
                            name={[field.name, "arrivalDate"]}
                            key={[field.fieldKey, "arrivalDate"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input arrival date!",
                              },
                            ]}
                            tooltip="Time of arrival at this point"
                          >
                            <DatePicker
                              showTime
                              name={[field.name, "arrivalDate"]}
                              onChange={(value) => {
                                onArrivalDateChange(field.name, value);
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "dispatchDate"]}
                            key={[field.fieldKey, "dispatchDate"]}
                            label="Dispatch date"
                            rules={[
                              {
                                required: true,
                                message: "Please input dispatch date!",
                              },
                            ]}
                            tooltip="Departure time from this point"
                          >
                            <DatePicker showTime />
                          </Form.Item>

                          <MinusCircleOutlined
                            key={field.key}
                            onClick={() => {
                              remove(field.name);
                              onPointsListChange();
                            }}
                          />
                        </Space>
                        <Form.Item
                          key={[field.key, "comment"]}
                          name={[field.name, "comment"]}
                          label="Comment"
                          tooltip="Comment on this point (tips how to find and so on)"
                        >
                          <Input.TextArea rows={1} />
                        </Form.Item>
                      </>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          onPointsListChange();
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add point
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
            <Col>
              <JourneyMap
                onMapLoad={onMapLoad}
                onMapClick={onMapClick}
                pointsList={pointsForm.getFieldsValue("points").points || []}
              />
            </Col>
          </Row>
          <Title level={2} style={{ textAlign: "center" }} className="mt-5">
            {" "}
            Trip order info
          </Title>
          <Form.Item
            name="maxOrderCount"
            label="The number of orders"
            tooltip="Indicate the maximum number of orders that you can take on a trip"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="smallCost"
            label="Small order cost"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
              },
            ]}
          >
            <CustomSlider max={20} />
          </Form.Item>
          <Form.Item
            name="avgCost"
            label="Average order cost"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
              },
            ]}
          >
            <CustomSlider value={0} max={50} />
          </Form.Item>
          <Form.Item
            name="largeCost"
            label="Large order cost"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
              },
            ]}
          >
            <CustomSlider value={0} max={100} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Create journey
              </Button>
              <Button onClick={onReset}>Reset</Button>
              <Button
                onClick={() => {
                  const searchParams = new URLSearchParams({
                    activeTab: 2,
                  });
                  history.push({
                    pathname: currentUserProfileUrl,
                    search: searchParams.toString(),
                  });
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </YMaps>
    </div>
  );
}

export default JourneyEdit;
