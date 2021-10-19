import React from 'react'

export const LinkCard = ({link}) => {
  return (
    <>
      <h2>Link</h2>
      <p>Origin link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Short link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>Count click: <strong>{link.click}</strong></p>
      <p>Created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
  )
}
