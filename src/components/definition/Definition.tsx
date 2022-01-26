import { useState } from 'react'
import { solution } from '../../lib/words'

let url = 'https://www.latindictionary.io/api/v1/analyze/' + solution

export const Definition = () => {
  // fetch the data from latindictionary.io
  const [definition, setDefinition] = useState()

  fetch(url, {
    mode: 'no-cors',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // set the data to the state
      setDefinition(data)
    })

  return (
    <div>
      <h1>{definition}</h1>
    </div>
  )
}
