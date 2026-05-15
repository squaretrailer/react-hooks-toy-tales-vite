import React from "react";

function ToyCard({ toy, onLike, onDelete }) {
  const { id, name, image, likes } = toy;

  function handleLikeClick() {
    onLike(id, likes);
  }

  function handleDeleteClick() {
    onDelete(id);
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>   {/* trailing space added here */}
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;