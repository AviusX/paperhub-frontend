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

export const wallpaperCardVariants = {
    hidden: {
        opacity: 0,
        y: -50,
    },
    visible: {
        opacity: 1,
        y: 0
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

export const routeVariants = {
    hidden: {
        x: 250,
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.4,
            ease: "easeInOut"
        }
    },
    exit: {
        x: -250,
        opacity: 0,
        transition: {
            type: "tween",
            duration: 0.4,
            ease: "easeInOut"
        }
    }
}