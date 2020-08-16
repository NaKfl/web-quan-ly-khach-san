import React, { Component } from 'react';
import { connect } from 'react-redux';
import createPage from '../../components/createPage';
import { SERVICE_PAGE } from '../../components/Sidebar/constants';
import { Button, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import TableType from './TableType';
import ModalAddService from './ModalAddService';
import TableService from './TableService';
import { addServiceAPI, getListAPI, deleteServiceAPI } from './actions';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // defaultPageSize: 10,
      // currentPage: 1,
      visible: false,
    };
  }

  componentDidMount() {
    this.props.getList();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleAddClicked = (values) => {
    this.props.addService(values);
    this.setState({ visible: false });
  };

  handleDeleteClicked = (service) => {
    this.props.deleteService(service);
  };

  handleCancelClicked = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div>
        <div className='header-table'>
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={this.showModal}
          >
            Add New Service
          </Button>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={this.state.defaultPageSize}
            // total={this.props.total}
            pageSizeOptions={[5, 10]}
            onChange={(pageNumber, pageSize) => {
              this.setState({
                defaultPageSize: pageSize,
                currentPage: pageNumber,
              });
            }}
          />
        </div>
        <div>
          <ModalAddService
            {...this.state}
            handleAddClicked={this.handleAddClicked}
            handleCancelClicked={this.handleCancelClicked}
          />
        </div>
        <div>
          {/* <TableType
            pageSize={this.state.defaultPageSize}
            currentPage={this.state.currentPage}
          /> */}
          <TableService handleDeleteClicked={this.handleDeleteClicked} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    addService: (service) => {
      dispatch(addServiceAPI(service));
    },
    deleteService: (id) => {
      dispatch(deleteServiceAPI(id));
    },
    getList: () => {
      dispatch(getListAPI());
    },
  };
};

const ServiceConnect = connect(mapStateToProps, mapDispatchToProps)(Service);
const ServicePage = createPage(ServiceConnect, SERVICE_PAGE);
export default ServicePage;
