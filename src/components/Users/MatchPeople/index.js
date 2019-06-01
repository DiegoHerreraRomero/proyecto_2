import React, { useContext } from 'react'
import { UserContext } from '../../../contexts/User'
import { Row, Col, Table } from 'react-bootstrap'

export default function MacthPeople () {
  const { state } = useContext(UserContext)
  const { userLogged, users } = state
  const { favoriteEpisodes, favoriteCharacters } = userLogged

  const matchedPeople = users.filter(u => {
    if (u.id !== userLogged.id) {
      const coincidencesEpisodes = favoriteEpisodes.filter(ep => u.favoriteEpisodes.includes(ep))
      const coincidencesCharacters = favoriteCharacters.filter(ch => u.favoriteCharacters.includes(ch))
      const matchScore = coincidencesEpisodes.length + coincidencesCharacters.length
      if (matchScore > 0) {
        return true
      }
    }
    return false
  }).map(u => {
    const coincidencesEpisodes = favoriteEpisodes.filter(ep => u.favoriteEpisodes.includes(ep))
    const coincidencesCharacters = favoriteCharacters.filter(ch => u.favoriteCharacters.includes(ch))
    const matchScore = coincidencesEpisodes.length + coincidencesCharacters.length
    return {
      id: u.id,
      email: u.email,
      coincidencesEpisodes,
      coincidencesCharacters,
      matchScore
    }
  }).sort((a, b) => {
    if (a.matchScore < b.matchScore) {
      return 1
    }
    if (a.matchScore > b.matchScore) {
      return -1
    }
    return 0
  })

  return (
    <div>
      <h3 className='mt-3'>Match People</h3>
      <Row>
        <Col>
          <Table striped bordered responsive size='sm'>
            <thead>
              <tr>
                <th>User</th>
                <th>Coincidences Episodes</th>
                <th>Coincidences Characters</th>
                <th>Match Score</th>
              </tr>
            </thead>
            <tbody>
              {matchedPeople.map(u => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.coincidencesEpisodes.join(', ')}</td>
                  <td>{u.coincidencesCharacters.join(', ')}</td>
                  <td>{u.matchScore}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}
