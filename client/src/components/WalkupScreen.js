import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
const style = {
  margin: 12,
};

const WalkupScreen = () => (
  <div>
    <RaisedButton label="Drop Off Package" style={style} />
    <RaisedButton label="Retrieve Package" style={style} />
  </div>
);

export default WalkupScreen;