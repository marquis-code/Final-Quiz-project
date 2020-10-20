import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import {setErrors} from './Corrections/SetErrors';
import M from 'materialize-css';

class EditPost extends Component{
 constructor(props){
     super(props);
     this.state = {
        category  : '',
        question : '',
        optionA : '',
        optionB : '',
        optionC : '',
        optionD : '',
        answer : '',
        errors : {}
    };
    this.categoryRef = React.createRef();
 }
  
 componentDidMount (){
     this.categoryRef.current.focus();
    const id = this.props.match.params.id;
    axios.get(`/quiz/questions/${id}`)
    .then((responce) => {
     const data = responce.data;
     this.setState({ 
         category : data.category,
         question : data.question,
         optionA : data.optionA,
         optionB : data.optionB,
         optionC : data.optionC,
         optionD : data.optionD,
         answer : data.answer
        });
    }).catch(()=>{ 
        M.toast({ 
            html: "!! Something went wrong when fetching specific question",
            classes: "tost-invalid",
            displayLength: 1500,
          })
       /*  console.log('Something went wrong');  */
    })
 }
    handleChange = ({target}) => {
        const {name, value } = target;
        this.setState({  [name] : value });
    };

    validateInputs = (question, category,optionA, optionB, optionC, optionD, answer) => {
      const errors = setErrors(question, category,optionA, optionB, optionC, optionD, answer);
      this.setState({errors : errors });
      return Object.values(errors).every((err) => err === "");
    }

    submit = (event) => {
        event.preventDefault();
        const id = this.props.match.params.id;
        const {question, category,optionA, optionB, optionC, optionD, answer} = this.state; 

        if(this.validateInputs(question, category,optionA, optionB, optionC, optionD, answer)){
            const payload = {
                category: this.state.category, 
                question: this.state.question,
                optionA: this.state.optionA,
                optionB: this.state.optionB,
                optionC: this.state.optionC,
                optionD: this.state.optionD,
                answer: this.state.answer
            };
        
            axios({
                url : `/quiz/questions/${id}`,
                method: "PUT",
                data: payload 
            })
            .then(()=>{
                M.toast({ 
                    html: "Question was successfully edited",
                    classes: "tost-valid",
                    displayLength: 1500,
                  })
           /*   alert('Question was sucessfully Edited'); */
           this.resetUserInput();
            }) 
            .catch(()=>{
               /* alert('Something went Wrong'); */
               M.toast({ 
                html: "!!Something went wrong when updating quiz questions",
                classes: "tost-invalid",
                displayLength: 1500,
              })
            })
        }
 };

 resetUserInput = () => {
    this.setState({category: "", question: "", optionA: "", optionB: "", optionC: "", optionD: "",   answer: ""  });
    };

   render(){
       return(
           <Fragment>
               <Helmet><title>Nimelssa Online Quiz-Edit Quiz page</title></Helmet>
                <form onSubmit={this.submit}>

                <div className="form-group">
                <label htmlFor="text">Question Category:</label>
                 <input 
                 ref={this.categoryRef}
                 type="text"
                 value={this.state.category}
                 name="category" 
                 className="form-control" 
                 placeholder="Enter Question Category Here"
                 onChange={this.handleChange}/>
                   {this.state.errors.category && (
                     <div className="text-danger">
                         {this.state.errors.category}
                     </div>    
                 )}
                </div> 

                <div className="form-group">
                <label htmlFor="text">Question:</label>
                 <input 
                 type="text"
                 value={this.state.question}
                 name="question" 
                 className="form-control" 
                 placeholder="Enter Question here"
                 onChange={this.handleChange}/>
                   {this.state.errors.question && (
                     <div className="text-danger">
                         {this.state.errors.question}
                     </div>    
                 )}
                </div>

                <div className="form-group">
                <label htmlFor="text">Option A:</label>
                 <input 
                 type="text" 
                 value={this.state.optionA}
                 className="form-control" 
                 name="optionA"
                 placeholder="Enter option A"
                 onChange={this.handleChange}/>
                   {this.state.errors.optionA && (
                     <div className="text-danger">
                         {this.state.errors.optionA}
                     </div>    
                 )}
                </div>

                <div className="form-group">
                <label htmlFor="text">Option B:</label>
                 <input 
                 type="text" 
                 value={this.state.optionB}
                 className="form-control" 
                 name="optionB"
                 placeholder="Enter option B"
                 onChange={this.handleChange}/>
                   {this.state.errors.optionB && (
                     <div className="text-danger">
                         {this.state.errors.optionB}
                     </div>    
                 )}
                </div>

                <div className="form-group">
                <label htmlFor="text">Option C:</label>
                 <input 
                 type="text" 
                 value={this.state.optionC}
                 className="form-control" 
                 name="optionC"
                 placeholder="Enter option C"
                 onChange={this.handleChange} />
                   {this.state.errors.optionC && (
                     <div className="text-danger">
                         {this.state.errors.optionC}
                     </div>    
                 )}
                </div>

                <div className="form-group">
                <label htmlFor="text">Option D:</label>
                 <input 
                 type="text" 
                 value={this.state.optionD}
                 className="form-control" 
                 name="optionD"
                 placeholder="Enter option D"
                 onChange={this.handleChange}/>
                   {this.state.errors.optionD && (
                     <div className="text-danger">
                         {this.state.errors.optionD}
                     </div>    
                 )}
                </div>

                <div className="form-group">
                <label htmlFor="text">Answer:</label>
                 <input 
                 type="text" 
                 value={this.state.answer}
                 className="form-control" 
                 name="answer"
                 placeholder="Enter Answer"
                 onChange={this.handleChange}/>
                   {this.state.errors.answer && (
                     <div className="text-danger">
                         {this.state.errors.answer}
                     </div>    
                 )}
                </div>
                <button type="submit"  className="btn btn-success mt-3">
                    <i className="far fa-check-square"></i>
                 <span>&nbsp;Create Question</span>
                </button>              
            </form>

       </Fragment>
       )
   }
}

export default EditPost; 
