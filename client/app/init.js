export const init = async () => {
  try {
    const res = await fetch("/api/courses");
    const data = await res.json();
    const courses = data.courses;
    renderFilesList(courses);
    if (courses.length > 0) {
      loadFileToEditor(courses[0].name, courses[0].description);
    }
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("save-button").addEventListener("click", (e) => {
  e.preventDefault();
  const courseNameToSave = e.target.form.courseName.value;
  const courseDescriptionToSave = e.target.form.CourseDescription.value;
  handlers.saveCourse(courseNameToSave, courseDescriptionToSave);
});

document.getElementById("modify-button").addEventListener("click", (e) => {
  e.preventDefault();
  const courseNameToSave = e.target.form.courseName.value;
  const courseDescriptionToSave = e.target.form.CourseDescription.value;
  handlers.modifyCourse(courseNameToSave, courseDescriptionToSave);
});
