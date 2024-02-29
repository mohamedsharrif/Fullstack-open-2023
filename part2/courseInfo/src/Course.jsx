const Course = ({ course }) => {
    const Header = ({ course }) => {
      return <h2>{course.name}</h2>;
    };
  
    const Content = ({ parts }) => {
      const total = parts.reduce((s, p) => {
        return s + p.exercises;
      }, 0);
  
      return (
        <>
          {parts.map((part) => {
            return (
              <div key={part.id}>
                <p>
                  {part.name} {part.exercises}
                </p>
              </div>
            );
          })}
          <h3>total of {total} exercises</h3>
        </>
      );
    };
  
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
      </div>
    );
  };
  
  export default Course