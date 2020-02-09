import React, { Component } from 'react';
import Display from './Display';
import Controls from './Controls';
import { Subject, of, interval } from 'rxjs';
import {
  bufferCount,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import './App.css';

const gameLength = 20;
const random = () => Math.floor(Math.random() * Math.floor(8));
const randomSequence = (length) => Array.apply(null, {length}).map(random);
const spaces = x => {
  return Array.apply(null, Array(x.length)).reduce((result, value, index) => {
    result.push(x[index], -1);
    return result;
  }, [])
};

const playNbackSequence$ = (setter) => (randomSequence) =>
  interval(1000)
    .pipe(
      take(randomSequence.length),
      map(index => {
        return randomSequence[index]
      }),
      tap(value => {
        setter(value)
      }),
    )

const getPositions = (setter) =>
 of(randomSequence(gameLength)).pipe(
    switchMap(playNbackSequence$(setter)),
  );

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedCell:  -1,
    };

    this.buttonEventsSubject = new Subject();

    this.setCell = this.setCell.bind(this);
    const positions$ = getPositions(this.setCell);
    positions$.subscribe();

    const lastXPositions$ = positions$.pipe(
      bufferCount(3,1),
    );
    lastXPositions$.subscribe();

    this.buttonEventsSubject.asObservable().pipe(
      withLatestFrom(lastXPositions$),
      map(([event, window]) => {
        if (event === 'position' && window.length === 3 && window[0] === window[window.length - 1]) {
          console.log('sucess!');
        }
      })
    ).subscribe((e) => console.log(e));


  }

  setCell(selectedCell) {
    this.setState({ selectedCell })
  }

  render() {
    return (
      <div className="App">
        <Display selectedCell={this.state.selectedCell} />
        <Controls
          positionClick={ (e) => this.buttonEventsSubject.next('position') }
          letterClick= { (e) => this.buttonEventsSubject.next('letter') }
        />
      </div>
    );
  }
}

export default App;
