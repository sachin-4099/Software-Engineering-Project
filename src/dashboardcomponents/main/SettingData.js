import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "./Main.css";

const SettingData = () => {

    const [data, setData] = useState({
      locking_period:'',
      new_locking_period:'',
      category:'',
      category_id:'',
      percentage:'',
      new_percentage:'',
    });

    const user_id = 0;

    const [categdata, setCategdata] = useState({});

    const categoptions = [];
    let categmap = new Map(); 

    async function get_category() {
      const res = fetch(`/list/category?userid=${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

      res.then(response => response.json()).then(data => setCategdata(data));

    }

    async function get_lockingperiod() {
      const res = fetch(`/list/locking_period?userid=${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

      res.then(response => response.json()).then(res_data =>  {     

        setData((preVal) => {
            return {
                ...preVal,
                ["locking_period"]: res_data.locking_period,
            };

        });

      });

    }


    useEffect(() => {

      get_category();
      get_lockingperiod();

    }, []);


    for(var itr = 0; itr < categdata.length; ++itr)
    { 
       categoptions.push({label: categdata[itr].category_name, value: categdata[itr].percentage});
       categmap.set(categdata[itr].category_name, categdata[itr].category_id);
    }

    const InputEventCategory = (event) => {
      
        const { label, value } = event;
        
        setData((preVal) => {
            return {
                ...preVal,
                ["category"]: label,
                ["percentage"]: value + '%',
                ["category_id"]: categmap.get(label),
            };
        });

    };

    const InputEventLockingPeriod = (event) => {
      
      const { name, value } = event.target;

      setData((preVal) => {
          return {
              ...preVal,
              [name]: value,
          };

      });

    };

    const InputEventPercentage = (event) => {
      
      const { name, value } = event.target;

      setData((preVal) => {
          return {
              ...preVal,
              [name]: value,
          };

      });

    };

    const UpdateLocking = (e) => {

      e.preventDefault();

      const res = fetch("/update/locking_period", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                 userid: user_id,
                 locking_period: data.new_locking_period
              })
      });

      res.then(response => response.json()).then(res_data =>  {
          
          console.log(res_data);

          if(res_data.success === true)
          {
            alert(`Successfully Updated Locking Period`);
                  setData((preVal) => {
                    return {
                        ...preVal,
                        ["locking_period"]: data.new_locking_period,
                        ["new_locking_period"]: '',
                    };

                });

          }
          else
          {
             alert(`Please Try Again`); 

             setData((preVal) => {
                    return {
                        ...preVal,
                        ["new_locking_period"]: '',
                    };

              });

          }


      });

};

    const UpdatePercentage = (e) => {

      e.preventDefault();

      const res = fetch("/update/saving_percentage", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                 userid: user_id,
                 saving_percentage: data.new_percentage,
                 category_id: data.category_id
              })
      });

      res.then(response => response.json()).then(res_data =>  {
          
          console.log(res_data);

          if(res_data.success === true)
          {
            alert(`Successfully Updated Saving Percentage`);
                  setData((preVal) => {
                    return {
                        ...preVal,
                        ["percentage"]: data.new_percentage + '%',
                        ["new_percentage"]: '',
                    };

                });

          }
          else
          {
             alert(`Please Try Again`); 

             setData((preVal) => {
                    return {
                        ...preVal,
                        ["new_percentage"]: '',
                    };

              });

          }


      });

};

  return (
    <main>
      <div className="main__container">
        <div className="my-5">
          <h1 className="text-center"> Preferences </h1>
        </div>
        <div className="container contact_div">
          <div className="row">
            <div className="col-md-6 col-10 mx-auto">
              <form onSubmit={UpdateLocking}>
                <div className="mb-3">  
                    <label for="exampleFormControlInput1" className="form-label"> Locking Period </label>
                    <input 
                       type="text" 
                       className="form-control" 
                       id="exampleFormControlInput1"
                       value={data.locking_period}
                       placeholder="Locking Period (in Days)"
                       readonly="readonly" 
                    />
                </div>
                <div className="mb-3">  
                    <label for="exampleFormControlInput1" className="form-label"> New Locking Period </label>
                    <input 
                       type="number" 
                       className="form-control" 
                       id="exampleFormControlInput1"
                       name="new_locking_period"
                       value={data.new_locking_period}
                       onChange={InputEventLockingPeriod} 
                       placeholder="New Locking Period (in Days)"
                    />
                </div> 
                <div className="col-12">
                  <button className="btn btn-outline-primary" type="submit"> Update Locking Period </button>
                </div>
                <br/>             
                <div className="mb-3">  
                    <label className="form-label"> Category </label>
                    <Select 
                     options={categoptions} 
                     onChange={InputEventCategory}
                     value={categoptions.filter(function(option) {
                        return option.label === data.category;
                       })} 
                     placeholder="Category"
                     label="Single select"
                    />
                </div>
              </form>
              <form onSubmit={UpdatePercentage}>
                <div className="mb-3">  
                    <label for="exampleFormControlInput1" className="form-label"> Saving Percentage </label>
                    <input 
                       type="text" 
                       className="form-control" 
                       id="exampleFormControlInput1"
                       value={data.percentage}
                       placeholder="Saving Percentage"
                       readonly="readonly" 
                    />
                </div>
                <div className="mb-3">  
                    <label for="exampleFormControlInput1" className="form-label"> New Saving Percentage </label>
                    <input 
                       type="number" 
                       className="form-control" 
                       id="exampleFormControlInput1"
                       name="new_percentage"
                       value={data.new_percentage}
                       onChange={InputEventPercentage} 
                       placeholder="New Saving Percentage"
                    />
                </div>
                <div className="col-12">
                  <button className="btn btn-outline-primary" type="submit"> Update Saving Percentage </button>
                </div>                                
              </form>
            </div>
          </div>
        </div>      
      </div>
    </main>
  );
};

export default SettingData;