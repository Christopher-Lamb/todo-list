import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IoIosClose } from "react-icons/io";
import { TbEdit } from "react-icons/tb";

// const newText = `&nbsp;&nbsp;&nbsp;&nbsp;${&nbsp;}`

export default function Task({ id, content, index, onChange = () => {}, onDelete = () => {} }) {
  const [isEditing, setIsEditing] = useState(content === "" ? true : false);

  return (
    <Draggable index={index} draggableId={id}>
      {(provided) => (
        <div className="border border-white min-h-[1.5rem] flex justify-between p-2 gap-4 text-wra" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {isEditing ? <TextInput text={content} onChange={(value) => onChange(id, value)} /> : <p className="break-all whitespace-pre-wrap">{content}</p>}
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

const TextInput = ({ onChange = () => {}, text }) => {
  const autoResize = (textarea) => {
    textarea.style.height = "1.5rem";
    const previousScrollHeight = textarea.scrollHeight;
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.height = textarea.scrollHeight + "px"; // Double setting to ensure the scrollHeight is applied properly
    const currentScrollHeight = textarea.scrollHeight;

    // Shrink the textarea if a single line is deleted
    if (currentScrollHeight === previousScrollHeight && textarea.value !== "") {
      const lineHeight = parseFloat(window.getComputedStyle(textarea).lineHeight);
      const linesDeleted = Math.floor((previousScrollHeight - currentScrollHeight) / lineHeight);

      if (linesDeleted === 1) {
        textarea.style.height = currentScrollHeight - lineHeight + "px";
      }
    }
  };
  //line height = fontsize * 1.5
  return (
    <textarea
      autoFocus="true"
      className="text-black px-2 w-full h-[1.5rem] resize-none"
      onFocus={(e) => (e.target.style.height = e.target.scrollHeight + "px")}
      onChange={(e) => {
        autoResize(e.target);
        onChange(e.target.value);
      }}
      defaultValue={text}
    />
  );
};

