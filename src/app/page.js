"use client";

import { useEffect, useState } from "react";
import { getInvestors } from "../utils/api";
import Link from "next/link";
import { Table, Container } from "react-bootstrap";
import "./globals.css";

const HomePage = () => {
  const [investors, setInvestors] = useState([]);
  const [isLoadingInvestors, setIsLoadingInvestors] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      const data = await getInvestors();
      setInvestors(data);
      setIsLoadingInvestors(false);
    };
    fetchInvestors();
  }, []);

  return (
    <>
      {isLoadingInvestors ? (
        <p>Loading...</p>
      ) : (
        <Container>
          <h1>Investors</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Date of addition</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((investor) => (
                <tr key={investor.firm_id}>
                  <td>
                    <Link href={`/investors/${investor.firm_id}`}>
                      {investor.firm_id}
                    </Link>
                  </td>
                  <td>{investor.firm_name}</td>
                  <td>{capitalizeFirstLetter(investor.firm_type)}</td>
                  <td>{getDateString(investor.date_added)}</td>
                  <td>{investor.address}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
};

function getDateString(serialized_date) {
  const date = new Date(serialized_date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

function capitalizeFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default HomePage;

