import React, { Component, useEffect, useState } from 'react';
import { Image, Dimensions } from 'react-native'
import {
  Container, Header, Left, Body, Right,
  Button, Icon, Title, Content, Text, Grid, Col, Row,
  List, ListItem, Form, Picker
} from 'native-base';
import { ProgressChart } from 'react-native-chart-kit'

function precise(x) {
  return Number.parseFloat(x).toPrecision(2);
}

const Global = () => {
  const [country, setCountry] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [countryData, setcountryData] = useState({});
  const [countryDataPercent, setcountryDataPercent] = useState([]);
  const [date,setDate] = useState("");
  useEffect(()=>{
    setInterval(() => {
      var d = new Date();
      setDate(d+"");  
    }, 1000);
    
  },[])
  useEffect(() => {
    fetch("https://api.covid19api.com/summary").then(res => res.json()).then(data => {

      setCountry(data.Countries);
      setLoading(false)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  var sum;
  const onValueChange = (value) => {
    setcountryData(value);
    sum = value.TotalConfirmed 
    setcountryDataPercent([value.NewConfirmed / sum, value.TotalConfirmed / sum, value.NewDeaths / sum, value.TotalDeaths / sum, value.NewRecovered / sum, value.TotalRecovered / sum])

  }
  return (
    <Container style={{ backgroundColor: "black" }}>
      <Content>
        <Grid>
          <Row>
            <Col>
              <Form style={{ backgroundColor: "white" }}>
                <Picker
                  mode="dropdown"
                  iosHeader="Select"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  onValueChange={onValueChange.bind(this)}
                >
                  
                <Picker.Item label="Select Country" enable={false} />
                  {
                    country.map(item => {

                      return (
                        <Picker.Item label={item.Country} value={item} key={item.CountryCode} />
                      )
                    })
                  }
                </Picker>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col style={{ alignItems: "center" }}>
              {!isloading ?
                <ProgressChart
                  data={{
                    labels: ["NewConfirmed", "TotalConfirmed", "New Deaths", "Total Deaths", "New Recovered", "Total Recovered"],
                    data: countryDataPercent
                  }}
                  width={Dimensions.get("window").width + 2} // from react-native
                  height={300}
                  style={{
                    borderRadius: 20,
                    marginTop:20
                  }}
                  strokeWidth={1}
                  radius={3}
                  chartConfig={{
                    backgroundGradientFrom: "#3949ab",
                    backgroundGradientFromOpacity: 0.4,
                    backgroundGradientTo: "#1a237e",
                    backgroundGradientToOpacity: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    strokeWidth: 1, // optional, default 3
                    useShadowColorFromDataset: false
                  }}
                />
                : <Text></Text>}
            </Col>
          </Row>
          <Row>
            <Col style={{alignItems:"center"}}>
            <Text style={{ fontSize: 30, fontWeight: "700", color: "#42a5f5", marginBottom: 10, marginTop: 10 }}>
              {countryData.Country?countryData.Country:"Select Country"} 
            </Text>
                <Text style={{color:"white",marginBottom:10}}>{date}</Text>
            </Col>
          </Row><Row>
            <Col style={{ alignItems: "center" }}>

              <Row>
                <Col style={{ backgroundColor: "#ab47bc", padding: 10 }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    New Confirmed
                    </Text>
                </Col>
                <Col style={{ backgroundColor: "#ec407a", padding: 10 }}>

                  <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}>
                    {countryData.NewConfirmed} ({precise(countryDataPercent[0]*100)}%)
                  </Text>

                </Col>
              </Row>
              <Row>
                <Col style={{ backgroundColor: "#9c27b0", padding: 10 }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Total Confirmed
                    </Text>
                </Col>
                <Col style={{ backgroundColor: "#e91e63", padding: 10 }}>
                  <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}>
                    {countryData.TotalConfirmed} 
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col style={{ backgroundColor: "#8e24aa", padding: 10 }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    New Deaths
                    </Text>
                </Col>
                <Col style={{ backgroundColor: "#d81b60", padding: 10 }}>
                  <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}> 
                  {countryData.NewDeaths} ({precise(countryDataPercent[2]*100)}%)
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col style={{ backgroundColor: "#7b1fa2", padding: 10 }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Total Deaths
                    </Text>
                </Col>
                <Col  style={{ backgroundColor: "#c2185b", padding: 10 }}>
                  <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}>
                    {countryData.TotalDeaths} ({precise(countryDataPercent[3]*100)}%)
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col style={{ backgroundColor: "#6a1b9a", padding: 10 }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    New Recovered
                    </Text>
                </Col>
                <Col style={{ backgroundColor: "#ad1457", padding: 10 }}>
                  <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}>
                    {countryData.NewRecovered} ({precise(countryDataPercent[4]*100)}%)
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col style={{ backgroundColor: "#4a148c", padding: 10 }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Total Recovered
                    </Text>
                </Col>
                <Col style={{ backgroundColor: "#880e4f", padding: 10 }}>
                  <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}>
                    {countryData.TotalRecovered} ({precise(countryDataPercent[5]*100)}%)
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  )
}

export default Global;