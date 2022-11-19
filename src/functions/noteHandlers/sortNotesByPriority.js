const sortNotesByPriority = (notes, type) => {
  const lowPriorityNotes = notes.filter((note) => note.priority === "low");
  const hightPriorityNotes = notes.filter((note) => note.priority === "high");

  if (type === "lowToHigh") {
    return [...lowPriorityNotes, ...hightPriorityNotes];
  } else if (type === "highToLow") {
    return [...hightPriorityNotes, ...lowPriorityNotes];
  } else {
    return notes;
  }
};

export { sortNotesByPriority };
