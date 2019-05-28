import React from 'react'
import { Modal, Container, Row, Col, Button, Image } from 'react-bootstrap'

export default function Loading (props) {
  const { show, url } = props.imageModal
  return (
    <Modal show={show} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body>
        <Container>
          <Row className='show-grid'>
            <Col>
              <Image src={url} fluid />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-secondary' onClick={props.hideImage}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  )
}
