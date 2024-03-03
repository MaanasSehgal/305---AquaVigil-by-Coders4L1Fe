"use client";
import React, { useEffect, useState } from "react";
import { getUniqueCategories } from "../services/operationAdmin/getUniqueCategories";
import { useSelector } from "react-redux";

const AdminSidebar = ({ selectedCriteria, setSelectedCriteria, setDate, setSelectedStatus }) => {
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const handleSelectedCriteria = (event) => {
    const criteriaId = event.target.id;
    if (event.target.checked) {
      setSelectedCriteria([...selectedCriteria, criteriaId]);
    } else {
      setSelectedCriteria(selectedCriteria.filter((id) => id !== criteriaId));
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value
      .split("-")
      .reverse()
      .map((str) => parseInt(str, 10).toString())
      .join("/");
    setDate(date);
  };

  const handleChangeStatus = (event) => {
    const statusId = event.target.id;
    if (event.target.checked) {
      setSelectedStatus(statusId);
    }
  }

  async function fetchUniqueCategories() {
    const res = await getUniqueCategories(user?.token);
    if (res) {
      setCategories(res.result);
    }
  }

  useEffect(() => {
    fetchUniqueCategories();
    console.log(categories);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="font-bold mx-auto">Categories</div>
      {categories.map((category, index) => {
        return (
          <div key={index} className="flex gap-3 justify-between">
            <label htmlFor={category}>{category}</label>
            <input
              onChange={handleSelectedCriteria}
              type="checkbox"
              id={category}
            />
          </div>
        );
      })}

<div className="font-bold mx-auto">Status</div>
      <div className="flex gap-3 justify-between">
        <label htmlFor="pending">Pending</label>
        <input
          onChange={handleChangeStatus}
          type="checkbox"
          id="pending"
        />
      </div>
      <div className="flex gap-3 justify-between">
        <label htmlFor="Assigned">Assigned</label>
        <input
          onChange={handleChangeStatus}
          type="checkbox"
          id="assigned"
        />
      </div>

      <div className="flex flex-col mt-10 justify-between">
        <label htmlFor="Date" className="font-bold mx-auto">
          Date
        </label>
        <input onChange={handleDateChange} type="date" id="Date" />
      </div>
    </div>
  );
};

export default AdminSidebar;
