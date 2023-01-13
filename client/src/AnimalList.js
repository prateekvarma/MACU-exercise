const AnimalList = ({ animals, removeAnimal, editAnimal, searchTerm }) => {
  return (
    <table className="animals">
      <tbody>
        <tr>
          <th className="text-left padd">Name/Age</th>
          <th className="text-left"></th>
          <th className="text-right">Species</th>
          <th className="text-right">Edit</th>
          <th className="text-right padd">Delete</th>
        </tr>

          {animals
          .filter((item) => {
            return searchTerm.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchTerm)
          })
          .map((animal) => {
            return (
              <tr key={animal.id}>
                <td className='small-screen'>{animal.name}</td>
                <td className='small-screen'>{animal.age}</td>
                <td className="text-right">{animal.species}</td>
                <td className="text-right"><button onClick={() => editAnimal(animal.id)} className="submit-btn">Edit</button></td>
                <td className="text-right"><button onClick={() => removeAnimal(animal.id)} className="submit-btn">Delete</button></td>
              </tr>
            )
          })}
      </tbody>
      </table>
  )
}

export default AnimalList;