import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
`;

const Area = styled.div<{ isDraggingOver: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid
    ${(props) => (props.isDraggingOver ? "#C3141B" : props.theme.boardColor)};
  border-radius: 5px;
  color: ${(props) =>
    props.isDraggingOver ? "#C3141B" : props.theme.boardColor};
  position: relative;
  transition: ease-in 0.2s;
  * {
    position: absolute;
  }
`;

function RemoveCard() {
  return (
    <Wrapper>
      <Droppable droppableId="cardRemove" type="CARD">
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <FontAwesomeIcon icon={faTrashCan} size="lg" />
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default RemoveCard;
