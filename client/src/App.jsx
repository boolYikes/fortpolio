import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import SideBar from './components/SideBar'

const App = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.2 }
    )
    elements.forEach((el) => observer.observe(el))
  }, [])

  return (
    <div className='App'>
      <header className='header'>
        <h1 className='glitch' data-text='Welcome'>Welcome</h1>
        <p className='tagline'>To Bleh</p>
      </header>

      <section className='section neon-box' id='about'>
        <h2>About moi</h2>
        <p>
          I&rsquo;m a developer with a flair for visually engaging websites lol
        </p>
      </section>

      <section className='section neon-box' id='projects'>
        <h2>Projects</h2>
        <div className='projects-grid'>
          <div className='projects-card'>Project 1</div>
          <div className='projects-card'>Project 2</div>
          <div className='projects-card'>Project 3</div>
        </div>
      </section>

      <section className='section neon-box' id='contact'>
        <h2>Get In Touch</h2>
        <a href='mailto:tunacome@gmail.com' className='neon-button'>Contact Me</a>
      </section>
    </div>
  )
}

export default App
