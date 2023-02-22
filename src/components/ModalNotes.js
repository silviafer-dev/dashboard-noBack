import React from "react";
import { NotesModal } from "../styles/modal";
import { CloseButton } from "../styles/style-buttons";

export const ModalNotes = ({
  openNotesModal,
  handleCloseNotes,
  currentNote,
}) => {
  if (!openNotesModal) {
    return null;
  }

  return (
    <NotesModal>
      <CloseButton onClick={handleCloseNotes}>X</CloseButton>
      <h3>{currentNote.full_name}</h3>

      <p>
        <span style={{ fontWeight: "bold" }}>Special Request:</span>{" "}
        {currentNote.special_request}
      </p>
    </NotesModal>
  );
};
