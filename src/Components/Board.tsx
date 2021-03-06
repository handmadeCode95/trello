import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IForm {
  toDo: string;
}

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#f1f6f8"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.2s ease-in;
`;

const FormWrapper = styled.div`
  padding: 0 10px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    background: none;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.bgColor};
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const Remove = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  color: #c3141b;
  background: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

function Board({ toDos, boardId, index }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };

  const onClick = () => {
    setToDos((allBoards) => {
      const boardList = Object.keys(allBoards);

      boardList.splice(index, 1);

      let newBoards = {};
      boardList.map((board) => {
        newBoards = { ...newBoards, [board]: allBoards[board] };
      });

      return newBoards;
    });
  };
  return (
    <Draggable key={boardId} draggableId={boardId} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Header>
            <Title>{boardId}</Title>
            <Remove onClick={onClick}>
              <FontAwesomeIcon icon={faX} size={"sm"} />
            </Remove>
          </Header>

          <FormWrapper>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("toDo", { required: true })}
                type="text"
                placeholder={`Add task on ${boardId.trim()}`}
                maxLength={30}
              ></input>
            </Form>
          </FormWrapper>

          <Droppable droppableId={boardId} type="CARD">
            {(cardProvided, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={cardProvided.innerRef}
                {...cardProvided.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {cardProvided.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Board;
