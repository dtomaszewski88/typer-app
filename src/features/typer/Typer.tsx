import React from 'react'
import { InputGroup, FormControl, Container, Button } from 'react-bootstrap'
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
  const handleConnect = () => {
    console.log('handleConnect')
  }
  const handleAddToQueue = () => {
    console.log('handleAddToQueue')
  }
  const handleReady = () => {
    console.log('handleStart')
  }
  return (
    <>
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
      <Container>
        <Button variant="primary" onClick={handleConnect}>Connect</Button>{' '}
        <Button variant="secondary" onClick={handleAddToQueue}>Add To queue</Button>{' '}
        <Button variant="success" onClick={handleReady}>Ready</Button>{' '}
      </Container>
      </>
  )
}
export default Typer