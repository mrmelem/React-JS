import React, { useState, useRef } from "react";
import { useEffect } from "react";

import AsyncSelect from "react-select/async";

const Component = () => {
  const [inputValue, setInputValue] = useState();
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e);
  };

  /* const options = [
    { value: "teste", label: "Teste" },
    { value: "teste2", label: "Teste2" },
  ]; */

  /*   const loadOptions = async (inputValue, callback) => {
    //clearTimeout(searchRef.current);

    callback(options);
    setTimeout(() => {
      fetch("http://cep.la/api/professor-tostes", {
        headers: { Accept: "application/json" },
      })
        .then((result) => result.json())
        .then((result) => {
          const tempArray = [];
          result.forEach((el) => {
            tempArray.push({ label: el.logradouro, value: el.cep });
          });
          callback(tempArray);
        });
    }, 1000);
  };
 */

  const filterAddress = async (inputValue) => {
    if (!inputValue) return;

    const inputvalue = inputValue.replace(/ /g, "-");
    const options = await fetch(`http://cep.la/api/${inputvalue}`, {
      headers: { Accept: "application/json" },
    })
      .then((result) => result.json())
      .then((el) => {
        return el.map((i) => ({
          label: `${i.cep} - ${i.logradouro}, ${i.bairro}, ${i.cidade}`,
          value: i.cep,
        }));
      });

    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    clearTimeout(searchRef.current);

    searchRef.current = setTimeout(async () => {
      callback(await filterAddress(inputValue));
    }, 1000);
  };

  return (
    <div>
      <pre>inputValue: "{inputValue}"</pre>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onInputChange={handleInputChange}
      />
    </div>
  );
};
/*
    const Component = () => {
    const [inputValue, setInputValue] = useState(" ");
    const [fields, setFields] = useState([]);
    const searchRef = useRef(null);

    const Request = async (inputValue) => {
        if (inputValue.length < 3) return false;

        window.clearTimeout(searchRef.current);

        searchRef.current = await window.setTimeout(async () => {
        const uri = `http://cep.la/api/${inputValue.replace(/ /g, "-")}`;

        const response = await fetch(uri, {
            headers: { Accept: "application/json" },
        }).then((response) => response.json());

        const newValues = await response.map((el) => ({
            label: el.logradouro,
            value: el.cep,
        }));

        return setFields(newValues);
        }, 500);

        return fields;
    };

    const handleInputChange = (inputValue) => {
        const value = inputValue.replace(/\W/g, "");
        setInputValue(value);
        return;
    };

    const loadOptions = async (inputValue, callback) => {
        setTimeout(async () => {
        const response = await Request(inputValue);
        callback([{label: "red", value: "red"},{label: 'green', value: 'green'}]);
        }, 1000);
    };

    return (
        <div>
        <pre>inputValue: "{inputValue}"</pre>
        <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            onInputChange={handleInputChange}
        />
        </div>
    );
    };

*/
export default Component;
