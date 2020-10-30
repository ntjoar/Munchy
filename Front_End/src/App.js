import React from 'react';
import axios from 'axios';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {item: null}
  }

  render() {
    const list = this.state.item;
    const listItems = list.map((listdata) =>
      <li>
        <p>Item: {listdata[0]}</p>
        <p>Price: ${listdata[1]}</p>
        <p>Link: {listdata[2]}</p>
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
}

function showResult(json_data) {
  return (
    <Item item={json_data}/>
  )
}

function cmp(a, b) {
  return a[1].localeCompare(b[1]);
}

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', 
      data_: null,
      state: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async getData() {
    return await axios.get('http://localhost:3000/' + this.state.value).then(
      response => {
        this.setState({data_ : response.data});
        this.setState({state: true})
      })
      .catch(error => {
        console.log(error);
      })
  }

  async handleSubmit(event) {
    let data_ = await this.getData()
    while (true) {
      if (data_) {
        var list = [];
        console.log(data_);
        for(var i = 0; i < data_.length; i++) {
          var store = data_[i];
          for (var k = 0; k < store.items.length; k++) {
            var val = store.items[k];
            list.push([val.name, val.price, val.link]);
          }
        }
        list.sort(cmp);

        /* Sort Top 10 */
        let len = list.length;
        if (len > 10) {
          len = 10;
        }

        var newList = [];
        for(var i = 0; i < len; i++) {
          newList.push(list[i]);
        }

        console.log(newList);
        this.setState({data_ : newList});
        break;
      }
    }
  }

  render() {
    if (this.state.state === false) {
      return (
        <form>
          <label>
            <input type="text" name="searchbar" onChange={this.handleChange}/>
          </label>
          <button onClick={() => this.handleSubmit()}>Search</button>
        </form>
      );
    } else {
      return (
        showResult(this.state.data_)
      );
    }
  }
}

class Header extends React.Component {
  createHeader() {
    return (
    <div>
      <header id="header" className="alt">
            <div className="logo">Munchy</div>
      </header>
      <section id="banner">
				<div className="inner">
					<header>
						<h1>Munchy</h1>
						<p>Find the cheapest items on your recipe</p>
					</header>
					<a href="#main" className="button big scrolly">Search for item</a>
				</div>
			</section>
      <div id="main">
					<section className="wrapper style1">
						<div className="inner">
								<div className="flex flex-2">
									<div className="col col1">
										<div className="image round fit">
											<a href="generic.html" className="link"><img src={require("./images/pic01.png")}/></a>
										</div>
									</div>
									<div className="col col2">
										<h3>Enter your item Here</h3>
                    <Searchbar />
									</div>
								</div>
						</div>
					</section>
			</div>
    </div>
    );
  }

  render() {
    return (
      <div>
        <div className="header">
          {this.createHeader()}
        </div>
      </div>
    );
  }
}

class Body extends React.Component {
  render() {
    return(
      <Header />
    );
  }
} 

function body() {
  return (
    <div>
      <Body />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      body()
    );
  }
}

export default App;
