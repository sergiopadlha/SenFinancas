import React, { useState } from "react";
import Grid from "../Grid";
import * as C from "./styles";
import {format} from 'date-fns'

const Form = ({ handleAdd, transactionsList, setTransactionsList }) => {
  const [descricao, setDescricao] = useState("");
  const [quantia, setQuantia] = useState("");
  const [despesa, setDespesa] = useState(false);
  const [categoria, setCategoria] = useState("");

  const generateID = () => Math.round(Math.random() * 1000);

  
  const handleSave = () => {
    if (!descricao || !quantia) {
      alert("Informe a descrição e o valor!");
      return;
    } else if (quantia < 1) {
      alert("O valor tem que ser positivo!");
      return;
    }

    const hoje = new Date();

    const transaction = {
      id: generateID(),
      desc: descricao,
      categoria: categoria,
      amount: quantia,
      expense: despesa,
      data_trasacao: format(hoje, 'dd/MM/yyyy')
    };

    handleAdd(transaction);

    setDescricao("");
    setQuantia("");
    setCategoria("");
  };

  return (
    <>
      <C.Container>        
        <C.InputContent>
          <C.Label>Descrição</C.Label>
          <C.Input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </C.InputContent>
        <C.InputContent>
          <C.Label>Categoria</C.Label>
          <C.Input value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        </C.InputContent>
        <C.InputContent>
          <C.Label>Valor</C.Label>
          <C.Input
            value={quantia}
            type="number"
            onChange={(e) => setQuantia(e.target.value)}
          />
        </C.InputContent>
        <C.RadioGroup>
          <C.Input
            type="radio"
            id="rIncome"
            defaultChecked
            name="group1"
            onChange={() => setDespesa(!despesa)}
          />
          <C.Label htmlFor="rIncome">Entrada</C.Label>
          <C.Input
            type="radio"
            id="rExpenses"
            name="group1"
            onChange={() => setDespesa(!despesa)}
          />
          <C.Label htmlFor="rExpenses">Saída</C.Label>
        </C.RadioGroup>
        <C.Button onClick={handleSave}>ADICIONAR</C.Button>        
      </C.Container>
     
      <Grid itens={transactionsList} setItens={setTransactionsList} />
    </>
  );
};

export default Form;