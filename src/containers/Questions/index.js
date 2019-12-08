import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./Questions.module.css";
import { API_BASE_URL } from "../../constants";
import Question from "../../components/Question";

const Questions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/questions`);
      setLoading(false);
      setQuestions(response.data);
    } catch (error) {
      setLoading(false);
      setError("Something went wrong !");
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Check out some live polls</h1>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div className={styles.questionWrapper}>
          {questions.map(question => (
            <Question
              key={question.url}
              url={question.url}
              title={question.question}
              publishedAt={question.published_at}
              choicesLength={question.choices.length}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;

// import React, { Component } from "react";
// import axios from "axios";
// import styled from "styled-components";

// import { API_BASE_URL } from "../../constants";
// import Question from "../../components/Question";
// import Spinner from "../../components/Spinner";

// class QuestionsContainer extends Component {
//     state = {
//         loading: false,
//         errorMessage: "",
//         questions: [],
//     };

//     componentDidMount() {
//         this.getQuestions();
//     }

//     getQuestions = async () => {
//         try {
//             this.setState({ loading: true });
//             const res = await axios.get(`${API_BASE_URL}/questions`);
//             console.log(res.data);
//             this.setState({ loading: false, questions: res.data });
//         } catch (error) {
//             this.setState({
//                 loading: false,
//                 erorrMessage: error,
//             });
//         }
//     };

//     render() {

//         return (
//             <Container>
//                 <h1>Check out some live polls</h1>
//                 {this.state.loading ? (
//                     <Spinner />
//                 ) : (
//                         <QuestionsWrapper>
//                             {this.state.questions.map(question => (
//                                 <Question
//                                     key={question.url}
//                                     url={question.url}
//                                     title={question.question}
//                                     publishedAt={question.published_at}
//                                     choicesLength={question.choices.length}
//                                 />
//                             ))}
//                         </QuestionsWrapper>
//                     )}
//             </Container>
//         );
//     }
// }

// export default QuestionsContainer;
