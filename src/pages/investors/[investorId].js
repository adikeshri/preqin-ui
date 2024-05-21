import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getInvestorCommitment } from "../../utils/api";
import { Table, Form, Container } from "react-bootstrap";
import styles from "./InvestorPage.css";

const assetClassMapping = {
  'Private Equity': 'pe',
  'Private Debt': 'pd',
  'Real Estate': 're',
  'Infrastructure': 'inf',
  'Natural Resources': 'nr',
  'Hedge Funds': 'hf'
};

const assetClasses = Object.keys(assetClassMapping);

const InvestorPage = () => {
  const router = useRouter();
  const { investorId } = router.query;
  const [selectedAssetClass, setSelectedAssetClass] = useState("");
  const [commitmentInfo, setCommitmentInfo] = useState(null);

  useEffect(() => {
    if (selectedAssetClass) {
      const fetchCommitmentInfo = async () => {
        const data = await getInvestorCommitment(
          selectedAssetClass,
          investorId
        );
        setCommitmentInfo(data);
      };
      fetchCommitmentInfo();
    }
  }, [selectedAssetClass, investorId]);

  return (
    <Container className={`container`}>
      <h1>Investor {investorId}</h1>
      <Form.Group controlId="assetClassSelect">
        <Form.Control
          as="select"
          value={selectedAssetClass}
          onChange={(e) => setSelectedAssetClass(e.target.value)}
          className={`dropdown-toggle`}
        >
          <option value="">Select an Asset Class</option>
          {assetClasses.map((assetClass) => (
            <option key={assetClass} value={assetClassMapping[assetClass]}>
              {assetClass}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {commitmentInfo && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {commitmentInfo.map((investor) => (
              <tr key={investor.id}>
                <td>{investor.id}</td>
                <td>
                  {investor.currency} {investor.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default InvestorPage;
