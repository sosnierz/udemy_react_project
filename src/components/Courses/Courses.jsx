import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import Course from './subcomponents/Course'


import { default as CoursesStyles } from './Courses.module.scss';


import { StoreContext } from '../../store/StoreProvider';

const style = bemCssModules(CoursesStyles);


const Courses = () => {
const { courses } = useContext(StoreContext)

const coursesElements = courses.map(course =><Course key={course.id} {...course} />)
    return (  
        <section className={style()}>
            <h2 className={style('title')}>Lista kursów</h2>
            <ul className={style('list')}>
                {coursesElements}
            </ul>
        </section>
    );
}
 
export default Courses;