




import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getInvestorCommitment } from '../../../utils/api';
import { Form, Container } from 'react-bootstrap';

const assetClasses = ['pe', 'pd', 're', 'inf', 'nr', 'hf'];

const InvestorPage = () => {
  const router = useRouter();
  const { investorId } = router.query;
  const [selectedAssetClass, setSelectedAssetClass] = useState('');
  const [commitmentInfo, setCommitmentInfo] = useState(null);

  useEffect(() => {
    if (selectedAssetClass) {
      const fetchCommitmentInfo = async () => {
        const data = await getInvestorCommitment(selectedAssetClass, investorId);
        setCommitmentInfo(data);
      };
      fetchCommitmentInfo();
    }
  }, [selectedAssetClass, investorId]);

  return (
    <Container>
      <h1>Investor {investorId}</h1>
      <Form.Group controlId="assetClassSelect">
        <Form.Label>Select Asset Class</Form.Label>
        <Form.Control
          as="select"
          value={selectedAssetClass}
          onChange={(e) => setSelectedAssetClass(e.target.value)}
          className="dropdown-toggle"
        >
          <option value="">Select an Asset Class</option>
          {assetClasses.map((assetClass) => (
            <option key={assetClass} value={assetClass}>
              {assetClass}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {commitmentInfo && (
        <div className="investor-details">
          <h2>Commitment Information</h2>
          <pre>{JSON.stringify(commitmentInfo, null, 2)}</pre>
        </div>
      )}
    </Container>
  );
};

export default InvestorPage;
