import React, { Component } from 'react';
import Square from '../../components/Square';
import axios from 'axios';
import createPage from '../../components/createPage';
import { BOOKING_PAGE } from '../../components/Sidebar/constants';
import { Row, Col, Radio } from 'antd';

const URL = process.env.SERV_HOST || 'http://localhost:8000';
class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      listRoom: [],
    };
  }

  updateRoom = () => {
    axios.get(`${URL}/room`).then((res) => {
      if (res) {
        this.setState({
          listRoom: res.data,
        });
      }
    });
  };

  componentDidMount = () => {
    this.updateRoom();
  };

  renderListRoom = (list, filter) => {
    if (filter !== null) list = list.filter((room) => room.status === filter);
    const rows = list.map((room) => (
      <Col key={room.id} style={{ padding: '15px' }} span={4}>
        <Square
          {...room}
          key={room.id}
          name={room.name.replace('Phòng ', '')}
        />
      </Col>
    ));
    return <Row align='middle'>{rows}</Row>;
  };

  handleOnChangeRadio = (e) => {
    const { value } = e.target;
    this.setState({
      filter: value,
    });
  };

  render() {
    const { listRoom, filter } = this.state;
    return (
      <>
        <Radio.Group
          onChange={this.handleOnChangeRadio}
          defaultValue={null}
          buttonStyle='solid'
          style={{ marginBottom: '15px' }}
        >
          <Radio.Button value={null}>All</Radio.Button>
          <Radio.Button value={0}>Available</Radio.Button>
          <Radio.Button value={1}>Rent</Radio.Button>
          <Radio.Button value={2}>Reserved</Radio.Button>
          <Radio.Button value={3}>Cleaning</Radio.Button>
        </Radio.Group>
        {this.renderListRoom(listRoom, filter)}
      </>
    );
  }
}

const RoomPage = createPage(RoomList, BOOKING_PAGE);
export default RoomPage;
