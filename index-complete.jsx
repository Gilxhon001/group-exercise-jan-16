import React from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Chatbot } from "popcat-chatbot";

class Answers extends React.Component {
  render() {
    const { answers } = this.props;
    var answerDivs = answers.map((elem, i) => (
      <div key={"div-root" + i}>
        <p key={"question" + i}>{elem.question}</p>
        <p key={"answer" + i}>{elem.answer}</p>
      </div>
    ));
    return <>{answerDivs}</>;
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      question: "",
    };

    this.bot = new Chatbot()
      .setName("Big Bot")
      .setGender("Male")
      .setOwner("EEF");

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.setState({ question: ev.target.value });
  }

  addAnswer = (question, answer) => {
    let now = Date.now();
    this.bot.chat(question).then((answr) => {
      let updatedAnswers = [
        ...this.state.answers,
        { question: question, answer: answr, timestamp: now },
      ];
      updatedAnswers = updatedAnswers.sort((a, b) => b.timestamp - a.timestamp);
      this.setState((state) => ({
        answers: updatedAnswers,
      }));
      localStorage.setItem("answers", JSON.stringify(updatedAnswers));
    });
  };

  componentDidMount() {
    const answers = JSON.parse(localStorage.getItem("answers"));
    if (answers) {
      this.setState({ answers: answers });
    }
  }

  render() {
    const { answers } = this.state;
    return (
      <>
        <main>
          <input
            placeholder="What do you want to ask?"
            value={this.state.question}
            onChange={this.handleSubmit}
          ></input>
          <button
            onClick={() => this.addAnswer(this.state.question, "sdgsrgrs")}
          >
            Send
          </button>
          <Answers answers={answers}></Answers>
        </main>
      </>
    );
  }
}
