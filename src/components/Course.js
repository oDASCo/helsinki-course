import React from 'react';

const Course = ({course}) => {
    return (
        <div>
            <h2>{course.name}</h2>
            <ul>
                {course.parts.map((part) =>
                    <li key={part.id}>{part.name} <i>{part.exercises}</i></li>
                )}
            </ul>
            <p> Total:
                {course.parts.reduce((sum, item) => {
                sum += +item.exercises;
                return sum;
            }, 0)}
            </p>
        </div>
    )
};

export default Course;
