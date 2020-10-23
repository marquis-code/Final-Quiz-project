   if(matricInput.toString().length !== 9 || matricInput.toString().length === ""){
          alert('Invalid Matric Number');
    const matricInput2 = window.prompt('Please Enter a valid Matric Number to Confirm Submission');
      if(matricInput2.toString().length !== 9 || matricInput.toString().length === "")
        alert('Invalid Matric number');
    }else{
      M.toast({
        html: "Quiz data was sucessfully submitted",
        classes: "tost-valid",
        displayLength: 1000
    })
    } 

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
        })
        })
        .catch(() => {
          console.log("Something went Wrong");
        });
  
    })
    .catch(() => {
       alert('something happned');
    })
 

 //preloader



/*   const userMatric = window.prompt('Enter Your Matric Number to Confirm Submission');
    const payload = {
      matric : userMatric.toString()
    }
    axios.post({
      url: "/user/oneUser",
      method: "POST",
      data: payload 
    }).then(()=>{
      alert('success')
    }).catch((error)=>{
      console.log(error.message)
      alert('something Failed')
    }) */
  


/* 


// Redirect user to a thank you page
setTimeout(() => {
  this.props.history.push('/thanksPage' /* playerStats */);
      }, 1000);
  };


/*   if(responce.status === 200){
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
     alert('please enter a valid matric number')
   } */



   
/*     const matricInput = window.prompt('Please Enter your Matric Number to Confirm Submission');
    if(matricInput.toString().length !== 9 || matricInput.toString().length === ""){
      alert('Invalid Matric number');
    }else{
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
    } */



    /*     this.props.history.push('/confirm-matric'); */
    let matric = parseInt(window.prompt('Enter Your Matric Number to Confirm Submission'));
    
/*       const payload = {
      matric : parseInt(matricInput)
    }  */ 
     axios.post({
      url: '/user/oneUser',
      method: "POST",
      data: matric
    }).then(()=>{
       alert('Done')
       
    }).catch((error)=>{
      console.log(error.message)
      alert('something Failed')
    }) 