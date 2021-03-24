import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "./Main.css";

const SavingData = () => {

    const [data, setData] = useState({
      transaction_id:'',
      category:'',
      saving:'',
      date:'',
    });

    const user_id = global.config.i18n.state.id;

    const [transactiondata, setTransactiondata] = useState({});

    const transactions = [];

    async function get_transactions() {
      const res = fetch(`/list/transaction?userid=${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

      res.then(response => response.json()).then(data => setTransactiondata(data));

    }

    useEffect(() => {

      get_transactions();

    }, []);


    for(var itr = 0; itr < transactiondata.length; ++itr)
    transactions.push({label: transactiondata[itr].id, value: transactiondata[itr].id});

    const InputEventTransaction = (event) => {
      
      const { label, value } = event;

      const transaction_detail = fetch(`/saving?transaction_id=${value}`, {
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
                    ["category"]: res_data.category,
                    ["saving"]: res_data.amount,
                    ["date"]: res_data.date,
                };
            });

      });

    };

  return (
    <main>
      <div className="main__container">
        <div className="my-5">
          <h1 className="text-center"> Savings </h1>
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
                    <label for="exampleFormControlInput1" className="form-label"> Category </label>
                    <input 
                       type="text" 
                       className="form-control" 
                       id="exampleFormControlInput1"
                       value={data.category}
                       placeholder="Category"
                       readonly="readonly" 
                    />
                </div>
                <div className="mb-3">  
                    <label for="exampleFormControlInput1" className="form-label"> Saving </label>
                    <input 
                       type="text" 
                       className="form-control" 
                       id="exampleFormControlInput1"
                       value={data.saving}
                       placeholder="Saving"
                       readonly="readonly" 
                    />
                </div>
                <div className="mb-3">  
                    <label for="exampleFormControlInput1" className="form-label"> Transaction Time </label>
                    <input 
                       type="text" 
                       className="form-control" 
                       id="exampleFormControlInput1"
                       value={data.date}
                       placeholder="Time"
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

export default SavingData;