import * as React from 'react';
import './App.css';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Client, FriendRatingDTO } from './Store/API';
import Card, { CardContent } from 'material-ui/Card';

const logo = require('./logo.svg');
interface AppState {
  data: FriendRatingDTO[] | null;
}
interface AppProps {
  classes: { card: string, content: string, cardContainer: string }
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this._apiClient = new Client();

    this.state = {
      data: null
    };
  }

  private _apiClient: Client;

  componentDidMount() {
    this._apiClient.getFriendRatingsUsingGET()
      .then(value => {
        if (value) {
          this.setState({
            data: value
          });
        }
      });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className={this.props.classes.cardContainer}>
        {data && data.map(value => {
          return (
            <Card key={value.id} className={this.props.classes.card}>
              <CardContent className={this.props.classes.content}><div>Name:</div><div>{value.summonerName}</div></CardContent>
              <CardContent className={this.props.classes.content}><div>Games played:</div><div>{value.gamesPlayed}</div></CardContent>
              <CardContent className={this.props.classes.content}><div>Rating:</div><div>{value.rating}</div></CardContent>
            </Card>
          );
        })}
        </div>
      </div>
    );
  }
}

const styleSheet = createStyleSheet({
  card: {
    margin: "10px",
    flex: "0 0 50%",
    width: "200px",
    background: "grey"
  },
  content: {
    display: "flex",
    flexDirection: "row"
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

export default withStyles(styleSheet)(App);
