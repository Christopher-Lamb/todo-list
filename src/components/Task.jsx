import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IoIosClose } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { useDarkMode } from "../context/DarkModeContext";
// const newText = `&nbsp;&nbsp;&nbsp;&nbsp;${&nbsp;}`

const getContainerStyle = (darkMode, draggableStyle) => ({
  background: darkMode ? "#4b5563" : "white",
  outline: darkMode ? "1px solid #9ca3af" : "",
  boxShadow: darkMode ? "" : "-7px 7px 0px -1px rgba(0,0,0,0.75)",
  ...draggableStyle,
});

const getSelectorStyle = (darkMode, completed) => {
  let light = {
    color: "black",
    background: completed ? "white" : "",
    borderRadius: ".25rem",
  };
  let dark = {
    color: "white",
    background: completed ? "#4b5563" : "",
  };

  if (darkMode) return dark;
  if (!darkMode) return light;
};

export default function Task({ id, content, index, completed, onChange = () => {}, onDelete = () => {}, onCompleted = () => {} }) {
  const [isEditing, setIsEditing] = useState(content === "" ? true : false);
  const [height, setHeight] = useState(0);
  const darkMode = useDarkMode();
  const ref = useRef(null);

  useEffect(() => {
    if (ref) {
      setHeight(ref.current.clientHeight);
    }
  }, [onChange]);

  return (
    <Draggable index={index} draggableId={id}>
      {(provided) => {
        return (
          <div
            id={id}
            className="w-full h-full mt-3 rounded-sm"
            data-testid="task"
            ref={(el) => {
              provided.innerRef(el);
              if (ref) {
                ref.current = el;
              }
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getContainerStyle(darkMode, provided.draggableProps.style)}
          >
            {completed && content !== "" && (
              <div className="relative">
                <div
                  className="absolute bg-black h-2 translate-y-[16px] left-[-1rem]"
                  style={{ width: `calc(100% + 2rem)`, transform: `translateY(${height / 2 - 4}px)`, background: darkMode ? "rgb(255,255,255,.7)" : "rgb(53,54,55,.7)" }}
                />
              </div>
            )}
            <div className="flex justify-between p-2 gap-4">
              {/* <div className="w-full h-full flex justify-between p-2 gap-4 mt-5" style={darkMode ? containerDarkStyles : containerLightStyles}> */}
              {isEditing ? (
                <TextInput text={content} onChange={(value) => onChange(id, value)} />
              ) : (
                <p style={{ color: darkMode ? "white" : "black" }} className={`break-all whitespace-pre-wrap ${completed ? "line-through" : ""}`}>
                  {content}
                </p>
              )}
              <div className="flex items-center">
                {!isEditing && content !== "" && (
                  <a className="cursor-pointer mr-1 z-[1]" onClick={() => onCompleted(id, !completed)}>
                    <AiOutlineStrikethrough style={getSelectorStyle(darkMode, completed)} size={"1.3rem"} />
                  </a>
                )}
                {!completed && (
                  <a className="cursor-pointer" onClick={() => setIsEditing((bool) => !bool)}>
                    <TbEdit color={darkMode ? "white" : "black"} size={"1.5rem"} />
                  </a>
                )}
                <a className="cursor-pointer z-[1]" onClick={() => onDelete(id)}>
                  <IoIosClose style={getSelectorStyle(darkMode, completed)} size={"1.5rem"} />
                </a>
              </div>
              {/* </div> */}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

const TextInput = ({ onChange = () => {}, text }) => {
  const darkMode = useDarkMode();
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
      autoFocus={true}
      className="text-black px-2 w-full h-[1.5rem] resize-none rounded"
      style={{ outline: darkMode ? "" : "1px solid black" }}
      onFocus={(e) => {
        e.target.style.height = e.target.scrollHeight + "px";
        e.target.style.outline = "2px solid #005fcc";
      }}
      onBlur={(e) => (e.target.style.outline = "1px solid black")}
      onChange={(e) => {
        autoResize(e.target);
        onChange(e.target.value);
      }}
      defaultValue={text}
    />
  );
};
