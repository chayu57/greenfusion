import { Button, Card, ProgressStep } from "react-rainbow-components";
import "./ExpAction.css";

const ExpAction = (props) => {
  return (
    <div className="exp__actions">
    <Card className="exp__actions__container">
      <Button
        label="Output Power Vs Speed"
        onClick={()=>props.cnohandler(1)}
        
        variant="brand"
        className="rainbow-m-around_medium"
      />
      <Button
        label="Output Power Vs Efficiency"
        onClick={()=>props.cnohandler(2)}
        
        variant="border"
        className="rainbow-m-around_medium"
      />
      <Button
        label="Output Power Vs Armature Current"
        onClick={()=>props.cnohandler(3)}
    
        variant="success"
        className="rainbow-m-around_medium"
      />
      <Button
        label="Output Power Vs Torque"
        onClick={()=>props.cnohandler(4)}
    
        variant="neutral"
        className="rainbow-m-around_medium"
      />
    </Card>
    </div>

  );
};

export default ExpAction;
