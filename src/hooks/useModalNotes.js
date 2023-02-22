import { useState } from "react";

export const useModalNotes = () => {
  const [openNotesModal, setOpenNotesModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const handleOpenNotes = (notes) => {
    setCurrentNote(notes);
    setOpenNotesModal(true);
  };
  const handleCloseNotes = () => {
    setOpenNotesModal(false);
  };
  return {
    handleOpenNotes,
    handleCloseNotes,
    currentNote,
    openNotesModal,
  };
};
