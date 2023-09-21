
import './App.css';
import { Home } from './components/Home';
import { Issue } from './components/Issue';
import { NewIssue } from './components/NewIssue';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home />}/>
          <Route path='/newIssue' element={ <NewIssue/>}/>
          <Route path='/issue/description/:id' element={ <Issue/>}/>
         
          
        </Routes>
      
      </BrowserRouter>
      

    </div>
  );
}

export default App;
