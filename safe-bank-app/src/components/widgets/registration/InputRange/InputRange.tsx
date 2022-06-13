import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import './InputRange.scss';

interface InputRangeProps {
  min: number,
  max: number,
  step: number,
  value: number,

  onChangeInputRange: any
}

const InputRange: FC<InputRangeProps> = (props) => {
   const [state, setState] = useState({value: 0});

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ value: parseInt(e.target.value) });
    props.onChangeInputRange(parseInt(e.target.value));
  }

  useEffect(()=>{
      setState({ value: props.value });
  }, [props.value])

  function render() {
    return (
      <div>
        <span className="input-range__label--min"><span className="input-range__label-container">{props.min}</span></span>
        <div>
          <input type="range" style={{width: '92%', margin: '0 15px'}} min={props.min} max={props.max} value={state.value} name="age" onChange={(e) => {inputChange(e)}} step={props.step} className="form-control-plaintext rangeSlider" />
          <span className="rangevalue" style={{marginLeft: state.value * 3 + 'px'}}>{state.value}</span>
        </div>
        <span className="input-range__label--max"><span className="input-range__label-container">{props.max}</span></span>
      </div>
    )
  }

  return render();
}

export default InputRange;
