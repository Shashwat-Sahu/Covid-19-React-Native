import React, { Component,useState } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content,Text } from 'native-base';

const Navbar = ()=>{
  
  return (
    <>
      <Header style={{backgroundColor:"#000"}} androidStatusBarColor="black" iosBarStyle="light-content">
        
        <Body>
          <Title>Covid Stats</Title>
        </Body>
       
      </Header>
      
    </>
  );
}

export default Navbar;