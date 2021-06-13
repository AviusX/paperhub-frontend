export const backdropVariants = {
    hidden: {
        opacity: 0,
        transition: {
            type: "tween"
        }
    },
    visible: {
        opacity: 1,
        transition: {
            type: "tween"
        }
    }
}

export const modalVariants = {
    hidden: {
        opacity: 0,
        y: -100
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 170
        }
    },
    exit: {
        opacity: 0,
        y: -100,
        transition: {
            type: "tween"
        }
    }
}