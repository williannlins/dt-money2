import { Container } from './styles';
import { Summary } from '../Summary';
import { TransactionTabel } from '../TransactionsTable';

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <TransactionTabel />
    </Container>
  );
}
