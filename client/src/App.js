import { useState, useEffect } from 'react';
import AnimalList from './AnimalList';

import './App.css';

function App() {
  const [animalName, setAnimalName] = useState('');
  const [animalList, setAnimalList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const initialFetch = async () => {
    try {
      const response = await fetch('http://localhost:3030/animals');
      const data = await response.json();
      setAnimalList(data);
    } catch (error) {
      console.log('Error fetching: ', error);
    }
  }

  useEffect(() => {
    initialFetch();
  }, []);

  const handleSubmit = (e) => {
     e.preventDefault();
     if(!animalName) {
      return;
     }
     else if(animalName && isEditing) {
      //deal with edit
      setAnimalList(animalList.map((animal) => {
        if(animal.id === editId) {
          return { ...animal, name: animalName }
        }
        return animal; //default
      }));
      setAnimalName('');
      setEditId(null);
      setIsEditing(false);
     }
     else {
      //create the new animal
      const newAnimal = { id: animalList.length+2 || 1, name: animalName, species: 'New species', age: 5 };
      setAnimalList([...animalList, newAnimal]);
      setAnimalName('');
     }
  }

  const removeAnimal = (id) => {
    setAnimalList(animalList.filter((animal) => animal.id !== id));
  }

  const editAnimal = (id) => {
    const editableAnimal = animalList.find((animal) => animal.id === id);
    setIsEditing(true);
    setEditId(id);
    setAnimalName(editableAnimal.name);
  }

  return (
    <div className="App">
      <div className='container'>
      <form>
          <h3>Search</h3>
          <div>
            <input type="text" className='animal-input' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </form>
        <form onSubmit={handleSubmit}>
          <h3>Animals</h3>
          <div>
            <input type="text" className='animal-input' value={animalName} onChange={(e) => setAnimalName(e.target.value)} />
            <button type="submit" className='submit-btn'>{isEditing ? 'Edit' : 'Create'}</button>
          </div>
        </form>
      </div>
      { animalList.length > 0 && ( 
        // Only show when there are animals
        <div className='animal-container'>
          <AnimalList animals={animalList} removeAnimal={removeAnimal} editAnimal={editAnimal} searchTerm={searchTerm} />
        </div>
      ) }
    </div>
  );
}

export default App;
