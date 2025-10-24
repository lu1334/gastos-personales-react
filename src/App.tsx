import { Routes,Route } from "react-router-dom"
import { Layout } from "./components/layout/layout"
import { Formulario } from "./components/Formulario"

function App() {


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="formulario" element={<Formulario/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
