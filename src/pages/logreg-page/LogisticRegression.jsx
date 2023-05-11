import React, { useEffect, useState, useRef, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import classes from "./LogisticRegression.module.css"
import { transformXY } from "../../utils/data-transform"
import { sigmoid } from "../../utils/functions"
import AtaliusButton from "../../components/UI/AtaliusButton"

const LogisticRegression = () => {

    const epochs = 500;
    const canvas = useRef()
    const radio = useRef()
    const w = 450
    const h = 450

    const [cl, setCl] = useState(0);
    const [xs, setXs] = useState([]);
    const [ys, setYs] = useState([]);
    const [cls, setCls] = useState([]);
    const [coef, setCoef] = useState({w1: 0, w2: 0, b: 0})
    const [acc, setAcc] = useState(0)

    const pushData = (x, y, cl) => {
        const rect = canvas.current.getBoundingClientRect()
        const [tX, tY] = transformXY(x - rect.left, y - rect.top, w, h)
        setXs([...xs, tX])
        setYs([...ys, tY])
        setCls([...cls, cl])
    }

    const clearData = () => {
        setXs([])
        setYs([])
        setCls([])
        setCoef({w1: 0, w2: 0, b: 0})
        setAcc(0)
    }

    useEffect(() => {
        if(xs.length) {
            let w1 = Number(coef.w1)
            let w2 = Number(coef.w2)
            let b = Number(coef.b)
    
            for(let i = 0; i < epochs; i++) {
                for(let j = 0; j < xs.length; j++) {
                    const y_pred = sigmoid(w1 * xs[j] + w2 * ys[j] + b)
                    w1 -= (xs[j] * (y_pred - cls[j])) / xs.length
                    w2 -= (ys[j] * (y_pred - cls[j])) / xs.length
                    b -= ((y_pred - cls[j])) / xs.length
                    console.log(w1)
                }
            }
            const newCoef = { w1, w2, b }
            setCoef(newCoef)
        }
    }, [xs, ys, cls])
    
    useEffect(() => {

        const ctx = canvas.current.getContext("2d")

        ctx.clearRect(0, 0, w, h)
        ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.moveTo(0, (- coef.b / coef.w2 - 1) * -w)
        console.log((- (coef.b + 1) / coef.w2 - 1) * -w + " " + ((-coef.w1 - (coef.b + 1)) / coef.w2 - 1) * -w)
        ctx.lineTo(w, ((- coef.w1 - coef.b) / coef.w2 - 1) * -w)         
        ctx.closePath()
        ctx.stroke()
        for(let i = 0; i < xs.length; i++) {
            ctx.beginPath()
            if(cls[i]) 
                ctx.fillStyle = "red"
            else
                ctx.fillStyle = "blue"
            ctx.moveTo(xs[i] * w + 3, (ys[i] - 1) * -w)
            ctx.arc(xs[i] * w, (ys[i] - 1) * -w, 3, 0,  2*Math.PI)
            ctx.fill()
            ctx.closePath()
        }

        ctx.strokeStyle = "#FFFFFF"
        ctx.lineWidth = 1
        ctx.stroke()
    }, [xs, ys, cl, coef])

    const navigate = useNavigate()

    return (
        <div 
            style={{
                display: "flex"
            }}
            className="main-wrapper"
        >
            <div className={classes["model-box"]}>
                <h1 
                    style={{
                        marginBottom: "15px"
                    }}
                >
                    Логистическая регрессия</h1>
                <canvas 
                    width={w}
                    height={h}
                    onClick={e => pushData(e.clientX, e.clientY, cl)} 
                    className={classes["graph-canvas"]}
                    ref={canvas}
                />
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div className={classes["mae-block"]}>
                    <h2>Accuracy:</h2>
                    <p>{acc}</p>
                </div>
                <div ref={radio} className={classes["radio-input"]}>
                    <div>
                        <input 
                            type="radio" 
                            id="radio-btn1" 
                            value="0" 
                            name="radio" 
                            onChange={e => setCl(Number(e.target.value))}
                            className={classes["radio-btn1"]} 
                            checked={cl===0}
                        />
                        <label htmlFor="radio-btn1">Class #1</label>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            id="radio-btn2" 
                            value="1" 
                            name="radio"
                            onChange={e => setCl(Number(e.target.value))}
                            className={classes["radio-btn2"]}
                            checked={cl===1}
                        />
                        <label htmlFor="radio-btn2">Class #2</label>
                    </div>
                </div>
                <AtaliusButton onClick={() => clearData()}>Ресетнуть</AtaliusButton>
                <AtaliusButton onClick={() => navigate("/linreg", {replace: true})}>Пред.</AtaliusButton>
                <AtaliusButton>След.</AtaliusButton>
            </div>
        </div>
    )
}

export default LogisticRegression