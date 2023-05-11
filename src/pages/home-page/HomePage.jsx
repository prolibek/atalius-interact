import React from "react"
import classes from "./HomePage.module.css"
import { useNavigate } from "react-router-dom"
import AtaliusButton from "../../components/UI/AtaliusButton";

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <div className="main-wrapper">
            <div className={classes["wrapper"]}>
                <h1 className={classes["main-title"]}>
                    Добро пожаловать на Atalius!
                </h1>
                <AtaliusButton onClick={() => navigate("/linreg", { replace: true }) }>
                    Начать!
                </AtaliusButton>
            </div>
        </div>
    )
}

export default HomePage;