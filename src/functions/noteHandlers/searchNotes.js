const searchNotes = (notes, searchQuery) => {
  if (searchQuery === "") {
    return notes;
  }

  return notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export { searchNotes };
