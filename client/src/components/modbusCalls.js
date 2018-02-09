componentDidMount() {
    this.isLockerSystemConnected()
      .then(res =>
        this.setState({
          response: res[0].connect.toString()
        })
      )
      .catch(err => console.log(err));
  }

  isLockerSystemConnected = async () => {
    const response = await fetch("http://localhost:3001/api/getAllInputStatus");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("is connected");
    // console.log(body[0].connect);
    return body;
  };