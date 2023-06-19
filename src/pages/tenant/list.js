import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import * as bs from "react-icons/bs";

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
    title: "Description",
    value: "description",
    style: { minWidth: "150px", width: "30%" },
  },
  {
    title: "Vendor",
    value: "vendor",
    style: { minWidth: "150px", width: "30%", textAlign: "center" },
  },
  {
    title: "Customer",
    value: "customer",
    style: { minWidth: "150px", width: "30%", textAlign: "center" },
  },

  {
    title: "Phones",
    value: "phones",
    style: { minWidth: "150px", width: "30%" },
  },
];

const TenantList = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    listFn();
  }, []);

  async function listFn() {
    setIsLoading(true);

    await AuthService.tenantList()
      .then((response) => {
        const { code } = response;

        if (code === "ERR_NETWORK") {
          navigate("/login");
          return;
        }

        const { data } = response.data;

        const payload = data.map((v) => ({
          id: v.id,
          ...v.attributes,
        }));

        setList(payload);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
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
            <td>{item.description}</td>
            <td align="center">
              {item.vendor ? (
                <bs.BsCheck2Circle className="text-success" />
              ) : (
                <bs.BsXCircle className="text-danger" />
              )}
            </td>
            <td align="center">
              {item.customer ? (
                <bs.BsCheck2Circle className="text-success" />
              ) : (
                <bs.BsXCircle className="text-danger" />
              )}
            </td>
            <td>{item.phones}</td>
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
  );
};

export default TenantList;
