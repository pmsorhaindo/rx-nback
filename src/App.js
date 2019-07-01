import React, { Component } from 'react';
import Display from './Display';
import { of, interval } from 'rxjs';
import { buffer, map, reduce, scan, switchMap, take, tap } from 'rxjs/operators';
import './App.css';

const gameLength = 10;
const rounds = 3;
const random = () => Math.floor(Math.random() * Math.floor(8));
const gameSequence = (length) => [...Array(length).keys()].map(_ => random())

const playNbackSequence$ = (n, setter) => (randomSequence) => {
  console.log('asdf',randomSequence);
  return interval(1000)
    .pipe(
      // tap(i => setInfo(i === memorySize - 1 ? `YOUR TURN` : `${memorySize - i} elements`)),
      take(randomSequence.length),
      map(index => randomSequence[index]),
      take(gameLength),
      map(value => {
        console.log(value);
        setter(value)
      })//document.getElementById(`${value}`).click()),
      // switchMap(takePlayerInput$(randomSequence))
    ); 
  }

const nbackGame$ = (n, setter) => 
  of(Array.apply(null, {length: 3}).map((_ => of(gameSequence(10)))))
    .pipe(
      //scan((acc, _) => [...acc, random()], []),
      //reduce(random),
      //map(_ => random()),
      //reduce((acc, val) => acc.push(val), []),
      //reduce((acc, val) => [...acc, -1, ...val],[]),
      switchMap(playNbackSequence$(n, setter))
    );

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedCell:  -1,
    };

    this.setCell = this.setCell.bind(this);
    nbackGame$(3, this.setCell).subscribe();
  }

  setCell(selectedCell) {
    this.setState({ selectedCell })
  }

  render() {
    return (
      <div className="App">
        <Display selectedCell={this.state.selectedCell} />
        {/* <Controls /> */}
      </div>
    );
  }
}

export default App;
