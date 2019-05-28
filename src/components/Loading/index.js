import React from 'react'
import { Modal, Spinner, Container, Row, Col } from 'react-bootstrap'

export default function Loading ({ isLoading }) {
  return (
    <Modal show={isLoading} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body>
        <Container>
          <Row className='show-grid'>
            <Col />
            <Col>
              <Spinner animation='border' variant='dark' sizing='xl' />
            </Col>
            <Col />
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}
