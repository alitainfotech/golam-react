import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

import AuthService from "../../services/admin";

import SortableHeader from "../../components/SortableHeader";
import NoRecords from "../../components/NoRecords";

const HeaderList = [
  {
    title: "Name",
    value: "name",
    style: { minWidth: "150px", width: "30%" },
  },
  {
    title: "Balance",
    value: "balance",
    style: { minWidth: "150px", width: "30%", textAlign: "right" },
  },
  {
    title: "Min Balance",
    value: "min-balance",
    style: { minWidth: "150px", width: "30%", textAlign: "right" },
  },
  {
    title: "Max Balance",
    value: "max-balance",
    style: { minWidth: "150px", width: "30%", textAlign: "right" },
  },
];

const AccountList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    listFn();
  }, []);

  async function listFn() {
    setIsLoading(true);

    await AuthService.accountList()
      .then((response) => {
        const { data } = response.data;

        const payload = data.map((v) => ({
          id: v.id,
          ...v.attributes,
          balance: parseFloat(v?.attributes?.balance).toFixed(2) || 0,
          "min-balance":
            parseFloat(v?.attributes?.["min-balance"]).toFixed(2) || 0,
          "max-balance":
            parseFloat(v?.attributes?.["max-balance"]).toFixed(2) || 0,
        }));

        setList(payload);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <React.Fragment>
      <Table striped bordered responsive size="sm">
        <thead>
          <tr>
            <SortableHeader
              headers={HeaderList}
              isDisabled={list.length === 0}
              showActionCol={false}
            />
          </tr>
        </thead>

        <tbody>
          {list.map((item, l0Idx) => (
            <tr key={l0Idx}>
              <td>{item.name}</td>
              <td align="right">{`${item.balance}`}</td>
              <td align="right">{`${item["min-balance"]}`}</td>
              <td align="right">{`${item["max-balance"]}`}</td>
            </tr>
          ))}

          {isLoading && (
            <NoRecords colSpan={HeaderList.length + 1} msg="Loading..." />
          )}

          {!isLoading && list.length === 0 && (
            <NoRecords colSpan={HeaderList.length + 1} />
          )}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default AccountList;
