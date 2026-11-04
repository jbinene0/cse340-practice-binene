import { getCourseById, getSortedSections, getCoursesByDepartment, getCoursesByCredits } from '../../models/catalog/catalog.js';

// Route handler for the course catalog list page, with optional credit filter
const catalogPage = (req, res) => {
    const credits = req.query.credits;
    const courses = getCoursesByCredits(credits);

    res.render('catalog', {
        title: 'Course Catalog',
        courses: courses,
        currentCredits: credits || 'all'
    });
};

// Route handler for individual course detail pages
const courseDetailPage = (req, res, next) => {
    const courseId = req.params.courseId;
    const course = getCourseById(courseId);

    if (!course) {
        const err = new Error(`Course ${courseId} not found`);
        err.status = 404;
        return next(err);
    }

    const sortBy = req.query.sort || 'time';
    const sortedSections = getSortedSections(course.sections, sortBy);

    res.render('course-detail', {
        title: `${course.id} - ${course.title}`,
        course: { ...course, sections: sortedSections },
        currentSort: sortBy
    });
};

// Route handler for courses grouped by department
const departmentsPage = (req, res) => {
    const departments = getCoursesByDepartment();

    res.render('departments', {
        title: 'Courses by Department',
        departments: departments
    });
};

export { catalogPage, courseDetailPage, departmentsPage };