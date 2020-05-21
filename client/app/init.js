export const init = async () => {
  try {
    const res = await fetch("/api/courses");
    const data = await res.json();
    const courses = data.courses;
    console.log(courses);
    renderFilesList(data.courses);
    if (courses.length > 0) {
      loadFileToEditor(courses[0], courses[0].description);
    }
  } catch (error) {
    console.log(error);
  }
};

// fetch("/files")
//   .then((res) => {
//     if (!res.ok) {
//       throw res;
//     }
//     return res.json();
//   })
//   .then((files) => {
//     renderFilesList(files);
//     if (files.length > 0) {
//       loadFileToEditor(files[0]);
//     }
//   })
//   .catch((err) => console.error(err));

// document.getElementById("save-button").addEventListener("click", (e) => {
//   const fileNameToSave = e.target.form.fileName.value;
//   const fileTextToSave = e.target.form.fileText.value;
//   saveFile(fileNameToSave, fileTextToSave);
//   e.preventDefault();
// });
