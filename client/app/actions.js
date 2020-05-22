const handlers = {
  fetchAndLoadCourse: async (file) => {
    try {
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
  saveCourse: async (courseName, courseDescription) => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      const courses = data.courses;
      const exists = courses.find((course) => course.name === courseName);
      if (exists) {
        alert(
          `The course "${courseName}" already exists. Press the modify button if you only want to change the description.`
        );
        return;
      }
      const resPost = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify({
          name: courseName,
          description: courseDescription,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (resPost.status === 400) {
        alert(
          "You must enter a name and a valid description ( min 10 characters)"
        );
        return;
      }
      const newRes = await fetch("/api/courses");
      const newData = await newRes.json();
      const newCourses = newData.courses;
      renderFilesList(newCourses);
      alert("your  new course is  saved");
    } catch (error) {
      console.log(error);
    }
  },
};

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
