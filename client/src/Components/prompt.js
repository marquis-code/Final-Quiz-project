/* import Popup from 'react-popup';

this.state= {
    value :   value: this.props.defaultValue
}

componentDidUpdate (prevProps, prevState) {   //new
    if(prevState.value !== this.state.value){
      this.props.onChange(this.state.value);
    }
}

this.onChange = (e) => this._onChange(e); //new

_onChange(e) {    //new
    let value = e.target.value;

    this.setState({value: value});
  }

  Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback){
    let promptValue = null;
    let promptChange = function (value) {
      promptValue = value;
    };
  
    this.create({
      title: 'Please enter your matric to confirm submission',
      content: <prompt onChange={promptChange} placeholder={placeholder} value={defaultValue} />,
      buttons: {
        left: ['cancel'],
        right: [{
          text: 'Save',
          key: '%+s',
          classname: 'success',
          action: function() {
            callback(promptValue);
            Popup.close();
          }
        }]
      }
    });
  });
  
  Popup.plugins().prompt('', 'Enter your matric', function(value){
  Popup.alert('You typed: ' + value);
  }); */

/*   <input type="number" placeholder={this.props.placeholder} className="mm-popup_input" value={this.state.value} onChange={this.onChange} /> */



/* userMatricInput = () => {
    const {matric, score, numberOfQuestions, correctAnswers, wrongAnswers, hints, fiftyFifty} = this.state;
    handleSubmit = (e) => {
      e.preventDefault();
      const playerStats = {
        score: score,
        numberOfQuestions: numberOfQuestions,
        numberOfAnsweredQuestions: correctAnswers + wrongAnswers,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        fiftyFiftyUsed: 2 - fiftyFifty,
        hintsUsed: 5 - hints,
        matric: matric
    };
  
    axios({
      url: "/user/quizStat",
      method: "POST",
      data: playerStats, 
    })
      .then(() => {
        M.toast({
          html: "Quiz data was sucessfully submitted",
          classes: "tost-valid",
          displayLength: 1000 
        })})
       .catch(() => { 
        console.log("Something went Wrong");
      });
  
      setTimeout(() => {
        this.props.history.push('/thanksPage');
            }, 1000); 
    }
  
    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    };
    return(
      <Fragment>
        <form onSubmit={this.handleSubmit}>
           <input name="matric" type="number" value={matric} onChange={this.handleChange} />
           <button type="submit">Submit</button>
        </form>
      </Fragment>
    )
  } */



  /*   let matricInput = window.prompt('Please Enter your Matric Number to Confirm Submission');
  if(matricInput.toString().length === 9 || matricInput != null){
    const { state } = this;
    const playerStats = {
        score: state.score,
        numberOfQuestions: state.numberOfQuestions,
        numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        fiftyFiftyUsed: 2 - state.fiftyFifty,
        hintsUsed: 5 - state.hints,
        matric: matricInput
    };

    axios({
      url: "/user/quizStat",
      method: "POST",
      data: playerStats, 
    })
      .then(() => {
        M.toast({
          html: "Quiz data was sucessfully submitted",
          classes: "tost-valid",
          displayLength: 1000 
        })})
       .catch(() => { 
        console.log("Something went Wrong");
      });
      setTimeout(() => {
        this.props.history.push('/thanksPage');
            }, 1000);
  }else{
    return null
  }  */ 