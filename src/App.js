import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

const bbcApi = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=4409ce01cb3b401cbbb6886ecb3e3a73"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // the number of columns of the masonry structure, changes with window width
      columnNum: 4,
      // Array of article entries
      // articles: bbcObj["articles"]  // test: static local data
      articles: []
    };
    this.loadArticles();
  }

  // add event listener for responsive columns
  componentDidMount(){
    // this.loadArticles();
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.onWindowResize.bind(this));
  }

  onWindowResize(){
    var winWidth = window.innerWidth;
    if (winWidth<800) {
      this.setState({columnNum:2});
    }
    else if(winWidth<1050){
      this.setState({columnNum:3});
    }
    else {
      this.setState({columnNum:4});
    }
  }

  // updateStream(){
  //   var articles = this.state.articles;
  //   var columns = document.getElementsByClassName("column");
  //   var columnLists = [];
  //   for (let i = 0; i < this.state.columnNum; i++) {
  //     columnLists.push(new Array());
  //   }
  //   for (let n = 0; n < articles.length; n++) {
  //     var current = 0;
  //     var minHeight = columns[0].offsetHeight;
  //     for (let i = 0; i < columns.length; i++) {
  //       if (minHeight > columns[i].offsetHeight) {
  //         minHeight = columns[i].height();
  //         current = i;
  //       }
  //     }
  //     columnLists[current].push(articles[n]);
  //   }
  //   return columnLists;
  // }

  // ajax request news from api
  loadArticles(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        let newsObj = JSON.parse(xmlhttp.responseText);
        this.setState({articles: this.state.articles.concat(newsObj["articles"])});
      }
    }.bind(this)  // bind(this), or this in func will point to xmlhttp
    xmlhttp.open("GET",bbcApi,true);
    xmlhttp.send();
  }

  // rearrange the columns in the stream
  // add newsItem to column 1 - 4 in order, no column length control
  updateStream(){
    var articles = this.state.articles;
    // var columns = document.getElementsByClassName("column");
    var columnLists = [];
    for (let i = 0; i < this.state.columnNum; i++) {
      columnLists.push(new Array());
    }
    for (let n = 0; n < articles.length; n++) {
      // var current = 0;
      columnLists[n%this.state.columnNum].push(articles[n]);
    }
    return columnLists;
  }

  render() {
    return (
      <div className="App">
        <header>NewsFeed</header>
        <FeedStream 
          columnNum={this.state.columnNum}
          columnLists={this.updateStream()}
        />
        <button className="Load-btn" onClick = {this.loadArticles.bind(this)}>Load More</button>
      </div>
    );
  }
}

// 
// props.columnNum
// props.columnLists
class FeedStream extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var columns = [];
    for (let i = 0; i < this.props.columnNum; i++) {
      columns.push(<Column columnList={this.props.columnLists[i]}/>)
    }
    return (
      <div className="Feed-stream">
        {columns}
      </div>
    );
  }
}

// props.columnList:
// list of newsItems for this column
class Column extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    var columnList = this.props.columnList;
    var newsItems = columnList.map(function(article){
      return(
        <NewsItem
          url = {article.url}
          urlToImage = {article.urlToImage}
          title = {article.title}
          description = {article.description}
          mediaName = {article.source.name}
        />
      );
    });
    return(
      <div class="Column">
        {newsItems}
      </div>
    );
  }

}

//props.url, .urlToImage, .title, .description, .mediaName
class NewsItem extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="News-item">
        <a href={this.props.url}>
          <img src={this.props.urlToImage} alt=""/>
          <h2>{this.props.title}</h2>
          <p>{this.props.description}</p>
          <p>From {this.props.mediaName}</p>
        </a>
      </div>
    );
  }
}


var bbcObj = {
  "status": "ok",
  "totalResults": 10,
  "articles": [
  {
  "source": {
  "id": "bbc-news",
  "name": "BBC News"
  },
  "author": "BBC News",
  "title": "'I went vegan to hide my eating disorder'",
  "description": "Veganism is definitely having a moment, and for Rebecca Hills, 20, it was a way of hiding in plain sight.",
  "url": "http://www.bbc.co.uk/news/stories-47176759",
  "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/06FB/production/_105578710_p070cns1.jpg",
  "publishedAt": "2019-02-10T00:13:19Z",
  "content": null
  },
  {
  "source": {
  "id": "bbc-news",
  "name": "BBC News"
  },
  "author": "BBC News",
  "title": "How school yearbooks have the power to destroy lives",
  "description": "It has been a tradition in the US for decades - but recent events have highlighted their dark side.",
  "url": "http://www.bbc.co.uk/news/world-us-canada-47145908",
  "urlToImage": "https://ichef.bbci.co.uk/images/ic/1024x576/p06ztfpp.jpg",
  "publishedAt": "2019-02-09T23:51:55Z",
  "content": "Media captionGovernor Northam: I am not the person in that photo\r\nThere are many ways to bring down an opponent, but up until a few months ago, who would have thought a school yearbook would be quite such an effective tool?\r\nBut time and time again, old schoo… [+5602 chars]"
  },
  {
  "source": {
  "id": "bbc-news",
  "name": "BBC News"
  },
  "author": "BBC News",
  "title": "Shut detention camps, Turkey tells China",
  "description": "The statement follows the reported death in a camp of a prominent musician from the Uighur minority.",
  "url": "http://www.bbc.co.uk/news/world-asia-47187170",
  "urlToImage": "https://ichef.bbci.co.uk/images/ic/1024x576/p05wv9gj.jpg",
  "publishedAt": "2019-02-09T23:34:25Z",
  "content": "Media captionJohn Sudworth reports from Xinjiang, where one million Uighurs have reportedly been detained\r\nTurkey has called on China to close its detention camps following the reported death of a renowned musician from the ethnic Uighur minority.\r\nAbdurehim … [+2995 chars]"
  },
  {
  "source": {
  "id": "bbc-news",
  "name": "BBC News"
  },
  "author": "BBC News",
  "title": "Prince Philip, 97, gives up driving licence",
  "description": "The Duke of Edinburgh is to voluntarily give up his driving licence, Buckingham Palace says.",
  "url": "http://www.bbc.co.uk/news/uk-47186875",
  "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/1478F/production/_105255838_9d5c5166-7d64-47c8-9a7a-04e3becff7c3.jpg",
  "publishedAt": "2019-02-09T21:05:31Z",
  "content": "Image copyrightAlbanpixImage caption\r\n Prince Philip was seen driving a replacement Land Rover two days after the crash\r\nThe Duke of Edinburgh is to voluntarily give up his driving licence, Buckingham Palace has said.\r\nIt comes after the 97-year-old duke apol… [+4385 chars]"
  },
  {
  "source": {
  "id": "bbc-news",
  "name": "BBC News"
  },
  "author": "BBC Sport",
  "title": "Southampton fans caught making Emiliano Sala Cardiff City taunts",
  "description": "Southampton plan to ban two supporters who taunted Cardiff City fans about the death of striker Emiliano Sala.",
  "url": "http://www.bbc.co.uk/sport/football/47187084",
  "urlToImage": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/D14A/production/_105587535_sala_t.jpg",
  "publishedAt": "2019-02-09T20:51:11Z",
  "content": "Media playback is not supported on this device\r\nEmiliano Sala: Cardiff and Southampton observe minute's silence for Argentine forward\r\nSouthampton plan to ban two supporters who taunted Cardiff City fans about the death of striker Emiliano Sala.\r\nThe 28-year-… [+1004 chars]"
  },
  {
  "source": {
  "id": "bbc-news",
  "name": "BBC News"
  },
  "author": "BBC News",
  "title": "Warren launches White House 2020 bid",
  "description": "Mr Trump's campaign team responds by calling her a fraud and saying her ideas are socialist.",
  "url": "http://www.bbc.co.uk/news/world-us-canada-47185724",
  "urlToImage": "https://ichef.bbci.co.uk/images/ic/1024x576/p070ggf2.jpg",
  "publishedAt": "2019-02-09T19:37:57Z",
  "content": "Media captionElizabeth Warren: 'This is the fight of our lives... to build an America that works for everyone'\r\nUS Senator Elizabeth Warren has formally launched her bid to stand for the White House in 2020 with a speech in which she promised to tackle econom… [+2339 chars]"
  },
  {
  "source": {
  "id": "bbc-news",
  "name": "BBC News"
  },
  "author": "BBC News",
  "title": "'Yellow vest' protester loses fingers",
  "description": "A rubber pellet grenade injures a protester's hand as thousands take to the streets again in France.",
  "url": "http://www.bbc.co.uk/news/world-europe-47185279",
  "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/17938/production/_105586569_mediaitem105586568.jpg",
  "publishedAt": "2019-02-09T18:18:51Z",
  "content": "Image copyrightAFPImage caption\r\n Police officers throw tear gas grenades in Paris during the 13th consecutive demonstration by the \"yellow vests\"\r\nA \"yellow vest\" protester in France had his fingers ripped off during clashes at the parliament building in Par… [+2469 chars]"
  },
  {
  "source": {
  "id": "bbc-news",
  "name": "BBC News"
  },
  "author": "BBC News",
  "title": "Venezuela's Guaidó vows to open aid routes",
  "description": "The opposition leader says he will \"do everything possible\", and calls for distribution volunteers.",
  "url": "http://www.bbc.co.uk/news/world-latin-america-47184755",
  "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/554E/production/_105583812_guaido.jpg",
  "publishedAt": "2019-02-09T16:37:41Z",
  "content": "Image copyrightAFPImage caption\r\n Mr Guaido has declared himself interim president and has been recognised as such by the EU, the US and other world powers\r\nVenezuelan opposition leader Juan Guaidó has vowed to open humanitarian aid routes into the country in… [+3572 chars]"
  },
  {
  "source": {
  "id": "bbc-news",
  "name": "BBC News"
  },
  "author": "BBC News",
  "title": "Russia polar bear 'invasion' prompts alert",
  "description": "Dozens of the endangered species enter human settlements in the remote territory of Novaya Zemlya.",
  "url": "http://www.bbc.co.uk/news/world-europe-47185112",
  "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/143A0/production/_105584828_000991814-1.jpg",
  "publishedAt": "2019-02-09T15:38:52Z",
  "content": "Image copyrightPAImage caption\r\n Polar bears are forced on to land to look for food as sea ice diminishes\r\nA remote Russian region has declared a state of emergency over the appearance of dozens of polar bears in its human settlements, local officials say.\r\nA… [+1786 chars]"
  },
  {
  "source": {
  "id": "bbc-news",
  "name": "BBC News"
  },
  "author": "BBC News",
  "title": "Virginia's painful 'blackface' past and present",
  "description": "A scandal has engulfed the political leadership of the US state. What do the voters make of it?",
  "url": "http://www.bbc.co.uk/news/world-us-canada-47175239",
  "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/15B37/production/_105578888_gettyimages-1093786744.jpg",
  "publishedAt": "2019-02-08T22:49:13Z",
  "content": "Image copyrightGetty ImagesImage caption\r\n Protests in Richmond have called for Governor Northam to resign\r\nAsk Virginians what they feel about current scandal engulfing state politics and one reaction is common: the exasperated exhale. \r\nWhere do you even be… [+8165 chars]"
  }
  ]
  }

export default App;
