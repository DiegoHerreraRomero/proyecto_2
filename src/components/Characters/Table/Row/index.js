import React, { useContext } from 'react'
import {
  UserContext,
  addFavoriteCharacter as AddFavoriteCharacterDispatch,
  removeFavoriteCharacter as RemoveFavoriteCharacterDispatch
} from '../../../../contexts/User'

export default function CharactersTableRow (props) {
  const { state, dispatch } = useContext(UserContext)
  const { name, status, species, type, gender, image } = props.character

  const isFavorite = state.userLogged.favoriteCharacters.includes(name)

  return (
    <tr>
      <td>{name}</td>
      <td>{status}</td>
      <td>{species}</td>
      <td>{type}</td>
      <td>{gender}</td>
      <td>
        <div onClick={() => props.showImage(image)} title='Show image'>
          <span role='img' aria-label='Show image' className='h2'>&#127924;</span>
        </div>
      </td>
      <td>
        {!isFavorite && (
          <div title='Mark as Favorite' onClick={() => dispatch(AddFavoriteCharacterDispatch(name))}>
            <span role='img' aria-label='Mark as Favorite' className='h2'>&#128150;</span>
          </div>
        )}
        {isFavorite && (
          <div title='Remove from Favorite' onClick={() => dispatch(RemoveFavoriteCharacterDispatch(name))}>
            <span role='img' aria-label='Mark as Favorite' className='h2'>&#128148;</span>
          </div>
        )}
      </td>
    </tr>
  )
}
