const Header = (course) => {
    return (
        <h1>{course.course.name}</h1>
    )
}

const Part = (part) => {
    return <p>{part.part.name} {part.part.exercises}</p>
}


const Content = (parts) => {
    return (
        <div>
            <Part part={parts.parts.parts[0]}/>
            <Part part={parts.parts.parts[1]}/>
            <Part part={parts.parts.parts[2]}/>
        </div>
    )
}

const Total = (parts) => {
    return (
        <p>Number of exercises {parts.parts.parts[0].exercises + parts.parts.parts[1].exercises + parts.parts.parts[2].exercises}</p>
    )
}


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
    }


    return (
        <div>
            <Header course={course}/>
            <Content parts={course}/>
            <Total parts={course}/>
        </div>
    )
}

export default App