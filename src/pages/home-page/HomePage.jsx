import React from "react"
import classes from "./HomePage.module.css"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <div className="main-wrapper">
            <div className={classes["wrapper"]}>
                <h1 className={classes["main-title"]}>
                    Добро пожаловать на Atalius!
                </h1>
                <button onClick={() => navigate("/linreg", { replace: true }) }className={classes["start-btn"]}>
                    Начать!
                </button>
            </div>
        </div>
    )
}

export default HomePage;