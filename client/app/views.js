const renderFilesList = (filesArr) => {
  const filesList = filesArr
    .map((fileName) => {
      const loadButton = document.createElement("button");
      loadButton.innerHTML = fileName.name;
      loadButton.onclick = () => handlers.fetchAndLoadCourse(fileName);

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "X";
      deleteButton.onclick = () => deleteFile(fileName);

      const li = document.createElement("li");
      li.appendChild(loadButton);
      li.appendChild(deleteButton);

      return li;
    })
    .reduce((all, next) => {
      all.appendChild(next);
      return all;
    }, document.createElement("ul"));

  const filesListContainer = document.getElementById("course-list-container");
  filesListContainer.innerHTML = "";
  filesListContainer.appendChild(filesList);
};

const loadFileToEditor = (name, text) => {
  document.getElementById("course-name").value = name;
  document.getElementById("Course-content").value = text;
};
