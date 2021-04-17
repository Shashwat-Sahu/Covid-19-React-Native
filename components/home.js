import React, { Component, useEffect, useState ,useCallback} from 'react';
import { Image, Dimensions } from 'react-native'
import {
  Container, Header, Left, Body, Right,
  Button, Icon, Title, Content, Text, Grid, Col, Row,
  List, ListItem
} from 'native-base';
import { BarChart } from 'react-native-chart-kit'
import YoutubePlayer from 'react-native-youtube-iframe'

const Home = ({ navigation }) => {
  const [country, setCountry] = useState([]);
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://api.covid19api.com/summary").then(res => res.json()).then(data => {
      setCountry(data);
      setLoading(false)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  return (
    <Container style={{ backgroundColor: "black" }}>
      <Content>
        <Grid>
          <Row>
            <Text style={{ fontSize: 40, color: "#ec407a", marginLeft: 10 }}>
              Covid-19
            </Text>
          </Row>
          <Row>
            <Col>
              <Button title="Go to Global" style={{backgroundColor:"#f50057",alignSelf:"center"}}
                onPress={() => navigation.navigate('Global')} ><Text>Countrywise Stats</Text>
              </Button>
            </Col>
            <Col>
              <Button style={{backgroundColor:"#f50057",alignSelf:"center"}} onPress={() => navigation.navigate('State')}><Text>Indian State Stats</Text></Button>
            </Col>
          </Row>
          <Row>
            <Col style={{ alignItems: "center" }}>
              {!isloading ? <BarChart
                data={{
                  labels: ["New Confirmed", "Total Confirmed", "New Deaths", "Total Deaths", "New Recovered", "Total Recovered"],
                  datasets: [
                    {
                      data: [
                        country.Global.NewConfirmed / 1000,
                        country.Global.TotalConfirmed / 1000,
                        country.Global.NewDeaths / 1000,
                        country.Global.TotalDeaths / 1000,
                        country.Global.NewRecovered / 1000,
                        country.Global.TotalRecovered / 1000
                      ]
                    }
                  ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={300}
                yAxisSuffix="k"
                yAxisInterval={1}// optional, defaults to 1
                verticalLabelRotation={90}
                xLabelsOffset={-120}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#757575",
                  backgroundGradientTo: "#000",
                  decimalPlaces: 1, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16

                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              /> : <Text>Loading</Text>}
            </Col>
          </Row>
          <Row>
            <Col>
              <Text style={{ fontSize: 50, color: "#29b6f6" }}>Measures</Text>
              <List>
                <ListItem style>
                  <Text style={{ color: "white", textAlign: "justify" }}>Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.
              Why? Washing your hands with soap and water or using alcohol-based hand rub kills viruses that may be on your hands.</Text>
                </ListItem>
                <ListItem>
                  <Text style={{ color: "white", textAlign: "justify" }}>Maintain at least 1 metre (3 feet) distance between yourself and others.
                  Why? When someone coughs, sneezes, or speaks they spray small liquid droplets from their nose or mouth which may contain virus. If you are too close, you can breathe in the droplets, including the COVID-19 virus if the person has the disease.
</Text>
                </ListItem>
                <ListItem>
                  <Text style={{ color: "white", textAlign: "justify" }}>Avoid going to crowded places.
                  Why? Where people come together in crowds, you are more likely to come into close contact with someone that has COIVD-19 and it is more difficult to maintain physical distance of 1 metre (3 feet).
</Text>
                </ListItem>
                <ListItem>
                  <Text style={{ color: "white", textAlign: "justify" }}>Avoid touching eyes, nose and mouth. Why? Hands touch many surfaces and can pick up viruses. 
                  Once contaminated, hands can transfer the virus to your eyes, nose or mouth. From there, the virus can enter your body and infect you.
</Text>
                </ListItem>
                <ListItem>
                  <Text style={{ color: "white", textAlign: "justify" }}>Make sure you, and the people around you, follow good respiratory hygiene. This means covering your mouth and nose with your bent elbow or tissue when you cough or sneeze. Then dispose of the used tissue immediately and wash your hands. Why? Droplets spread virus. 
                  By following good respiratory hygiene, you protect the people around you from viruses such as cold, flu and COVID-19.
</Text>
                </ListItem>
                <ListItem>
                  <Text style={{ color: "white", textAlign: "justify" }}>Stay home and self-isolate even with minor symptoms such as cough, headache, mild fever, until you recover. Have someone bring you supplies. If you need to leave your house, 
                  wear a mask to avoid infecting others. Why? Avoiding contact with others will protect them from possible COVID-19 and other viruses.</Text>
                </ListItem>
              </List></Col>
          </Row>
          {/* <Row>
            <Col style={{ alignItems: "center" }}>
              <Image source={{ uri: 'https://cdn.glitch.com/20457a5a-d27c-489c-a282-348e43dc34e6%2Fcovid1.png?v=1590472756966' }} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
            </Col>
          </Row> */}
          <Row style={{marginTop:10}}>
            <Col>
            <YoutubePlayer
            
        height={250}
        play={playing}
        videoId={"WE1KYyisKGs"}
        onChangeState={onStateChange}
      />
          <YoutubePlayer
            
            height={250}
            play={playing}
            videoId={"xf1HULn7tuI"}
            onChangeState={onStateChange}
          />
              <YoutubePlayer
            
            height={250}
            play={playing}
            videoId={"Kh2mUBNLjj8"}
            onChangeState={onStateChange}
          />
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  )
}

export default Home;