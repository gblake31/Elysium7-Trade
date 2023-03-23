import React from 'react'
import './dropdown.css'

function RegisterDropdown(props) {

    let css = {};
    css.top = props.visible ? "20%" : "-50%";

    return (
        <div id = "outer" style = {css}>
            <h1>Create an Account</h1>
            <label id = "username">Username</label>
            <input className = "field" type = "text"></input>
            <label id = "email">Email</label>
            <input className = "field" type = "text"></input>
            <label id = "password">Password</label>
            <input className = "field" type = "password"></input>
            <label id = "confirmPassword">Confirm Password</label>
            <input className = "field" type = "password"></input>
            <button>Register</button>
            <div id = "footer">
                <h3>Already have an account?</h3>
                <button onClick = {props.switchToLogin}>Login</button>
            </div>
        </div>
    )
}

export default RegisterDropdown;

