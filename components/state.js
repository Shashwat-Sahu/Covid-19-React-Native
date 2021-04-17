import React, { Component, useEffect, useState } from 'react';
import { Image, Dimensions } from 'react-native'
import {
  Container, Header, Left, Body, Right,
  Button, Icon, Title, Content, Text, Grid, Col, Row,
  List, ListItem, Form, Picker
} from 'native-base';
import { ProgressChart } from 'react-native-chart-kit'

const State = () => {
  const [state, stateData] = useState([]);
  const [selectedstate, setselectedstate] = useState({})
  const [districtwise, setdistrictwise] = useState([])
  const [districtwisestate, setdistrictwisestate] = useState([])
  const [date,setDate] = useState("");
  useEffect(() => {
    fetch('https://api.covidindiatracker.com/state_data.json').then(res => res.json()).then(data => {
      stateData(data);
    }).catch(err => console.log(err))
  }, [])
  useEffect(() => {
    fetch('https://api.covid19india.org/state_district_wise.json').then(res => res.json()).then(data => {
      setdistrictwise(data)
    }).catch(err => console.log(err))
  }, [])

  useEffect(()=>{
    setInterval(() => {
      var d = new Date();
      setDate(d+"");  
    }, 1000);
    
  },[])
  const onValueChange = (value) => {

    setselectedstate(value)
    var distname = []
    Object.keys(districtwise[value.state].districtData).forEach(element => {
      var res = { "name": element, "data": districtwise[value.state].districtData[element] }
      distname.push(res)
    });
    setdistrictwisestate(distname)
  }
  return (<Container style={{ backgroundColor: "black" }}>
    <Content>
      <Grid>
        <Row>
          <Col>
            <Form style={{backgroundColor:"white"}}>
              <Picker
                mode="dropdown"
                iosHeader="Select"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined ,color:"black"}}

                onValueChange={onValueChange.bind(this)}
              >
                <Picker.Item label="Select State" enable={false} />
                {
                  state.map(item => {

                    return (
                      <Picker.Item label={item.state} value={item} key={item.id} />
                    )
                  })
                }
              </Picker>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 50, color: "white" }}>
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
            <Text style={{ color: "white", fontWeight: "700", fontSize: 23 }}>{selectedstate.deaths}</Text>
          </Col>
        </Row>
        <Row><Col style={{ alignItems: "center" }}><Text style={{ fontSize: 30, margin: 20, color: "white" }}>District Wise Data</Text></Col></Row>
        <Row style={{ backgroundColor: "#343a40" }}>
          <Col style={{ alignItems: "center", padding: 10 }}>
            <Text style={{ color: "white", fontWeight: "700" }}>District</Text>
          </Col>
          <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white", fontWeight: "700" }}>Active</Text></Col>
          <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white", fontWeight: "700" }}>Confirmed</Text></Col>
          <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white", fontWeight: "700" }}>Deaths</Text></Col>
        </Row>
        {
          districtwisestate.map(item => {

            return (
              <Row style={{ backgroundColor: "#343a40", borderBottomWidth: 1 }}>

                <Col style={{ alignItems: "center", padding: 10 }}>
                  <Text style={{ color: "white", textAlign: "center", fontSize: 10 }}>{item.name}</Text>

                </Col>
                <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white" }}>{item.data.active>0?item.data.active:0}</Text></Col>
                <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white" }}>{item.data.confirmed>0?item.data.confirmed:0}</Text></Col>
                <Col style={{ alignItems: "center", padding: 10 }}><Text style={{ color: "white" }}>{item.data.deceased>0?item.data.deceased:0}</Text></Col>
              </Row>

            )
          })
        }
      </Grid>
    </Content>
  </Container>)
}

export default State;