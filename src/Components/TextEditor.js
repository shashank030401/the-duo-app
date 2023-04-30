import React, { useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
// import "../Styles/RichTextEditor.css";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const StyledReactQuill = styled(ReactQuill)`
  .ql-editor {
    min-height: ${(props) => (props.minHeight ? props.minHeight : "150px")};
    max-height: ${(props) => (props.maxHeight ? props.maxHeight : "150px")};
  }
`;

function TextEditor(props) {
  const handleChange = (e) => {
    props.getTextEditorInput(e);
  };
  return (
    <div className="richTextEditor">
      <label style={{ fontFamily: props.font }}>{props.label}</label>
      <StyledReactQuill
        maxHeight={props.maxHeight}
        minHeight={props.minHeight}
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
}

export default TextEditor;
