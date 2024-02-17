const Header = ({name}) => {
    return <h2>{name}</h2>;
}

const Part = ({name, exercises}) => (
    <p>{name} {exercises}</p>
)

const Content = ({parts}) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </>
    )
}

const Total = ({parts}) => {


    const total = parts.reduce(
        (acc, cur) => acc + cur.exercises,
        0,
    );

    return (
        <p><b>total of {total} exercises</b></p>
    )
}

const Course = ({course}) => {

    return (
        <>
            <Header name={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </>

    )
}

export default Course