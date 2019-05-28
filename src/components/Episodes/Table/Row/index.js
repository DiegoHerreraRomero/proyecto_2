import React from 'react'

export default function EpisodesTableRow (props) {
  const { name, air_date: airDate, episode } = props.episode
  return (
    <tr>
      <td>{name}</td>
      <td>{airDate}</td>
      <td>{episode}</td>
      <td>
        {!props.isFavorite && (
          <div title='Mark as Favorite'>
            <span role='img' aria-label='Mark as Favorite' className='h2'>&#128150;</span>
          </div>
        )}
        {props.isFavorite && (
          <div title='Remove from Favorite'>
            <span role='img' aria-label='Mark as Favorite'>&#128148;</span>
          </div>
        )}
      </td>
    </tr>
  )
}
