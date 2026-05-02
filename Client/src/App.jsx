import './App.css'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Input } from './components/ui/input'

function App() {

  return (
    <div className='max-w-full flex justify-center items-center h-screen'>
      <Card className='p-4'>
        <Input></Input>
        <Button>Button</Button>
      </Card>
    </div>
  )
}

export default App
