const handlers = {
  fetchAndLoadFile: async (file) => {
    try {
      console.log("this is filename", file);
      const res = await fetch("/api/courses");
      const data = await res.json();
      const courses = data.courses;
      const courseFiltered = courses.find(
        (course) => course.name === file.name
      );
      loadFileToEditor(courseFiltered.name, courseFiltered.description);
    } catch (error) {
      console.log(error);
    }
  },
};

//     .then((fileData) => loadFileToEditor(fileData.name, fileData.text))
//     .catch((err) => console.error(err));

// const saveFile = (fileName, fileText) => {
//   fetch("/files/" + fileName, {
//     method: "POST",
//     body: JSON.stringify({ text: fileText }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((res) => {
//       if (!res.ok) {
//         throw res;
//       }
//       return res.json();
//     })
//     .then((filesList) => {
//       renderFilesList(filesList);
//       alert("your changes are saved");
//     })
//     .catch((err) => {
//       alert("unable to save your changes");
//       console.error(err);
//     });
// };

// const deleteFile = (fileName) => {
//   fetch("/files/" + fileName, {
//     method: "DELETE",
//   })
//     .then((res) => {
//       if (!res.ok) {
//         throw res;
//       }
//       return res.json();
//     })
//     .then((filesList) => {
//       renderFilesList(filesList);
//       alert("file is deleted");
//     })
//     .catch((err) => {
//       alert("unable to delete file");
//       console.error(err);
//     });
// };
