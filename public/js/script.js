const bodyRect = document.body.getBoundingClientRect();

const sections = [
  document.getElementById("who-am-i"),
  document.getElementById("jobs"),
  document.getElementById("educations"),
  document.getElementById("skills"),
  document.getElementById("certifications"),
  document.getElementById("extra"),
];

const getSectionOffset = (section) => {
  return section.getBoundingClientRect().top - window.innerHeight;
};

const updateSectionVisibility = () => {
  for (i = 0; i < sections.length; i++) {
    const sectionOffset = getSectionOffset(sections[i]);
    if (sectionOffset < 0) {
      sections[i].classList.add(
        "animate__animated",
        "animate__fadeIn",
        "animate__slow"
      );
    } else {
      sections[i].classList.remove(
        "animate__animated",
        "animate__fadeIn",
        "animate__slow"
      );
    }
  }
};

document.addEventListener("load", updateSectionVisibility);
document.addEventListener("scroll", updateSectionVisibility);
