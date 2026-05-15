import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]); // state to hold all toys

  // GET all toys on page load
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Failed to fetch toys:", err));
  }, []);

  // POST a new toy
  function handleAddToy(newToyData) {
    // newToyData comes from ToyForm with name and image
    const toyToSend = {
      ...newToyData,
      likes: 0, // initial likes = 0
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toyToSend),
    })
      .then((res) => res.json())
      .then((savedToy) => setToys([...toys, savedToy]))
      .catch((err) => console.error("Failed to add toy:", err));
  }

  // PATCH likes (increase by 1)
  function handleLikeToy(id, currentLikes) {
    const updatedLikes = currentLikes + 1;

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        // update state, preserving order
        const updatedToys = toys.map((toy) =>
          toy.id === updatedToy.id ? updatedToy : toy
        );
        setToys(updatedToys);
      })
      .catch((err) => console.error("Failed to update likes:", err));
  }

  // DELETE a toy
  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, { method: "DELETE" })
      .then(() => {
        // remove toy from state
        const remainingToys = toys.filter((toy) => toy.id !== id);
        setToys(remainingToys);
      })
      .catch((err) => console.error("Failed to delete toy:", err));
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;