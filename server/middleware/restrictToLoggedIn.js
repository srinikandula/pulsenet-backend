import { verifyUser } from "../utils/jwtHelper.js";

export const restrictToLoggedInUser = (req, res, next) => {
    // * check if Uid exist
    const userUid = req.cookies?.uid;
    if (!userUid) return res.send("/login");

    // * check if the uid is valid
    const user = verifyUser(userUid);
    if (!user) return res.send("/login");

    // * forward the payload API
    req.user = user;
    next();
}