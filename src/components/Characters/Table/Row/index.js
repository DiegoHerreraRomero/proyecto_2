import React from 'react'

export default function CharactersTableRow (props) {
  const { name, status, species, type, gender, image } = props.character
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
    </tr>
  )
}
