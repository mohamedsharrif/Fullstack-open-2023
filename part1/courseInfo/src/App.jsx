import React from 'react';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  const Header = (props) => {
    return <h1>{props.course.name}</h1>; 
  };

  const Part = ({ part }) => {
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    );
  };

  const Content = ({ parts }) => {
    return (
      <>
        <Part part={parts[0]} /> 
        <Part part={parts[1]} />
        <Part part={parts[2]} />
      </>
    );
  };

  const Total = ({ parts }) => {
    const totalExercises = parts[0].exercises + parts[1].exercises + parts[2].exercises; 
    return <p>Number of exercises {totalExercises}</p>;
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;


