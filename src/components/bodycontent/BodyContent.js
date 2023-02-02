import "./BodyContent.css";
import ExpForm from "./ExpForm";
import ExpTable from "./ExpTable";
import { useState, useContext, useEffect } from "react";
import ExpAction from "./ExpAction";
import CustomModal from "./CustomModel";
import { AuthContext } from "../../context/auth-context";
import config from "../../utils/config.json";
import { Button } from "react-rainbow-components";


const BodyContent = (props) => {
  const [dataTable, setDataTable] = useState([]);
  const [chartno, setChartNo] = useState();
  const [isOpen, setIsOpen] = useState();
  const auth = useContext(AuthContext);

  const formInputHandler = (inputs) => {

    setDataTable(inputs)

  };
  const chartNoHandler = (cno) => {
    setChartNo(cno);
    setIsOpen(!isOpen);
    //console.log(cno);
  }


  useEffect(() => {
    const exp = parseInt(props.expname.split(" ")[1]);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + auth.token
      },
      body: JSON.stringify({ exp })
    };
    let convertedData;

    const deleterowHandler = (row_id) => {
      //console.log(row_id);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + auth.token
        },
        body: JSON.stringify({ row_id, exp })
      };
      fetch(config.SERVER.URL + "/exp/deleterow", requestOptions)
        .then(async (result) => {
          const data = await result.json();
          //console.log(data);
          if (data.data.length > 0) {
            convertedData = data.data.map((v, i) => {
              //console.log(v);
              const newobj = v;
              newobj.sno = i + 1;
              newobj.deleterow = <Button label="Delete" onClick={() => deleterowHandler(v._id)} variant="destructive" className="rainbow-m-around_medium" />;
              return newobj;
            });
            setDataTable(convertedData);
          }

        }).catch((err) => {
          console.log(err);
        });
    }
    //fetch("https://aesmachineslabproject.onrender.com/exp/getexpdata", requestOptions)
    fetch(config.SERVER.URL + "/exp/getexpdata", requestOptions)
      .then(async (result) => {
        const data = await result.json();
        //console.log(data);
        if (data.data.length > 0) {
          convertedData = data.data.map((v, i) => {
            //console.log(v);
            const newobj = v;
            newobj.sno = i + 1;
            newobj.deleterow = <Button label="Delete" onClick={() => deleterowHandler(v._id)} variant="destructive" className="rainbow-m-around_medium" />;
            return newobj;
          });
          setDataTable(convertedData);
        }

      }).catch((err) => {
        console.log(err);
      });
  }, [props.expname, auth.token]);

  return (

    <div className="body__content__container">
      <ExpForm onsubmit={formInputHandler} expname={props.expname} />
      <ExpTable datatable={dataTable} />
      <ExpAction cnohandler={chartNoHandler} />

      <CustomModal isopen={isOpen} expno={props.expid} chartno={chartno} data={dataTable} />

    </div>

  );


};

export default BodyContent;
