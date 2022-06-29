
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Error, GetFlights, CreateFlights, UpdateFlights } from "./pages";
import { AppNav } from './features';
// this is a function-based component
const App = () => {



  return (
    <>

    { /* everything inside of BrowserRouter is going to be managed by react-router-dom so that it can toggle between pages} */ }
      <BrowserRouter>
        <AppNav/>

        <Routes>
            {/* route to landing page if browser URL becomes '/' */}
            <Route path="/" element={<GetFlights/>}></Route>
            <Route path="/new" element={<CreateFlights/>}></Route>
            <Route path="/update" element={<UpdateFlights/>}></Route>
            {/* route anything else to the error page */}
            <Route path="*" element={<Error/>}></Route>
        </Routes>

      </BrowserRouter>


    </>
  );
}


export default App;
// default vs. regular exports
// regular exports can export as many as you'd like. but you have to do import { App } from <path>
// default exports let you do import App from <path> note there are no { }

// you can mix the two. import App, { a } from <path>, can also rename like import App { a as A }
