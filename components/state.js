import React, { Component, useEffect, useState } from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native'
import {
  Container, Header, Left, Body, Right,
  Button, Icon, Title, Content, Text, Grid, Col, Row,
  List, ListItem, Form, Picker
} from 'native-base';
import { ProgressChart } from 'react-native-chart-kit'

const State = () => {
  const [data,setData] = useState({})
  const [state, stateData] = useState([]);
  const [selectedstate, setselectedstate] = useState({})
  const [districtwise, setdistrictwise] = useState([])
  const [districtwisestate, setdistrictwisestate] = useState([])
  const [date,setDate] = useState("");
  useEffect(() => {
    fetch('https://api.covid19india.org/state_district_wise.json').then(res => res.json()).then(data => {
      console.log(Object.keys(data));
      stateData(Object.keys(data))
      setData(data)
    }).catch(err => console.log(err))
  }, [])

  useEffect(()=>{
    setInterval(() => {
      var d = new Date();
      setDate(d+"");  
    }, 1000);
    
  },[])
  const onValueChange = (value) => {
    var districtwise = [],active=0,confirmed=0,deceased=0;
    Object.keys(data[value].districtData).forEach(district=>{
      
      districtwise=[...districtwise,{
        district:district,
        active:data[value].districtData[district].active,
        confirmed:data[value].districtData[district].confirmed,
        deceased:data[value].districtData[district].deceased
      }
    ]
    active+=data[value].districtData[district].active
    confirmed+=data[value].districtData[district].confirmed
    deceased+=data[value].districtData[district].deceased
    })
    setselectedstate({
      state:value,
      active,
      confirmed,
      deceased,
      districtwise
    })
  }
  return (
  <Container style={style.Container}>
    <Content>
      <Grid>
        <Row>
          <Col>
            <Form>
              <Picker
                mode="dropdown"
                iosHeader="Select"
                iosIcon={<Icon name="arrow-down" />}
                style={{ color:"black"}}

                onValueChange={onValueChange.bind(this)}
              >
                <Picker.Item label="Select State" enable={false} key={'select state'} />
                {
                  state.map(item => {

                    return (
                      <Picker.Item label={item} value={item} key={item.id} />
                    )
                  })
                }
              </Picker>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 30, color: "white" }}>
              {selectedstate.state?selectedstate.state:"Select State"}
            </Text>
            
            <Text style={{color:"white",marginBottom:10}}>{date}</Text>
          </Col>
        </Row>
        <Row>
          <Col style={{ alignItems: "center", backgroundColor: "#17a2b8", padding: 10 }}>
            <Text style={{ color: "white", fontSize: 20 }}>Active</Text>
            <Image source={{ uri: "https://cdn.glitch.com/20457a5a-d27c-489c-a282-348e43dc34e6%2Ficon-infected.png?v=1590593297316" }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
            <Text style={{ color: "white", fontWeight: "700", fontSize: 23 }}>{selectedstate.active}</Text>
          </Col>
          <Col style={{ alignItems: "center", backgroundColor: "#28a745", padding: 10 }}>
            <Text style={{ color: "white", fontSize: 20 }}>Confirmed</Text>
            <Image source={{ uri: "https://cdn.glitch.com/20457a5a-d27c-489c-a282-348e43dc34e6%2Ficon-inactive.png?v=1590593297316" }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
            <Text style={{ color: "white", fontWeight: "700", fontSize: 23 }}>{selectedstate.confirmed}</Text>
          </Col>
          <Col style={{ alignItems: "center", backgroundColor: "#dc3545", padding: 10 }}>
            <Text style={{ color: "white", fontSize: 20 }}>Deaths</Text>
            <Image source={{ uri: "https://cdn.glitch.com/20457a5a-d27c-489c-a282-348e43dc34e6%2Ficon-death.png?v=1590593297316" }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
            <Text style={{ color: "white", fontWeight: "700", fontSize: 23 }}>{selectedstate.deceased}</Text>
          </Col>
        </Row>
        <Row><Col style={{ alignItems: "center" }}><Text style={{ fontSize: 30, margin: 20, color: "white" }}>District Wise Data</Text></Col></Row>
        <Row style={{ backgroundColor: "#343a40" }} >
          <Col style={{ alignItems: "center", padding: 10 }}>
            <Text style={{ color: "white", fontWeight: "700" }}>District</Text>
          </Col>
          <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white", fontWeight: "700" }}>Active</Text></Col>
          <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white", fontWeight: "700" }}>Confirmed</Text></Col>
          <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white", fontWeight: "700" }}>Deaths</Text></Col>
        </Row>
        {
          selectedstate.districtwise?selectedstate.districtwise.map(item => {

            return (
              <Row style={{ backgroundColor: "#343a40", borderBottomWidth: 1 }} key={item.district}>

                <Col style={{ alignItems: "center", padding: 10 }}>
                  <Text style={{ color: "white", textAlign: "center", fontSize: 10 }}>{item.district}</Text>

                </Col>
                <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white" }}>{item.active>0?item.active:0}</Text></Col>
                <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white" }}>{item.confirmed>0?item.confirmed:0}</Text></Col>
                <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white" }}>{item.deceased>0?item.deceased:0}</Text></Col>
              </Row>

            )
          }):null
        }
      </Grid>
    </Content>
  </Container>)
}

export default State;

const style = StyleSheet.create({
  Container:{
    backgroundColor:'#282828'
  }
})