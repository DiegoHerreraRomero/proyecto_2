import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EpisodesTableRow from './Row'
import Loading from '../../Loading'
import { Table, Pagination, Row, Col } from 'react-bootstrap'

const URL = 'https://rickandmortyapi.com/api/episode'
const defaultTableData = {
  episodes: [],
  prev: '',
  next: '',
  currentPage: 0
}

export default function EpisodesTable (props) {
  const [tableData, setTableData] = useState(defaultTableData)
  const [isLoading, setIsLoading] = useState(false)

  const loadEpisodes = (url, sumPage = 1) => {
    const getApi = async (url, sumPage) => {
      setIsLoading(true)
      const response = await axios.get(url)
      const { info, results } = response.data
      setTableData({
        ...tableData,
        episodes: results,
        prev: info.prev,
        next: info.next,
        currentPage: tableData.currentPage + sumPage
      })
      setIsLoading(false)
    }

    getApi(url, sumPage)
  }

  useEffect(() => loadEpisodes(URL), [])

  const { episodes, prev, next, currentPage } = tableData

  return (
    <div>
      <Loading isLoading={isLoading} />
      <h3 className='mt-3'>Episodes</h3>
      <Row>
        <Col>
          <Table striped bordered responsive size='sm'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Air date</th>
                <th>Episode</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map(episode => {
                return <EpisodesTableRow
                  key={episode.id}
                  episode={episode}
                />
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination className='justify-content-center'>
            { prev !== '' && <Pagination.Prev onClick={() => loadEpisodes(prev, -1)} />}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {next !== '' && <Pagination.Next onClick={() => loadEpisodes(next)} />}
          </Pagination>
        </Col>
      </Row>
    </div>
  )
}
