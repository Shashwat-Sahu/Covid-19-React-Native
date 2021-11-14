import React, { Component,useState } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content,Text,Footer } from 'native-base';

const Navbar = ()=>{
  
  return (
    <>
      <Footer style={{backgroundColor:"white",alignItems:"center"}}>
        
       <Text>Developed By Shashwat {'&'} Prahlad</Text>
      </Footer>
      
    </>
  );
}

export default Navbar;