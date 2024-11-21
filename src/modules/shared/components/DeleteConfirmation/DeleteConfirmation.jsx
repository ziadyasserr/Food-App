// import React from 'react'
import Modal from 'react-bootstrap/Modal';
import nodata from '../../../../assets/images/nodata.png';

export default function DeleteConfirmation({
  show,
  handleClose,
  deleteItem,
  deleteFun,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="text-center">
        <img src={nodata} alt="nodata" className="img-fluid" />
        <h4 className="py-2">Delete This {deleteItem} </h4>
        <span className="d-block text-muted">
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </span>
      </Modal.Body>
      <Modal.Footer>
        <button
          className=" text-capitalize border-danger text-danger bg-white fw-bold p-2 rounded-3"
          onClick={deleteFun}
        >
          delete this {deleteItem}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
