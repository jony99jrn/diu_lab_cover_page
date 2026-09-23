window.addEventListener('DOMContentLoaded', () => {
  const formScreen = document.getElementById('formScreen');
  const previewScreen = document.getElementById('previewScreen');

  const generateBtn = document.getElementById('generateBtn');
  const editBtn = document.getElementById('editBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const downloadImgBtn = document.getElementById('downloadImgBtn');

  generateBtn.addEventListener('click', () => {
    const experimentNo = document.getElementById('experimentNo').value.trim() || '01';
    const experimentName = document.getElementById('experimentName').value.trim() || 'PPS';
    const courseCode = document.getElementById('courseCode').value.trim() || 'CSE 114';
    const courseTitle = document.getElementById('courseTitle').value.trim() || 'Programming and Problem Solving';

    const teacherName = document.getElementById('teacherName').value.trim() || 'Khandoker Nosiba Arifin';
    const teacherDesig = document.getElementById('teacherDesig').value.trim() || 'Lecturer';
    const teacherDept = document.getElementById('teacherDept').value.trim() || 'Computer Science and Engineering';

    const studentName = document.getElementById('studentName').value.trim() || 'Jony Roy';
    const studentId = document.getElementById('studentId').value.trim() || '262-15-952';
    const section = document.getElementById('section').value.trim() || '72_S';
    const semester = document.getElementById('semester').value.trim() || 'Summer 2026';
    const studentDept = document.getElementById('studentDept').value.trim() || 'Computer Science and Engineering';

    const subDateVal = document.getElementById('subDate').value;

    document.getElementById('prevExperimentNo').innerText = experimentNo;
    document.getElementById('prevExperimentName').innerText = experimentName;
    document.getElementById('prevCourseCode').innerText = courseCode;
    document.getElementById('prevCourseTitle').innerText = courseTitle;

    document.getElementById('prevTeacherName').innerText = teacherName;
    document.getElementById('prevTeacherDesig').innerText = teacherDesig;
    document.getElementById('prevTeacherDept').innerText = teacherDept;

    document.getElementById('prevStudentName').innerText = studentName;
    document.getElementById('prevStudentId').innerText = studentId;
    document.getElementById('prevSection').innerText = section;
    document.getElementById('prevSemester').innerText = semester;
    document.getElementById('prevStudentDept').innerText = studentDept;

    if (subDateVal) {
      const [year, month, day] = subDateVal.split('-');
      document.getElementById('prevSubDate').innerText = `${day}/${month}/${year}`;
    } else {
      document.getElementById('prevSubDate').innerText = '25/09/2026';
    }

    formScreen.style.setProperty('display', 'none', 'important');
    previewScreen.classList.remove('hidden');
    window.scrollTo(0, 0);
  });

  editBtn.addEventListener('click', () => {
    previewScreen.classList.add('hidden');
    formScreen.style.setProperty('display', 'flex', 'important');
  });

  downloadBtn.addEventListener('click', () => {
    const element = document.getElementById('coverPage');

    const options = {
      margin: 0,
      filename: 'DIU_Lab_Report_Cover_Page.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  });

  downloadImgBtn.addEventListener('click', () => {
    const element = document.getElementById('coverPage');
    const originalLabel = downloadImgBtn.innerHTML;
    downloadImgBtn.innerHTML = 'Preparing…';
    downloadImgBtn.disabled = true;

    html2canvas(element, {
      scale: 3,
      useCORS: true,
      scrollY: 0
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'DIU_Lab_Report_Cover_Page.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      downloadImgBtn.innerHTML = originalLabel;
      downloadImgBtn.disabled = false;
    }).catch(() => {
      downloadImgBtn.innerHTML = originalLabel;
      downloadImgBtn.disabled = false;
      alert('Could not generate the image. Please try again.');
    });
  });
});
