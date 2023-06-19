import React, { useEffect, useState } from "react";
import classnames from "classnames";

let count = 0;

function SortableHeader({
  headers = [],
  initialSortObj = null,
  isDisabled = false,
  showActionCol = true,
  sortClick = () => {},
}) {
  const [headerList] = useState(headers);
  const [sortObj, setSortObj] = useState(initialSortObj);

  useEffect(() => {
    count = initialSortObj === null ? 0 : initialSortObj.asc ? 1 : 2;
    setSortObj(initialSortObj);
  }, [initialSortObj]);

  const changeOrder = (item) => {
    let updatedObj = null;
    count = sortObj?.value !== item.value ? 1 : ++count;

    if (count === 1) {
      updatedObj = {
        value: item.value,
        asc: true,
      };
    } else if (count === 2) {
      updatedObj = {
        value: item.value,
        asc: false,
      };
    } else {
      count = 0;
    }

    setSortObj(updatedObj);
    sortClick(updatedObj);
  };

  return (
    <React.Fragment>
      {showActionCol && <th className="actionCol"></th>}

      {headerList.map((item, index) => {
        return (
          <th
            key={index}
            style={item.style}
            title={`${
              isDisabled || item.sortable === false
                ? ""
                : sortObj?.value === item.value
                ? sortObj?.asc
                  ? "ASC_VIEW"
                  : "DESC_VIEW"
                : "CLICK_TO_SORT"
            }`}
          >
            <div
              className={classnames(
                isDisabled || item.sortable === false ? "" : "sortable",
                item.isNumeric && "numeric"
              )}
              onClick={() =>
                item.sortable !== false && !isDisabled && changeOrder(item)
              }
            >
              {item.title}

              {!isDisabled &&
                item.sortable !== false &&
                (sortObj?.value === item.value ? (
                  <i className={`ri-sort-${sortObj?.asc ? "asc" : "desc"}`}></i>
                ) : (
                  <i className="ri-arrow-up-down-line"></i>
                ))}
            </div>
          </th>
        );
      })}
    </React.Fragment>
  );
}

export default SortableHeader;
