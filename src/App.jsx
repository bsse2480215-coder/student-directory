import { useState } from 'react';

const initialStudents = [
  { id: 101, name: 'Jane Doe', major: 'Computer Science', year: 2, gpa: 3.8 },
  { id: 102, name: 'Mary Doe', major: 'Computer Science', year: 2, gpa: 3.8 },
  { id: 103, name: 'Gant Doe', major: 'Computer Science', year: 2, gpa: 3.8 },
  { id: 104, name: 'Amm Doe', major: 'Computer Science', year: 2, gpa: 3.8 },
  { id: 105, name: 'Ali Khan', major: 'Software Engineering', year: 3, gpa: 3.6 },
  { id: 106, name: 'Sara Ahmed', major: 'Computer Science', year: 2, gpa: 3.9 },
  { id: 107, name: 'John Smith', major: 'Information Technology', year: 1, gpa: 3.5 },
  { id: 108, name: 'Ayesha Khan', major: 'Software Engineering', year: 4, gpa: 3.7 },
  { id: 109, name: 'David Lee', major: 'Computer Science', year: 3, gpa: 3.4 },
  { id: 110, name: 'Hina Ali', major: 'Information Technology', year: 2, gpa: 3.8 },
  { id: 111, name: 'Ahmed Noor', major: 'Computer Science', year: 1, gpa: 3.6 },
  { id: 112, name: 'Emma Brown', major: 'Software Engineering', year: 4, gpa: 3.9 }
];

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom">
      <div className="container">
        <a className="navbar-brand" href="#home">StudentPortal</a>
        <div className="navbar-nav flex-row flex-wrap gap-3">
          <a className="nav-link" href="#home">Dashboard</a>
          <a className="nav-link" href="#students">Students</a>
          <a className="nav-link" href="#courses">Courses</a>
          <a className="nav-link" href="#reports">Reports</a>
        </div>
      </div>
    </nav>
  );
}

function StudentCard({ student, onDelete, onView }) {
  return (
    <div className="card student-card h-100 shadow-sm">
      <div className="student-avatar">👤</div>
      <div className="card-body">
        <h4 className="card-title">{student.name}</h4>
        <p className="card-text mb-0">ID: {student.id}</p>
        <p className="card-text mb-0">Major: {student.major}</p>
        <p className="card-text mb-0">Year: {student.year}</p>
        <p className="card-text mb-3">GPA: {student.gpa}</p>
        <button
          className="btn btn-outline-primary btn-sm me-2 mb-2"
          onClick={() => onView(student)}
        >
          View Profile
        </button>
        <button
          className="btn btn-outline-danger btn-sm mb-2"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [message, setMessage] = useState(
    'Student records have been successfully updated.'
  );
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [name, setName] = useState('');
  const [major, setMajor] = useState('Computer Science');
  const [year, setYear] = useState('2');
  const [gpa, setGpa] = useState('3.5');

  const filteredStudents = students.filter(student =>
    `${student.name} ${student.id} ${student.major}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / 4));
  const currentPage = Math.min(page, totalPages);
  const visibleStudents = filteredStudents.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  );

  function deleteStudent(id) {
    setStudents(students.filter(student => student.id !== id));
    setSelectedStudent(null);
    setMessage('Student record deleted successfully.');
    setShowAlert(true);
  }

  function addStudent(event) {
    event.preventDefault();

    const newStudent = {
      id: Math.max(100, ...students.map(student => student.id)) + 1,
      name,
      major,
      year: Number(year),
      gpa: Number(gpa)
    };

    setStudents([...students, newStudent]);
    setName('');
    setShowForm(false);
    setPage(Math.ceil((filteredStudents.length + 1) / 4));
    setMessage('New student added successfully.');
    setShowAlert(true);
  }

  return (
    <>
      <Navbar />

      <main className="container my-4" id="home">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb custom-breadcrumb p-3">
            <li className="breadcrumb-item">
              <a href="#home">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#students">Students</a>
            </li>
            <li className="breadcrumb-item active text-white">
              Directory
            </li>
          </ol>
        </nav>

        <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h2>Student Directory</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setSelectedStudent(null);
            }}
          >
            {showForm ? 'Cancel' : 'Add New Student'}
          </button>
        </div>

        {showForm && (
          <form className="card card-body mb-4" onSubmit={addStudent}>
            <h4>Add Student</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Student Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Enter student name"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Major</label>
                <select
                  className="form-select"
                  value={major}
                  onChange={e => setMajor(e.target.value)}
                >
                  <option>Computer Science</option>
                  <option>Software Engineering</option>
                  <option>Information Technology</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Year</label>
                <select
                  className="form-select"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">GPA</label>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  max="4"
                  step="0.1"
                  value={gpa}
                  onChange={e => setGpa(e.target.value)}
                  required
                />
              </div>
            </div>
            <button className="btn btn-success mt-3" type="submit">
              Save Student
            </button>
          </form>
        )}

        <div className="row g-2 mb-4">
          <div className="col-md-9">
            <input
              className="form-control"
              placeholder="Search by name, ID or major"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
                setSelectedStudent(null);
              }}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100" onClick={() => setPage(1)}>
              Search
            </button>
          </div>
        </div>

        {selectedStudent && (
          <div className="alert alert-info">
            <button
              className="btn-close float-end"
              onClick={() => setSelectedStudent(null)}
              aria-label="Close"
            />
            <h5>Student Profile</h5>
            <p className="mb-1">Name: {selectedStudent.name}</p>
            <p className="mb-1">ID: {selectedStudent.id}</p>
            <p className="mb-1">Major: {selectedStudent.major}</p>
            <p className="mb-1">Year: {selectedStudent.year}</p>
            <p className="mb-0">GPA: {selectedStudent.gpa}</p>
          </div>
        )}

        <div className="row g-3" id="students">
          {visibleStudents.map(student => (
            <div className="col-12 col-sm-6 col-lg-3" key={student.id}>
              <StudentCard
                student={student}
                onDelete={deleteStudent}
                onView={setSelectedStudent}
              />
            </div>
          ))}
        </div>

        {visibleStudents.length === 0 && (
          <p className="text-center my-5">No students found.</p>
        )}

        <nav aria-label="Student pages" className="my-4">
          <ul className="pagination justify-content-center flex-wrap">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <li
                className={`page-item ${currentPage === number ? 'active' : ''}`}
                key={number}
              >
                <button className="page-link" onClick={() => setPage(number)}>
                  {number}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

        {showAlert && (
          <div className="alert alert-info alert-dismissible fade show">
            {message}
            <button
              className="btn-close"
              onClick={() => setShowAlert(false)}
              aria-label="Close"
            />
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-6">
              <h5>Links</h5>
              <a href="#home">Home</a><br />
              <a href="#students">Computer Science</a><br />
              <a href="#courses">Courses</a><br />
              <a href="#reports">Reports</a>
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <h5>Contact Info</h5>
              <p className="mb-1">Contact Us</p>
              <p className="mb-1">+1: 123 456 7890</p>
              <p>trm@studentportal.com</p>
            </div>
          </div>
          <hr />
          <p className="text-center mb-0">
            © 2026 StudentPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
