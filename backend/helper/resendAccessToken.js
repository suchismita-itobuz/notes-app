import jwt from "jsonwebtoken";

export const resendAccessToken = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(404).json({
            success: false,
            message: "Token wasn't present in headers",
        });
    }

    const refreshToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(refreshToken, process.env.MY_SECRET_KEY);
        const userID = decoded.userID;

        const newAccessToken = jwt.sign({ userID }, process.env.MY_SECRET_KEY, { expiresIn: "10m" });
        const newRefreshToken = jwt.sign({ userID }, process.env.MY_SECRET_KEY, { expiresIn: "30d" });

        return res.status(200).json({
            success: true,
            data: { token: newAccessToken, rtoken: newRefreshToken },
            message: "New access and refresh tokens generated successfully",
        });
    } catch (error) {
        if (error.message === "jwt expired") {
            return res.status(403).json({
                success: false,
                message: "You are logged out. Please log in again.",
            });
        } else if (error.message === "invalid signature") {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
};
