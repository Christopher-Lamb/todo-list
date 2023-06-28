import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IoIosClose } from "react-icons/io";
import { TbEdit } from "react-icons/tb";

export default function Task({ id, content, index, onChange = () => {}, onDelete = () => {} }) {
  const [isEditing, setIsEditing] = useState(content === "" ? true : false);

  return (
    <Draggable index={index} draggableId={id}>
      {(provided) => (
        <div className="border border-white min-h-[1.5rem] flex justify-between p-2 gap-4 text-wra" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {isEditing ? <input className="text-black w-full" defaultValue={content} onChange={(e) => onChange(id, e.target.value)} /> : <p>{content}</p>}
          <div className="flex items-center">
            <a className="cursor-pointer" onClick={() => setIsEditing((bool) => !bool)}>
              <TbEdit color="white" size={"1.5rem"} />
            </a>
            <a className="cursor-pointer" onClick={() => onDelete(id)}>
              <IoIosClose color="white" size={"1.5rem"} />
            </a>
          </div>
        </div>
      )}
    </Draggable>
  );
}
