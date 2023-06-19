import React from "react";

function NoRecords({ colSpan = 0, msg = "No Records Found!" }) {
  return (
    <React.Fragment>
      <tr>
        <td colSpan={colSpan}>
          <h4 className="text-center p-4">{msg}</h4>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default NoRecords;
