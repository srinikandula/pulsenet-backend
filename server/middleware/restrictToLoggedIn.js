import { verifyUser } from "../utils/jwtHelper.js";

export const restrictToLoggedInUser = async (req, res, next) => {
    // * check if Uid exist
    const userUid = await req.headers['authorization'];
    if (!userUid) return res.status(401).send("/login");

    // * check if the uid is valid
    const [bearer, token] = userUid.split(" ");

    if (bearer !== "Bearer" || !token) {
        return res.status(401).send("/login");
    }

    const user = verifyUser(token);
    if (!user) return res.status(403).send("/login");

    // * forward the payload API
    req.user = user;
    next();
}