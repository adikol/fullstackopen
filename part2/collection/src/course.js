import React from 'react'

const Header = ({course}) => {
  return (
    <>
    <h1>{course.name}</h1>
    </>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
    </div>
  )
}

const Sum = ({course}) => {
  return (
    <b>
      {"total of " + course.parts.reduce((sum, part) => sum + part.exercises, 0) + " exercises" }
    </b>
  )
}

const Course = ({courses}) => {
  return (
    <div>
      {courses.map(c => <div key={c.id}> <Header course={c}/> <Content course={c}/> <Sum course={c} />  </div>)}
    </div>
  )
}

export default Course