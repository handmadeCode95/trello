import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "./atoms";
import { useRecoilState } from "recoil";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  place-items: start center;
  gap: 10px;
  width: 100%;
  padding: 3vw;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    if (source.droppableId === "Boards") {
      setToDos((allBoards) => {
        const boardList = Object.keys(allBoards);
        const taskObj = boardList[source.index];

        boardList.splice(source.index, 1);
        boardList.splice(destination?.index, 0, taskObj);

        let newBoards = {};
        boardList.map((board) => {
          newBoards = { ...newBoards, [board]: allBoards[board] };
        });

        return newBoards;
      });
    } else {
      if (destination?.droppableId === source.droppableId) {
        setToDos((allBoards) => {
          const tempToDos = [...allBoards[source.droppableId]];
          const taskObj = tempToDos[source.index];

          tempToDos.splice(source.index, 1);
          tempToDos.splice(destination?.index, 0, taskObj);

          return {
            ...allBoards,
            [source.droppableId]: tempToDos,
          };
        });
      }

      if (destination?.droppableId !== source.droppableId) {
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBoard = [...allBoards[destination.droppableId]];

          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, taskObj);

          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="Boards" direction="horizontal" type="BOARD">
          {(provided) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  boardId={boardId}
                  key={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
