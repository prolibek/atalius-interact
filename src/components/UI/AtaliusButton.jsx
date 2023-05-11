import classes from "./AtaliusButton.module.css"

const AtaliusButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes["start-btn"]}>
                {children}
        </button>
    )
}

export default AtaliusButton //fasdasd