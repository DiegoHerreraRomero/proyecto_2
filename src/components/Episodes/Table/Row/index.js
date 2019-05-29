import React, { useContext } from 'react'
import {
  UserContext,
  addFavorite as AddFavoriteDispatch,
  removeFavorite as RemoveFavoriteDispatch
} from '../../../../contexts/User'

export default function EpisodesTableRow (props) {
  const { state, dispatch } = useContext(UserContext)
  const { id, name, air_date: airDate, episode } = props.episode

  const isFavorite = state.userLogged.favoriteEpisodes.includes(id)

  return (
    <tr>
      <td>{name}</td>
      <td>{airDate}</td>
      <td>{episode}</td>
      <td>
        {!isFavorite && (
          <div title='Mark as Favorite' onClick={() => dispatch(AddFavoriteDispatch(id))}>
            <span role='img' aria-label='Mark as Favorite' className='h2'>&#128150;</span>
          </div>
        )}
        {isFavorite && (
          <div title='Remove from Favorite' onClick={() => dispatch(RemoveFavoriteDispatch(id))}>
            <span role='img' aria-label='Mark as Favorite'>&#128148;</span>
          </div>
        )}
      </td>
    </tr>
  )
}
