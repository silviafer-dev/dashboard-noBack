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
      <p
        style={{
          fontWeight: "bold",
          alignSelf: "flex-start",
          marginTop: "20px",
        }}
      >
        Special Request:
      </p>
      <p>
        {currentNote.special_request !== ""
          ? currentNote.special_request
          : "No special requests have been made"}
      </p>
    </NotesModal>
  );
};
