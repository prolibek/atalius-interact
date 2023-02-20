import React, { useEffect, useState, useRef, useMemo } from "react";
import classes from "./LinearRegression.module.css"

const LinearRegression = () => {

    const epochs = 100;
    const canvas = useRef()
    const [coord, setCoord] = useState({})
    const [xs, setXs] = useState([])
    const [ys, setYs] = useState([])
    const [coef, setCoef] = useState({w: 0, b: 0})

    const transformXY = (x, y) => {
        return [ x / 600, 1 - (y / 600) ]
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
                    w -= (xs[j]*(y_pred - ys[j]))
                    b -= (y_pred - ys[j])
                }
                console.log(w)
                console.log(b)
            }
            setCoef({ w: w, b: b })
        }
        else
            setCoef({ w: 0, b: 0 })
    }

    const drawPoint = () => {
        const ctx = canvas.current.getContext("2d")
        ctx.fillStyle = "white"
        ctx.fillRect(coord.x * 600, (coord.y - 1) * -600, 5, 5)
        ctx.stroke()
    }

    const drawLine = () => {
        const ctx = canvas.current.getContext("2d")
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.moveTo(0, (coef.b - 1) * -600)
        ctx.lineTo(600, (coef.w * 600 + coef.b - 1) * -600)
        ctx.stroke()
    }

    useEffect(() => {
        updateCoef(xs, ys)
        console.log(coef)
    }, [xs])
    useEffect(() => {
        drawPoint()
        drawLine()    
    }, [coord])

    return (
        <div className="main-wrapper">
            <canvas 
            width="600"
            height="600"
            onClick={(event) => pushData(event.clientX, event.clientY)} 
            className={classes["graph-canvas"]}
            ref={canvas}
            />
        </div>
    )
}

export default LinearRegression