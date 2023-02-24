import React from "react";

function App() {
    let [text, setText] = React.useState("Not working");

    fetch('http://localhost:5000/message')
    .then((response) => response.text()) // deciding which type we'll parse the response into
    .then((data) => {
        console.log(text = data);
        setText(data);
    })
    .catch(e => alert(e.toString()));

    return (<h1>{text}</h1>);
}

export default App;


