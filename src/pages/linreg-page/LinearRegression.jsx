import React, { useEffect, useState, useRef, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import classes from "./LinearRegression.module.css"
import { transformXY } from "../../utils/data-transform"
import AtaliusButton from "../../components/UI/AtaliusButton"

const LinearRegression = () => {

    const epochs = 300;
    const canvas = useRef()
    const w = 700
    const h = 450

    const [xs, setXs] = useState([])
    const [ys, setYs] = useState([])
    const [coef, setCoef] = useState({w: 0, b: 0})
    const [mae, setMae] = useState(0)

    const pushData = (x, y) => {
        const rect = canvas.current.getBoundingClientRect()
        const [tX, tY] = transformXY(x - rect.left, y - rect.top, w, h)
        setXs([...xs, tX])
        setYs([...ys, tY])
    }

    const clearData = ()  => {
        setXs([])
        setYs([])
        setCoef({w: 0, b: 0})
        setMae(0)
    }
    
    useEffect(() => {
        if(xs.length) {
            let w = Number(coef.w)
            let b = Number(coef.b)
    
            for(let i = 0; i < epochs; i++) {
                for(let j = 0; j < xs.length; j++) {
                    const y_pred = w * xs[j] + b
                    w -= 0.01*(xs[j]*(y_pred - ys[j]))/xs.length
                    b -= 0.01*(y_pred - ys[j])/xs.length
                }
            }
            const newCoef = { w, b }
            if(JSON.stringify(newCoef) !== JSON.stringify(coef))
                setCoef(newCoef)
        }

        let error =  0
        for(let i = 0; i < xs.length; i++) {
            error += Math.abs(coef.w * xs[i] + coef.b - ys[i])
        }
        if(xs.length)
            setMae((error / xs.length).toPrecision(4))

        const ctx = canvas.current.getContext("2d")

        ctx.clearRect(0, 0, w, h)
        ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.moveTo(0, (coef.b - 1) * -w)
        ctx.lineTo(w, (coef.w + coef.b - 1) * -w)

        for(let i = 0; i < xs.length; i++) {
            ctx.moveTo(xs[i] * w, (ys[i] - 1) * -w)
            ctx.lineTo(xs[i] * w, (xs[i] * coef.w + coef.b - 1) * -w)
            ctx.moveTo(xs[i] * w + 3, (ys[i] - 1) * -w)
            ctx.arc(xs[i] * w, (ys[i] - 1) * -w, 3, 0,  2*Math.PI)
            ctx.fill()
        }

        ctx.strokeStyle = "#FFFFFF"
        ctx.lineWidth = 1
        ctx.stroke()

    }, [xs, ys, coef])

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
                    Линейная регрессия</h1>
                <canvas 
                    width={w}
                    height={h}
                    onClick={(event) => pushData(event.clientX, event.clientY)} 
                    className={classes["graph-canvas"]}
                    ref={canvas}
                />
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div className={classes["mae-block"]}>
                    <h2>MAE:</h2>
                    <p>{mae}</p>
                </div>
                <AtaliusButton onClick={() => clearData()}>Ресетнуть</AtaliusButton>
                <AtaliusButton onClick={() => navigate("/", {replace: true})}>Пред.</AtaliusButton>
                <AtaliusButton onClick={() => navigate("/logreg", {replace: true})}>След.</AtaliusButton>
            </div>
        </div>
    )
}

export default LinearRegression