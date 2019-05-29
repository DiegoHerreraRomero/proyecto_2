import React, { useContext } from 'react'
import { UserContext } from '../../../contexts/User'
import { Row, Col, Table } from 'react-bootstrap'

export default function MacthPeople () {
  const { state } = useContext(UserContext)
  const { userLogged, users } = state
  const { favoriteEpisodes } = userLogged

  return (
    <div>
      <h3 className='mt-3'>Match People</h3>
      <Row>
        <Col>
          <Table striped bordered responsive size='sm'>
            <thead>
              <tr>
                <th>User</th>
                <th>Coincidences</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(u => u.id !== userLogged.id).map(u => {
                const coincidences = favoriteEpisodes.filter(fe => {
                  return u.favoriteEpisodes.includes(fe)
                })
                if (coincidences.length > 0) {
                  return (
                    <tr>
                      <td>{u.email}</td>
                      <td>{coincidences.join(', ')}</td>
                    </tr>
                  )
                }
                return null
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}
