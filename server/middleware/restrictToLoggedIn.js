import { verifyUser } from "../utils/jwtHelper.js";

export const restrictToLoggedInUser = (req, res, next) => {
    // * check if Uid exist
    const userUid = req.cookies?.uid;
    if (!userUid) return res.send("/first");

    // * check if the uid is valid
    const user = verifyUser(userUid);
    if (!user) return res.send("/second");

    // * forward the payload API
    req.user = user;
    next();
}