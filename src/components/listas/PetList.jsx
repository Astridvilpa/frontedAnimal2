import React from "react";
import { Card, Button } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";

const PetList = ({ pets, handleEditPetClick, handleDeletePetClick }) => {
  if (!pets || pets.length === 0) {
    return <p>No hay mascotas disponibles.</p>;
  }

  return (
    <div>
      {pets.map((pet) => {
        console.log("Pet data:", pet); // Agregamos un console.log para depurar
        if (!pet || !pet.name || !pet.type) {
          return <p key={pet.id}>Datos de mascota incompletos.</p>;
        }
        return (
          <Card key={pet.id} className="mb-4">
            <Card.Body>
              <Card.Title>{pet.name}</Card.Title>
              <Card.Text>Tipo: {pet.type}</Card.Text>
              <Button
                className="ms-2"
                onClick={() => handleEditPetClick(pet)}
              >
                <BsFillPencilFill />
              </Button>
              <Button
                className="ms-2"
                onClick={() => handleDeletePetClick(pet.id)}
              >
                <BsFillTrash3Fill />
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default PetList;