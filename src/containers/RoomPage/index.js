import React, { Component } from 'react';
import Square from '../../components/Square';
import axios from 'axios';
import createPage from '../../components/createPage';
import { BOOKING_PAGE } from '../../components/Sidebar/constants';
import { Row, Col } from 'antd';

const URL = process.env.SERV_HOST || 'http://localhost:8000';
class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  renderListRoom = (list) => {
    const rows = list.map((room) => (
      <Col style={{ padding: '15px' }} span={4}>
        <Square
          {...room}
          key={room.id}
          name={room.name.replace('Phòng ', '')}
        />
      </Col>
    ));
    return <Row align='middle'>{rows}</Row>;
  };

  componentDidMount = () => {
    this.updateRoom();
  };

  render() {
    const { listRoom } = this.state;
    return <div>{this.renderListRoom(listRoom)}</div>;
  }
}

const RoomPage = createPage(RoomList, BOOKING_PAGE);
export default RoomPage;
