import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Wrapper = styled.div`
  padding-top: 10px;
  border: 2px dashed ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  background: none;
  border: none;
  text-align: center;
  &::placeholder {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
  }
  &:focus {
    outline: none;
  }
`;

interface IForm {
  board: string;
}

function AddBoard() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit, setFocus } = useForm<IForm>();

  const onValid = ({ board }: IForm) => {
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [` ${board} `]: [],
      };
    });
    setValue("board", "");
  };

  const onClick = () => setFocus("board");

  return (
    <Wrapper onClick={onClick}>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("board", { required: true })}
          type="text"
          placeholder="Add new board"
          maxLength={15}
        />
      </form>
    </Wrapper>
  );
}

export default AddBoard;
