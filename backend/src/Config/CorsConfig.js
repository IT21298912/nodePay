const whiteList = [
    "http://localhost:3500",
    "http://localhost:5173",
    "http://localhost"
];

const corsOption = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not Allowed By CORS"));
        }
    },
    optionalSuccessStatus: 200,
};

export default corsOption;