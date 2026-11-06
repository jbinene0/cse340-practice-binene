// Import the faculty model functions
import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

// Route handler for the faculty list page, with optional sorting
const facultyListPage = (req, res) => {
    const sortBy = req.query.sort || 'name';
    const facultyList = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty: facultyList,
        currentSort: sortBy
    });
};

// Route handler for individual faculty profile pages
const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const member = getFacultyById(facultyId);

    // Invalid faculty ID: send a 404 to the error handler
    if (!member) {
        const err = new Error(`Faculty member ${facultyId} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        title: member.name,
        faculty : member
    });
};

// Export both functions
export { facultyListPage, facultyDetailPage };