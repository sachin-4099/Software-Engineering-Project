import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "./Main.css";

const TransactionHistoryData = () => {

    const [data, setData] = useState({
      transaction_id:'',
      paid_to:'',
      amount:'',
      status:'',
      date:'',
    });

    const user_id = 0;

    const [transactiondata, setTransactiondata] = useState({});

    const transactions = [];
    let transactionmap = new Map();

    async function get_transactions() {
      const res = fetch(`/list/transactions?userid=${user_id}`, {
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
    { 
      transactions.push({label: transactiondata[itr].transaction_id, value: transactiondata[itr].transaction_id});
      transactionmap.set(transactiondata[itr].transaction_id, itr);
    }

    const InputEventTransaction = (event) => {
      
      const { label, value } = event;
      var index = transactionmap.get(value);
            
        setData((preVal) => {
            return {
                ...preVal,
                ["transaction_id"]: value,
                ["paid_to"]: transactiondata[index].paid_to,
                ["amount"]: transactiondata[index].total_amount,
                ["status"]: transactiondata[index].transaction_status,
                ["date"]: transactiondata[index].tranaction_at,
            };
        });

    };

  return (
    <main>
      <div className="main__container">
        <div className="my-5">
          <h1 className="text-center"> Transaction History </h1>
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
                    <label for="exampleFormControlInput1" className="form-label"> Paid To </label>
                    <input 
                       type="text" 
                       className="form-control" 
                       id="exampleFormControlInput1"
                       value={data.paid_to}
                       placeholder="Name of Payee"
                       readonly="readonly" 
                    />
                </div>
                <div className="mb-3">  
                    <label for="exampleFormControlInput1" className="form-label"> Amount </label>
                    <input 
                       type="text" 
                       className="form-control" 
                       id="exampleFormControlInput1"
                       value={data.amount}
                       placeholder="Amount"
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
                <div className="mb-3">  
                    <label for="exampleFormControlInput1" className="form-label"> Status </label>
                    <input 
                       type="text" 
                       className="form-control" 
                       id="exampleFormControlInput1"
                       value={data.status}
                       placeholder="Status"
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

export default TransactionHistoryData;