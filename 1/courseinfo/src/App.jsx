const Header = (course) => {
    return (
        <h1>{course.course}</h1>
    )
}

const Content = (parts) => {

    return (
        <div>
            <p>
                {parts.parts[0].partName} {parts.parts[0].exercises}
            </p>
            <p>
                {parts.parts[1].partName} {parts.parts[1].exercises}
            </p>
            <p>
                {parts.parts[2].partName} {parts.parts[2].exercises}
            </p>
        </div>
    )
}

const Total = (parts) => {
    return (
        <p>Number of exercises {parts.parts[0].exercises + parts.parts[1].exercises +parts.parts[2].exercises}</p>
    )
}


const App = () => {

    const course = 'Half Stack application development'

    const parts = [
        {
            partName: 'Fundamentals of React',
            exercises: 10
        },
        {
            partName: 'Using props to pass data',
            exercises: 7
        },
        {
            partName: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header course={course}/>
            <Content parts={parts}/>
            <Total parts={parts}/>

        </div>
    )
}

export default App