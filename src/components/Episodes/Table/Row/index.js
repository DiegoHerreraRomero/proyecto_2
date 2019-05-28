import React from 'react'

export default function EpisodesTableRow (props) {
  const { name, air_date: airDate, episode } = props.episode
  return (
    <tr>
      <td>{name}</td>
      <td>{airDate}</td>
      <td>{episode}</td>
      <td>
        <div title='Mark as Favorite'>
          <span role='img' aria-label='Mark as Favorite'>&#128150;</span>
        </div>
      </td>
    </tr>
  )
}
