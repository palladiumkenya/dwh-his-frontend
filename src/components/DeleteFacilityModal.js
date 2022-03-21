import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import { FaEye, FaTrashAlt, FaEdit } from 'react-icons/fa';
//import swal from '@sweetalert/with-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import axios from "axios";

import { API_URL } from "../constants";

class DeleteFacilityModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  delete_popup = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deleteFacility = pk => {
    axios.delete(API_URL + pk).then(() => {
      this.props.resetState();
      this.toggle();
    });
  };

  render() {
    const MySwal = withReactContent(Swal);
    //const edit_url = "/facilities/update_facility/"+{facility.id}

    return (
      <Fragment>
         <Link to={"/facilities/view_facility/" + this.props.facility.id}>
          <FaEye style={{color:"blue", marginRight:"20px"}}/>
        </Link>

          <Link to={"/facilities/update_facility/" + this.props.facility.id}>
              <FaEdit style={{color:"#1ab394", marginRight:"20px"}} />
          </Link>
          
          {/* <FaTrashAlt style={{color:"#dc3545"}} onClick={() => this.delete_popup()}/> */}

        {/* <Button color="danger" onClick={() => this.toggle()}>
          Remove
        </Button> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Do you really wanna delete the facility?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deleteFacility(this.props.pk)}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>

        

        {/* {MySwal.fire({
            title: <p>Hello World</p>,
            footer: 'Copyright 2018',
            didOpen: () => {
                // `MySwal` is a subclass of `Swal`
                //   with all the same instance & static methods
                MySwal.clickConfirm()
            }
            }).then(() => {
            return MySwal.fire(<p>Shorthand works too</p>)
            })} */}
                    
      </Fragment>
    );
  }
}

export default DeleteFacilityModal;