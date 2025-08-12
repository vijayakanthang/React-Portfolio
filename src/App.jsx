import React from 'react'
import NavigationBar from './components/NavigationBar'
import HeroPage from './pages/HeroPage'
import About from './pages/AboutPage'
import ProjectPage from './pages/ProjectPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <div>
    <NavigationBar/>
    <HeroPage/>
    <About/>
    <ProjectPage/>
    <ContactPage/>
    </div>
  )
}

export default App