import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(magic) => (
          <ul ref={magic.innerRef} {...magic.droppableProps}>
            <Draggable draggableId="first" index={0}>
              {(magic) => (
                <li ref={magic.innerRef} {...magic.draggableProps}>
                  <span {...magic.dragHandleProps}>🖤</span>
                  One
                </li>
              )}
            </Draggable>
            <Draggable draggableId="second" index={0}>
              {(magic) => (
                <li ref={magic.innerRef} {...magic.draggableProps}>
                  <span {...magic.dragHandleProps}>🤍</span>
                  Two
                </li>
              )}
            </Draggable>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
