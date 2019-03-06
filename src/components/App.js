import React, { Component } from 'react';
import DoomTr from '../DoomTr';
import DoomTd from './DoomTd';

const fireRows = 40; // height
const fireColumns = 40; // width

class App extends Component {
    rows = [];
    firePixelsArray = [];
    
    constructor(props) {
        super(props);
        this.state = {rows: []};

        for (let i = 0; i < (fireRows * fireColumns); i++) {
            this.firePixelsArray[i] = 0;        
        }
    }

    componentDidMount() {
        this.renderRows();
    }

    renderColumns(i) {
        let columns = [];
        
        for (let j = 0; j < fireColumns; j++) {
            let pixelIndex = (i * fireColumns) + j;
            columns[j] = <DoomTd key={pixelIndex} 
                pixelIndex={pixelIndex} 
                fireIntensity={this.firePixelsArray[pixelIndex]} 
            />;
        }
        return columns;
    }

    renderRows = async() => {
        for (let i = 0; i < fireRows; i++) {
            this.rows[i] = <DoomTr key={i}>
                {this.renderColumns(i)}
            </DoomTr>;
        } 
        await this.setState({rows: this.rows});
    }
    
    start = () => {
        const startPixel = (fireColumns * fireRows) - fireColumns;
        for (let j = 0; j < fireColumns; j++) {
            this.firePixelsArray[startPixel + j] = 36;
        }

        this.renderRows();

        setInterval(this.calculateFirePropagation, 100);
    }

    next = () => {
        this.calculateFirePropagation();
    }
    
    calculateFirePropagation = async() => {
        for (let j = 0; j < fireColumns; j++) {
            for (let i = 0; i < fireRows; i++) {
                const pixelIndex = j + (fireColumns * i);
                this.updateFireIntensityPerPixel(pixelIndex);
            }
        }
        await this.renderRows();
    }

    updateFireIntensityPerPixel = (currentPixelIndex) => {
        const belowPixelIndex = currentPixelIndex + fireColumns;
        if (belowPixelIndex >= fireColumns * fireRows) {
          return;
        }
        const decay = Math.floor(Math.random() * 3);
        const belowPixelFireIntensity = this.firePixelsArray[belowPixelIndex];
        const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;
      
        this.firePixelsArray[currentPixelIndex - decay] = newFireIntensity;
    }

    render() {
        return (
            <div>
                <table cellPadding="0" cellSpacing="0"
                    style={{borderCollapse: "collapse", border: "1px solid #000"}}
                >
                    <tbody>
                        {this.state.rows}
                    </tbody>
                </table>
                <button onClick={this.start}>Start</button>
                a
                <button onClick={this.next}>Next</button>
            </div>
        );
            
    }
}
        
        export default App;