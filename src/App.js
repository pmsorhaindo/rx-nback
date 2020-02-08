import React, { Component } from 'react';
import Display from './Display';
import Controls from './Controls';
import { Subject, bindCallback, of, interval } from 'rxjs';
import { bufferCount, map, switchMap, take, tap } from 'rxjs/operators';
import './App.css';

const gameLength = 10;
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

    this.setCell = this.setCell.bind(this);
    this.positionClick = this.positionClick.bind(this);
    const positions$ = getPositions(this.setCell);
    positions$.subscribe();

    const lastXPositions$ = positions$.pipe(
      bufferCount(3,1),
      tap(x => console.log('wind', x))
    );
    lastXPositions$.subscribe();

    this.positionClick$ = this.positionClick.bind(this);
    // use Subject and onNext clicks
    // this.positionClick$().subscribe(x => console.log('pc', x));
  }

  positionClick() {
    const subject = new Subject();

    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`)
    });

    return subject.next;
  }

  setCell(selectedCell) {
    this.setState({ selectedCell })
  }

  render() {
    return (
      <div className="App">
        <Display selectedCell={this.state.selectedCell} />
        <Controls positionClick={ this.positionClick$ }/>
      </div>
    );
  }
}

export default App;
