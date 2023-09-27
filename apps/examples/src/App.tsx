import { Zoom } from '../../../library/'
import './App.css'

export default function App() {

  return (
    <>
      <Zoom duration={1200}>
        <h1 className='text-red-500 text-4xl font-bold'>Hi there </h1>
      </Zoom>
    </>
  )
}