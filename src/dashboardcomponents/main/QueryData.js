import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Cookies from 'js-cookie';
import "./Main.css";

const QueryData = () => {

    const [data, setData] = useState({
      transaction_id:'',
      query_msg:'',
    });

    const user_id = Cookies.get("userid");

    const [transactiondata, setTransactiondata] = useState({});

    const transactions = [];

    async function get_querytransactions() {
      const res = fetch(`/list/querytransaction?userid=${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

      res.then(response => response.json()).then(data => setTransactiondata(data));

    }

    useEffect(() => {

      get_querytransactions();

    }, []);


    for(var itr = 0; itr < transactiondata.length; ++itr)
    transactions.push({label: transactiondata[itr].id, value: transactiondata[itr].id});

    const InputEventTransaction = (event) => {
      
      const { label, value } = event;

      const transaction_detail = fetch(`/query?transaction_id=${value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
      });

      transaction_detail.then(function(res) { 
        return res.json();
      }).then(res_data => {
            
            setData((preVal) => {
                return {
                    ...preVal,
                    ["transaction_id"]: value,
                    ["query_msg"]: res_data.msg,
                };
            });

      });

    };

  return (
    <main>
      <div className="main__container">
        <div className="my-5">
          <h1 className="text-center"> Queries </h1>
        </div>
        <div className="container contact_div">
          <div className="row">
            <div className="col-md-6 col-10 mx-auto">
              <form>
                <div className="mb-3">  
                    <label className="form-label"> Transaction ID </label>
                    <Select 
                     options={transactions} 
                     onChange={InputEventTransaction}
                     value={transactions.filter(function(option) {
                        return option.label === data.transaction_id;
                       })} 
                     placeholder="Transaction ID"
                     label="Single select"
                    />
                </div>            
                <div className="mb-3">  
                    <label for="exampleFormControlInput1" className="form-label"> Query Message </label>
                    <textarea 
                       type="text" 
                       className="form-control" 
                       rows="3"
                       id="exampleFormControlInput1"
                       value={data.query_msg}
                       placeholder="Query"
                       readonly="readonly" 
                    />
                </div>      
              </form>
            </div>
          </div>
        </div>      
      </div>
    </main>
  );
};

export default QueryData;