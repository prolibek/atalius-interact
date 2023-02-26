import React, { useEffect, useState, useRef, useMemo } from "react";
import classes from "./LinearRegression.module.css"

const LinearRegression = () => {

    const epochs = 100;
    const canvas = useRef()
    const w = 600
    const h = 600
    const [coord, setCoord] = useState({})
    const [xs, setXs] = useState([])
    const [ys, setYs] = useState([])
    const [coef, setCoef] = useState({w: 0, b: 0})

    const transformXY = (x, y) => {
        return [ x / w, 1 - (y / w) ]
    }

    const pushData = (x, y) => {
        const rect = canvas.current.getBoundingClientRect()
        const [tX, tY] = transformXY(x - rect.left, y - rect.top)
        setCoord({x: tX, y: tY})
        setXs([...xs, tX])
        setYs([...ys, tY])
    }

    const updateCoef = (xs, ys) => {
        if(xs.length) {
            let w = Number(coef.w)
            let b = Number(coef.b)

            for(let i = 0; i < epochs; i++) {
                for(let j = 0; j < xs.length; j++) {
                    const y_pred = w * xs[j] + b
                    w -= 0.01*(xs[j]*(y_pred - ys[j]))
                    b -= 0.01*(y_pred - ys[j])
                }
            }
            setCoef({ w: w, b: b })
        }
        else
            setCoef({ w: 0, b: 0 })
    }

    const draw = () => {
        const ctx = canvas.current.getContext("2d")
        ctx.clearRect(0, 0, w, h)
        ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.moveTo(0, (coef.b - 1) * -w)
        ctx.lineTo(w, (coef.w + coef.b - 1) * -w)
        for(let i = 0; i < xs.length; i++)
            ctx.fillRect(xs[i] * w, (ys[i] - 1) * -w, 5, 5)
        ctx.strokeStyle = "#FFFFFF"
        ctx.lineWidth = 1
        ctx.stroke()
    } 

    useEffect(() => {
        updateCoef(xs, ys)
        draw()   
    }, [coord])

    return (
        <div 
            style={{
                display: "flex",
                flexDirection: "column", 
            }}
            className="main-wrapper"
        >
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
    )
}

export default LinearRegression