import Modal from 'react-modal';
import { FormEvent, useState } from 'react';


import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closedImg from '../../assets/close.svg'


import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreteNewTransaction(event: FormEvent) {
    event.preventDefault();
    
    
    await createTransaction(
      {
        title,
        amount,
        type,
        category,
      }
    )

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closedImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreteNewTransaction}>
        <h2>Cadastrar transações</h2>

        <input
          placeholder='Titulo'
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder='Valor'
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            onClick={() => { setType('deposit'); }}
            type='button'
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            onClick={() => { setType('withdraw'); }}
            type='button'
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>


        </TransactionTypeContainer>

        <input
          placeholder='Categoria'
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type='submit'>
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
}
