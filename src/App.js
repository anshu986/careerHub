import { connect } from 'react-redux';
import { BrowserRouter as Router ,Routes,Route, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import { getUserAuth } from './actions';
function App(props) {
  useEffect(()=>{
    props.getUserAuth();
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<> <Header/><Home/></>}>
        </Route>
       
      </Routes>
    </Router>
    
  );
}
const mapStateToProps=(state)=>{
  return {}
}

const mapDispatchToProps=(dispatch)=>({
  getUserAuth:()=>dispatch(getUserAuth()),
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
