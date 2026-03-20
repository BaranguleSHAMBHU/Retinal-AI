import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Dataset from './components/Dataset'
import Models from './components/Models'
import Prediction from './components/Prediction'
import Performance from './components/Performance'
import EdgeDeployment from './components/EdgeDeployment'
import Applications from './components/Applications'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Dataset />
        <Models />
        <Prediction />
        <Performance />
        <EdgeDeployment />
        <Applications />
      </main>
      <Footer />
    </>
  )
}