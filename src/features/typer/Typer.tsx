import React from 'react'
import { InputGroup, FormControl, Container } from 'react-bootstrap'
import { getLocalText } from './typerSlice';

declare type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
interface Props {
  localText: string;
  remoteText: string;
  currentWord: string;
  updateLocalText: (arg1: string) => void;
}

const Typer = ({ localText, remoteText, currentWord, updateLocalText }: Props) => {
  console.log('localText', localText)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    updateLocalText(newValue)
}

  return (
    <Container>
      <h1>Current Word: {currentWord}</h1>
      <h1>Local Text: {localText}</h1>
      <h1>Remote Text: {remoteText}</h1>
      <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
      </InputGroup.Prepend>
        <FormControl
        value={localText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        placeholder="Username"
        aria-label="Username" 
        aria-describedby="basic-addon1"
      />
      </InputGroup>
    </Container>
  )
}
export default Typer