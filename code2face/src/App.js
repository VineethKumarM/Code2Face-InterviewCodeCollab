import './App.css';
import React,{createContext, useReducer} from 'react';
import {Route , BrowserRouter as Router,Routes} from 'react-router-dom'
import { initialState, reducer } from './reducers/userReducer';
import 'react-bootstrap'
//components and pages
import MyNavbar from './components/navbar';
import Home from './pages/home';
import NotFound from './pages/NotFound';
// import Testing from './pages/testing';
import { Toaster } from 'react-hot-toast';
import Slides from './pages/slides';
import AddSlides from './pages/addSlides';
import PeerCall from './pages/peerCall';
import Motivation from './pages/motivation';
import Features from './pages/features';
import Footer from './components/footer';

export const UserContext = createContext();

function App() {


	const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <UserContext.Provider value={{state,dispatch}}>
            <div>
                <Toaster 
                    position='top-right'
                />
            </div>
            <Router >
                <div className='wrapper' >

                <div className='App'>
                    <MyNavbar/>
                    <div className='content d-flex'>
                        <Routes>
                                <Route eaxct path="/" element={<Home/>} />
                                {/* <Route exact path="/call/:roomId" element={<CallPage/>} /> */}
                                <Route exact path="/call/:roomId" element={<PeerCall/>} />
                                <Route exact path='/slides' element={<Slides/>} />
                                <Route exact path='/add' element={<AddSlides/>} />
                                {/* <Route path="/chat" element={<Chat/>} /> */}
                                <Route exact path='/motivation' element={<Motivation />} />
                                {/* <Route exact path='/features' element={<Features />} /> */}
                                <Route path="*" element={<NotFound/>} />
                        </Routes>
                    </div>
		        </div>
                     
                </div>
            </Router>
         </UserContext.Provider>
		
	
	);
}

export default App;
