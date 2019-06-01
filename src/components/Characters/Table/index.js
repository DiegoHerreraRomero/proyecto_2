import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CharactersTableRow from './Row'
import Loading from '../../Loading'
import Image from '../Image'
import { Table, Pagination, Row, Col } from 'react-bootstrap'

const URL = 'https://rickandmortyapi.com/api/character'
const defaultTableData = {
  characters: [],
  prev: '',
  next: '',
  currentPage: 0
}
const defaultImageModal = {
  show: false,
  url: ''
}

export default function CharactersTable (props) {
  const [tableData, setTableData] = useState(defaultTableData)
  const [isLoading, setIsLoading] = useState(false)
  const [imageModal, setImageModal] = useState(defaultImageModal)

  const loadCharacters = (url, sumPage = 1) => {
    const getApi = async (url, sumPage) => {
      setIsLoading(true)
      const response = await axios.get(url)
      const { info, results } = response.data
      setTableData({
        ...tableData,
        characters: results,
        prev: info.prev,
        next: info.next,
        currentPage: tableData.currentPage + sumPage
      })
      setIsLoading(false)
    }

    getApi(url, sumPage)
  }

  const showImage = (url) => {
    setImageModal({
      show: true,
      url
    })
  }

  const hideImage = () => {
    setImageModal(defaultImageModal)
  }

  useEffect(() => loadCharacters(URL, 1), [])

  const { characters, prev, next, currentPage } = tableData

  return (
    <div>
      <Loading isLoading={isLoading} />
      <Image
        imageModal={imageModal}
        hideImage={hideImage}
      />
      <h3 className='mt-3'>Characters</h3>
      <Row>
        <Col>
          <Table striped bordered responsive size='sm'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Species</th>
                <th>Type</th>
                <th>Gender</th>
                <th>Image</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {characters.map(character => {
                return <CharactersTableRow
                  key={character.id}
                  character={character}
                  showImage={showImage}
                />
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination className='justify-content-center'>
            { prev !== '' && <Pagination.Prev onClick={() => loadCharacters(prev, -1)} />}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {next !== '' && <Pagination.Next onClick={() => loadCharacters(next)} />}
          </Pagination>
        </Col>
      </Row>
    </div>
  )
}
